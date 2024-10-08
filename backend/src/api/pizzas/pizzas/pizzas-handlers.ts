import type { Request, Response } from "express";
import {
  createPizza,
  deletePizza,
  getAllPizzas,
  getPizzaById,
} from "./pizza.service";

export async function getPizzas(req: Request, res: Response) {
  const allPizzas = await getAllPizzas();

  res.json(allPizzas);
}

export async function getPizzaByIdHandler(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const pizza = await getPizzaById(id);

    if (!pizza) {
      res.status(404).json({ message: "Pizza no encontrada" });
      return;
    }

    res.json(pizza);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al buscar la pizza" });
  }
}

export async function createPizzaHandler(req: Request, res: Response) {
  const { pizza, ingredients } = req.body;

  if (pizza.name.length < 4) {
    res
      .status(400)
      .json({ message: "El nombre debe ser 4 caracteres como mínimo" });
    return;
  }

  const uniqueIngredientIds = new Set(
    ingredients.map((ingredient: any) => ingredient.ingredientId)
  );

  if (uniqueIngredientIds.size !== ingredients.length) {
    res
      .status(400)
      .json({ message: "Los ingredientes no pueden estar repetidos" });
    return;
  }

  try {
    const newPizza = await createPizza(pizza, ingredients);

    res.json(newPizza);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrión un error al crear la pizza, intenta de nuevo" });
  }
}

export async function deletePizzaHandler(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await deletePizza(id);

    res.json({ message: "Pizza eliminada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Ocurrió un error al eliminar la pizza, intenta de nuevo",
    });
  }
}
