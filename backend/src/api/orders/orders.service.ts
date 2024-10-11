import { prisma } from "@/lib/config/db";
import type { PrismaClient, Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

type PrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;
type DataPizza = {
  quantity: number;
  price: number;
};

type CreateOrder = {
  pizzas: Record<string, DataPizza>;
};
export function createOrder(order: CreateOrder, userId: string) {
  return prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        total: Object.values(order.pizzas).reduce(
          (acc, { price, quantity }) => acc + price * quantity,
          0
        ),
      },
    });

    for (const [pizzaId, { quantity, price }] of Object.entries(order.pizzas)) {
      // Create order item
      await tx.orderItem.create({
        data: {
          orderId: createdOrder.id,
          pizzaId,
          quantity,
          price,
        },
      });

      // Get the ingredients for the pizza
      await updateIngredientStock(tx, pizzaId, quantity);
    }

    return createdOrder;
  });
}
async function updateIngredientStock(
  tx: PrismaTransaction,
  pizzaId: string,
  quantity: number
) {
  const pizzaIngredients = await tx.pizzaIngredient.findMany({
    where: { pizzaId },
    include: { ingredient: true },
  });

  // Update the stock for each ingredient
  for (const {
    ingredient,
    quantity: ingredientQuantity,
    unit: pizzaUnit,
  } of pizzaIngredients) {
    const totalQuantityNeeded = ingredientQuantity * quantity;

    const conversion = await tx.unitConversion.findFirst({
      where: {
        OR: [
          { from: pizzaUnit, to: ingredient.unit, direction: "FORWARD" },
          { from: ingredient.unit, to: pizzaUnit, direction: "BACKWARD" },
        ],
      },
    });

    let exactQuantityNeeded = totalQuantityNeeded;

    if (conversion) {
      if (conversion.direction === "FORWARD")
        exactQuantityNeeded = totalQuantityNeeded * conversion.factor;
      else exactQuantityNeeded = totalQuantityNeeded / conversion.factor;
    }
    console.log({
      pizzaUnit,
      ingredientUnit: ingredient.unit,
      conversion,
    });

    const newIngredient = await tx.ingredient.update({
      where: { id: ingredient.id },
      data: {
        stock: {
          decrement: exactQuantityNeeded,
        },
      },
    });

    if (newIngredient.stock < 0) {
      throw new Error(
        `No hay suficiente stock para el ingrediente: '${ingredient.name}'`
      );
    }
  }
}