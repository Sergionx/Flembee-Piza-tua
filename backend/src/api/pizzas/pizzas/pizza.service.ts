import { prisma } from "@/lib/config/db";
import type { Pizza, PizzaIngredient } from "@prisma/client";

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
  });
}

export function getAllPizzas() {
  return prisma.pizza.findMany();
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
  console.log(id)
  return prisma.pizza.delete({
    where: {
      id,
    },
  });
}
