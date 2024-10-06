import type { Request, Response } from "express";
import {
  createIngredient,
  deleteIngredient,
  getAllIngredients,
  getIngredientById,
  getIngredientsByPizzaId,
  updateIngredient,
} from "./ingredients.service";

export async function getIngredients(req: Request, res: Response) {
  const ingredients = await getAllIngredients();

  res.json(ingredients);
}

export async function getIngredientsByPizzaHandler(req: Request, res: Response) {
  const { id } = req.params;

  const ingredients = await getIngredientsByPizzaId(id);

  res.json(ingredients);
}

export async function getIngredientByIdHandler(req: Request, res: Response) {
  const { id } = req.params;

  const ingredient = await getIngredientById(id);

  res.json(ingredient);
}


export async function createIngredientHandler(req: Request, res: Response) {
  const { name, stock, price, unit } = req.body;

  if (name.length < 4) {
    res
      .status(400)
      .json({ message: "El nombre debe ser 4 caracteres como mínimo" });
    return;
  }

  try {
    const newIngredient = await createIngredient({
      name,
      stock,
      price,
      unit,
    });

    res.json(newIngredient);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Un error inesperado ocurrió creando la pizza" });
  }
}

export async function updateIngredientHandler(req: Request, res: Response) {
  const { id } = req.params;
  const { name, stock, price, unit } = req.body;

  if (name.length < 4) {
    res
      .status(400)
      .json({ message: "El nombre debe ser 4 caracteres como mínimo" });
    return;
  }

  try {
    const updatedIngredient = await updateIngredient(id, {
      name,
      stock,
      price,
      unit,
    });

    res.json(updatedIngredient);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Un error inesperado ocurrió modificando la pizza" });
  }
}

export async function deleteIngredientHandler(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await deleteIngredient(id);

    res.json({ message: "Ingrediente eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Un error inesperado ocurrió eliminando la pizza" });
  }
}