import { createOrder } from "./orders.service";

import type { Response } from "express";
import type { AuthRequest } from "@/api/auth/auth-middleware";

// TODO - Mejor typing y validaciones
export async function createOrderHandler(req: AuthRequest, res: Response) {
  const { order } = req.body;
  const userId = req.payload?.userId;

  if (!userId) {
    res.status(400).json({ message: "Asegúrese de iniciar sesión primero" });
    return;
  }

  if (!order) {
    res.status(400).json({ message: "Asegúrese de proveer una orden" });
    return;
  }

  if (Object.keys(order.pizzas).length === 0) {
    res.status(400).json({ message: "La orden no puede estar vacía" });
    return;
  }

  for (const [pizzaId, dataPizza] of Object.entries(order.pizzas)) {
    if (!dataPizza) {
      res
        .status(400)
        .json({ message: `Pizza con ID ${pizzaId} no tiene información` });
      return;
    }

    if ((dataPizza as any).quantity <= 0) {
      res
        .status(400)
        .json({
          error: `La cantidad de la pizza con ID ${pizzaId} debe ser mayor a 0`,
        });
      return;
    }
  }

  try {
    const newOrder = await createOrder(order, userId);

    console.log(newOrder);

    res.json(newOrder);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message });
  }
}
