import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { generateTokens } from "../config/jwt";

export async function register(req: Request, res: Response) {
  const { email, password, name, lastName } = req.body;

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

  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens(user, jti);
  await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        lastName,
        password,
      },
    });

    res.json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
}
