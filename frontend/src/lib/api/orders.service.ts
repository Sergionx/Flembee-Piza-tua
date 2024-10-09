"use server";
import { revalidateTag } from "next/cache";
import type { DataPizza } from "@/app/(protected)/ingredients/components/production-dialog/production-dialog";
import { customFetch } from "@/lib/fetch";

export async function createOrder(
  order: { pizzas: Record<string, DataPizza> },
  accessToken?: string
) {
  if (!accessToken) {
    throw new Error("Debe iniciar sesión para hacer esta acción");
  }

  const response = await customFetch("orders", {
    method: "POST",
    next: {
      tags: ["orders"],
    },
    body: JSON.stringify({
      order,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    revalidateTag("orders");
    revalidateTag("pizzas");
    revalidateTag("ingredients");
  }

  const data = await response.json();

  return data as Order
}
