import type { Request, Response } from "express";
import { prisma } from "../config/db";


export async function getPizzas(req: Request, res:Response) {
  const { includeIngredients } = req.query;

  const allPizzas = await prisma.pizza.findMany({
    include: {
      ingredients: includeIngredients === 'true',
    },
  });

  res.json(allPizzas);
}

export async function createPizza(req: Request, res: Response) {
  const { name, ingredients } = req.body;

  if (name.length < 4) {
    res.status(400).json({ error: "Name must be at least 4 characters long" });
  }

  try {
    const newPizza = await prisma.pizza.create({
      data: {
        name,
        ingredients: {
          connect: ingredients.map((ingredientId: number) => ({ id: ingredientId })),
        },
      },
    });

    res.json(newPizza);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the pizza" });
  }
}

export async function editIngredient(req: Request, res: Response) {
  const { id } = req.params;
  const { name, stock, price, unit } = req.body;

  if (name.length < 4) {
    res.status(400).json({ error: "Name must be at least 4 characters long" });
  }

  try {
    const updatedIngredient = await prisma.ingredient.update({
      where: { id: id },
      data: { name, stock, price, unit },
    });

    res.json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the ingredient" });
  }
}