import type { Request, Response } from "express";
import { getUser_NoPassword } from "@/lib/utils";
import { prisma } from "@/lib/config/db";

import { findUserById, getAllUsers, updateUser } from "./user.service";

export async function getUsers(req: Request, res: Response) {
  const allUsers = await getAllUsers();

  res.json(allUsers);
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  const user = await findUserById(id);

  res.json(user ? getUser_NoPassword(user) : null);
}

// TODO - Encapsular logica de validación
export async function updateUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  const { email, name, lastName, role } = req.body;

  if (name.length < 4) {
    res
      .status(400)
      .json({ message: "El nombre debe ser 4 caracteres como mínimo" });
    return;
  }

  if (lastName.length < 4) {
    res
      .status(400)
      .json({ error: "El apellido debe ser 4 caracteres como mínimo" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Formato del email inválido" });
    return;
  }

  try {
    const updatedUser = await updateUser(id, { email, name, lastName, role });

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
