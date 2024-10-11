import {
  getIngredietsUseHistory,
  getNumberOfOrdersLastDays,
  getRevenueByPizza,
  getRevenueLastDays,
  getTop5SelledPizzas,
} from "./stats.service";

import type { Response } from "express";
import type { AuthRequest } from "@/api/auth/auth-middleware";

export async function getOrderWeekStats(req: AuthRequest, res: Response) {
  try {
    const stats = await getNumberOfOrdersLastDays(8);

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error inesperado calculando las estadísticas",
    });
  }
}

export async function getRevenuePerDay(req: AuthRequest, res: Response) {
  try {
    const stats = await getRevenueLastDays(8);

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error inesperado calculando las estadísticas",
    });
  }
}

export async function getRevenueByPizzaHandler(req: AuthRequest, res: Response) {
  try {
    const stats = await getRevenueByPizza();

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error inesperado calculando las estadísticas",
    });
  }
}

export async function getIngredientStockHistoryHandler(
  req: AuthRequest,
  res: Response
) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Falta el id del ingrediente" });
    return;
  }

  try {
    const stats = await getIngredietsUseHistory(id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error inesperado calculando las estadísticas",
    });
  }
}

export async function getTop5Pizzas(req: AuthRequest, res: Response) {
  try {
    const stats = await getTop5SelledPizzas();
    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error inesperado calculando las estadísticas",
    });
  }
}
