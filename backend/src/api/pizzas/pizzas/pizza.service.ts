import { prisma } from "@/lib/config/db";
import type { Pizza, PizzaIngredient, Unit } from "@prisma/client";

type PizzaWithIngredients = Pizza & {
  ingredients: {
    id: string;
    name: string;
    quantity: number;
    stock: number;
    price: number;
    unitPrice: Unit;
    unitQuantity: Unit;
  }[];
};

type CreatePizza = Omit<Pizza, "id" | "createdAt" | "updatedAt">;
type CreatePizzaIngredient = Omit<PizzaIngredient, "id">;

export function createPizza(
  pizza: CreatePizza,
  ingredients: CreatePizzaIngredient[]
) {
  return prisma.pizza.create({
    data: {
      ...pizza,
      ingredients: {
        createMany: {
          data: ingredients,
        },
      },
    },
  });
}

export function getPizzaById(id: string) {
  return prisma.pizza.findUnique({
    where: {
      id,
    },
    include: {
      ingredients: true,
    },
  });
}

// TODO - Hacer tabla para conversiones de unidades
export function getAllPizzas() {
  return prisma.$queryRaw<PizzaWithIngredients>`
    SELECT
      p.id,
      p.name,
      json_agg(
        json_build_object(
          'id', i.id,
          'name', i.name,
          'price', i.price,
          'quantity', pi.quantity,
          'stock', i.stock,
          'unitPrice', i.unit,
          'unitQuantity', pi.unit,
          'quantity', pi.quantity
        )
      ) AS ingredients,
      SUM(
        i.price * pi.quantity *
        COALESCE(
          CASE
            WHEN uc.direction = 'FORWARD' THEN uc.factor
            WHEN uc.direction = 'BACKWARD' THEN 1 / uc.factor
            ELSE 1
          END, 1
        )
      ) AS price
    FROM 
      public."Pizza" p
    JOIN 
      public."PizzaIngredient" pi ON p.id = pi."pizzaId"
    JOIN 
      public."Ingredient" i ON pi."ingredientId" = i."id"
    LEFT JOIN
      public."UnitConversion" uc ON (
        (i.unit = uc."from" AND pi.unit = uc."to") OR
        (i.unit = uc."to" AND pi.unit = uc."from")
      )
    GROUP BY
      p.id
  `;
}

type UpdatePizza = Partial<CreatePizza> & {};
export function updatePizza(id: string, pizza: UpdatePizza) {
  return prisma.pizza.update({
    where: {
      id,
    },
    data: {
      ...pizza,
    },
  });
}

export function deletePizza(id: string) {
  return prisma.pizza.delete({
    where: {
      id,
    },
  });
}
