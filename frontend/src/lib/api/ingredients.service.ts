"use server"
import { customFetch } from "@/lib/fetch";
import { type Ingredient } from "@/lib/interfaces/Ingredient";
import { revalidateTag } from "next/cache";

export async function getIngredients(){
  const response = await customFetch("ingredients", {
    next: {
      tags: ["ingredients"],
    },
  });

  const data = await response.json();

  return data as Ingredient[];
}

type CreateIngredient = Omit<Ingredient, "id" | "createdAt" | "updatedAt">;
export async function createIngredient(ingredient: CreateIngredient){
  const response = await customFetch("ingredients", {
    method: "POST",
    next: {
      tags: ["ingredients"],
    },
    body: JSON.stringify(ingredient)
  });

  if (response.ok) {
    revalidateTag("ingredients");
  }

  const data = await response.json();

  return data as Ingredient;
}

export async function deleteIngredient(id: string){
  const response = await customFetch(`ingredients/${id}`, {
    method: "DELETE",
    next: {
      tags: ["ingredients"],
    },
  });

  if (response.ok) {
    revalidateTag("ingredients");
  }

  const data = await response.json();

  return data as Ingredient;
}