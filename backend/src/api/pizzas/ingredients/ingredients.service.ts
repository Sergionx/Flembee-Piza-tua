import { prisma } from "@/lib/config/db";
import type { Ingredient } from "@prisma/client";

type CreateIngredient = Omit<Ingredient, "id" | "createdAt" | "updatedAt">;
export function createIngredient(ingredient: CreateIngredient) {
  return prisma.ingredient.create({
    data: ingredient,
  });
}

export function getAllIngredients() {
  return prisma.ingredient.findMany();
}

export function getIngredientById(id: string) {
  return prisma.ingredient.findUnique({
    where: {
      id,
    },
  });
}

export function getIngredientsByPizzaId(pizzaId: string) {

  return prisma.ingredient.findMany({
    where: {
      pizzas: {
        some: {
          id: pizzaId,
        },
      },
    },
  });
}

type UpdatePizza = Partial<CreateIngredient>;
export function updateIngredient(id: string, pizza: UpdatePizza) {
  return prisma.ingredient.update({
    where: {
      id,
    },
    data: pizza,
  });
}

export function deleteIngredient(id: string) {
  return prisma.ingredient.delete({
    where: {
      id,
    },
  });
}
