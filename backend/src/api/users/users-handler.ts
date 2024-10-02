import type { Request, Response } from "express";
import { prisma } from "@/lib/config/db";


export async function getUsers(req: Request, res: Response) {
  const allUsers = await prisma.user.findMany();

  res.json(allUsers);
}

// TODO - Poner el return
export async function createUser(req: Request, res: Response) {
  const { email, name, lastName } = req.body;

  if (name.length < 4) {
    console.log("Name must be at least 4 characters long");
    res.status(400).json({ error: "Name must be at least 4 characters long" });
  }
  console.log("Pasó la validación de name");

  if (lastName.length < 4) {
    res
      .status(400)
      .json({ error: "Last name must be at least 4 characters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // const newUser = await prisma.user.create({
    //   data: {
    //     email,
    //     name,
    //     lastName,
    //   },
    // });

    // res.json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
}

// TODO - Encapsular logica de validación
export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { email, name, lastName } = req.body;
  
    if (name.length < 4) {
      res.status(400).json({ error: "Name must be at least 4 characters long" });
    }
  
    if (lastName.length < 4) {
      res
        .status(400)
        .json({ error: "Last name must be at least 4 characters long" });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email format" });
    }
  
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email,
          name,
          lastName,
        },
      });
  
      res.json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the user" });
    }
  
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    res.json({ message: "User deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
}