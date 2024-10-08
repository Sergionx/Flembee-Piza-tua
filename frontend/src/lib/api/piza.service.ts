"use server";
import { revalidateTag } from "next/cache";
import { customFetch } from "@/lib/fetch";
import type { Pizza, PizzaWithIngredients } from "@/lib/interfaces/Pizza";
import type { PizzaIngredient } from "@/lib/interfaces/Ingredient";

export async function getPizzas() {
  const response = await customFetch("pizzas", {
    next: {
      tags: ["pizzas"],
    },
  });

  const data = await response.json();

  return data as PizzaWithIngredients[];
}

type CreatePizza = Omit<Pizza, "id" | "createdAt" | "updatedAt">;
type ConnectIngredient = Omit<PizzaIngredient, "id" | "pizzaId">;

export async function createPizza(
  pizza: CreatePizza,
  ingredients: ConnectIngredient[]
) {
  console.log(pizza, ingredients);
  const response = await customFetch("pizzas", {
    method: "POST",
    next: {
      tags: ["pizzas"],
    },
    body: JSON.stringify({ pizza, ingredients }),
  });

  if (response.ok) {
    revalidateTag("pizzas");
  }

  const data = await response.json();

  return data as Pizza;
}
