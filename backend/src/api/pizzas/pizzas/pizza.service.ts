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
        CASE
          WHEN i.unit = 'KG' AND pi.unit = 'G' THEN i.price * (pi.quantity / 1000)
          WHEN i.unit = 'G' AND pi.unit = 'KG' THEN i.price * (pi.quantity * 1000)
          WHEN i.unit = 'L' AND pi.unit = 'ML' THEN i.price * (pi.quantity / 1000)
          WHEN i.unit = 'ML' AND pi.unit = 'L' THEN i.price * (pi.quantity * 1000)
          ELSE i.price * pi.quantity
        END
      ) AS price
    FROM 
      public."Pizza" p
    JOIN 
      public."PizzaIngredient" pi ON p.id = pi."pizzaId"
    JOIN 
      public."Ingredient" i ON pi."ingredientId" = i."id"
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
