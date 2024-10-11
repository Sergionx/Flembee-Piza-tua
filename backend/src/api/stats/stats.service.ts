import { prisma } from "@/lib/config/db";
import { calculateDateRange } from "@/lib/utils";

export async function getNumberOfOrdersLastDays(
  numberOfDays: number,
  includeTodayOnRange = true
) {
  const { startDate, endDate } = calculateDateRange(
    numberOfDays,
    includeTodayOnRange
  );

  const orders = await prisma.$queryRaw<{ date: Date; count: number }[]>`
    SELECT 
      DATE_TRUNC('day', o."createdAt") as date,
      COUNT(o.id)::float as count 
    FROM 
      public."Order" o
    WHERE 
      o."createdAt" >= ${startDate} AND o."createdAt" <= ${endDate}
    GROUP BY 
      date
    ORDER BY 
      date ASC
  `;

  const orderMap = new Map<string, number>();
  orders.forEach((order) => {
    orderMap.set(order.date.toISOString().split("T")[0], order.count);
  });

  const result = [];

  let total = 0;
  for (let i = 0; i < numberOfDays; i++) {
    const dateStr = startDate.toISOString().split("T")[0];
    const orderCount = orderMap.get(dateStr) || 0;

    result.push({
      date: startDate.toISOString(),
      orders: orderCount,
    });

    startDate.setDate(startDate.getDate() + 1);
    total += orderCount;
  }

  console.log(orders, result)

  return {
    orders: result,
    total,
  };
}

export async function getRevenueLastDays(
  numberOfDays: number,
  includeTodayOnRange = true
) {
  const { startDate, endDate } = calculateDateRange(
    numberOfDays,
    includeTodayOnRange
  );

  const revenue = await prisma.$queryRaw<{ date: Date; revenue: number }[]>`
    SELECT 
      DATE_TRUNC('day', o."createdAt") as date,
      SUM(o.total)::int as revenue 
    FROM 
      public."Order" o
    WHERE 
      o."createdAt" >= ${startDate} AND o."createdAt" <= ${endDate}
    GROUP BY 
      date
    ORDER BY 
      date ASC
  `;

  const revenueMap = new Map<string, number>();
  revenue.forEach((order) => {
    revenueMap.set(order.date.toISOString().split("T")[0], order.revenue);
  });

  const result = [];

  let total = 0;
  for (let i = 0; i < numberOfDays; i++) {
    const dateStr = startDate.toISOString().split("T")[0];
    const orderRevenue = revenueMap.get(dateStr) || 0;

    result.push({
      date: startDate.toISOString(),
      revenue: orderRevenue,
    });

    startDate.setDate(startDate.getDate() + 1);
    total += orderRevenue;
  }

  return {
    revenue: result,
    total,
  };
}

export async function getRevenueByPizza(){
  const pizzas = await prisma.$queryRaw<{ name: string; revenue: number }[]>`
    SELECT 
      p.name as name,
      SUM(o.total)::int as revenue
    FROM 
      public."OrderItem" oi
    JOIN 
      public."Order" o ON oi."orderId" = o.id
    JOIN 
      public."Pizza" p ON oi."pizzaId" = p.id
    WHERE
      o."createdAt" >= DATE_TRUNC('day', NOW() - INTERVAL '30 days')
    GROUP BY 
      name
    ORDER BY 
      revenue DESC
  `;

  const total = pizzas.reduce((acc, pizza) => acc + pizza.revenue, 0);
  return {
    pizzas,
    total,
  }

}

export async function getTop5SelledPizzas() {
  return prisma.$queryRaw<{ name: string; count: number }[]>`
    SELECT 
      p.name as name,
      COUNT(op."pizzaId")::int as count
    FROM 
      public."OrderItem" op
    JOIN 
      public."Pizza" p ON op."pizzaId" = p.id
    GROUP BY
      name
    ORDER BY
      count DESC
  `;
}

export async function getIngredietsUseHistory(ingredientId: string) {
  return prisma.$queryRaw<{ date: Date; stock: number; unit: number }[]>`
    SELECT 
      DATE_TRUNC('day', o."createdAt") as date,
      SUM(pi.quantity * oi.quantity) as stock,
      i.unit as unit
    FROM 
      public."OrderItem" oi
    JOIN 
      public."Order" o ON oi."orderId" = o.id
    JOIN 
      public."PizzaIngredient" pi ON oi."pizzaId" = pi."pizzaId"
    JOIN
      public."Ingredient" i ON pi."ingredientId" = i.id
    WHERE 
      pi."ingredientId" = ${ingredientId} AND
      o."createdAt" >= DATE_TRUNC('day', NOW() - INTERVAL '30 days')
    GROUP BY 
      date, i.unit
    ORDER BY 
      date ASC
  `;
}
