"use server";

import { customFetch } from "@/lib/fetch";
import { Unit } from "@/lib/interfaces/Ingredient";

 interface OrderPerDay {
  date: string;
  orders: number;
}

export interface OrderWeeks {
  orders: OrderPerDay[];
  total: number;
}

export async function getNumberOfOrdersLastWeek(accessToken?: string) {
  if (!accessToken) {
    throw new Error("Debe iniciar sesión para hacer esta acción");
  }
  console.log(accessToken);

  const response = await customFetch("stats/orders/week", {
    next: {
      tags: ["stats", "orders"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  console.log("all orders", data)

  return data as OrderWeeks;
}

export async function getTop5SelledPizzas(accessToken?: string) {
  if (!accessToken) {
    throw new Error("Debe iniciar sesión para hacer esta acción");
  }

  const response = await customFetch("stats/pizzas/top", {
    next: {
      tags: ["stats", "pizzas"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data as { name: string; count: number }[];
}

export async function getIngredientStockHistory(
  id: string,
  accessToken?: string
) {
  console.log("ingredientId", id);
  if (!accessToken) {
    throw new Error("Debe iniciar sesión para hacer esta acción");
  }

  const response = await customFetch(`stats/ingredients/${id}/stockHistory`, {
    next: {
      tags: ["stats", "ingredients"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data as { date: string; stock: number; unit: Unit }[];
}

 interface RevenuePerDay {
  date: string;
  revenue: number;
}

export interface RevenueWeeks {
  revenue: RevenuePerDay[];
  total: number;
}

export async function getRevenuePerDay(accessToken?: string) {
  if (!accessToken) {
    throw new Error("Debe iniciar sesión para hacer esta acción");
  }
  
  const response = await customFetch("stats/pizzas/revenue", {
    next: {
      tags: ["stats", "orders"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  console.log(data)

  return data as RevenueWeeks;
}

interface PizzaRevenue {
  name: string;
  revenue: number;
}

export interface PizzasRevenue {
  pizzas: PizzaRevenue[];
  total: number;
}

export async function getRevenueByPizza(accessToken?: string) {
  if (!accessToken) {
    throw new Error("Debe iniciar sesión para hacer esta acción");
  }

  const response = await customFetch("stats/pizzas/revenueByPizza", {
    next: {
      tags: ["stats", "orders"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data as PizzasRevenue
}