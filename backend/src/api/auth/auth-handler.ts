import type { Request, Response } from "express";
import { type JwtPayload, verify } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { compare } from "bcrypt";

import { getUser_NoPassword, hashToken } from "@/lib/utils";
import { generateTokens } from "@/lib/config/jwt";

import {
  createUserByEmailAndPassword,
  findUserByEmail,
  findUserById,
} from "@/api/users/user.service";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
} from "./auth.service";

export async function register(req: Request, res: Response) {
  const { email, password, confirmPassword, name, lastName, role } = req.body;
  // TODO - Mejorar las validaciones de todo esto
  if (!email || !password) {
    res.status(400).json({ message: "Debes proveer un email y contraseña" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Formato del email inválido" });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Las contraseñas no son iguales" });
    return;
  }

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ message: "Ya existe un usuario con ese email" });
      return;
    }

    const user = await createUserByEmailAndPassword({
      email,
      password,
      name,
      lastName,
      role,
    });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user.id, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
      user: getUser_NoPassword(user),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error inesperado al registrarse" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Debes proveer un email y contraseña" });
    return;
  }

  try {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403).json({ message: "Credenciales inválidas" });
      return;
    }

    const validPassword = await compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403).json({ message: "Credenciales inválidas" });
      return;
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser.id, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
      user: getUser_NoPassword(existingUser),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Un error inesperado ocurrió al iniciar sesión" });
  }
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      res.status(400);
      throw new Error("Missing refresh token.");
    }
    const payload = verify(
      refreshToken,
      process.env.JWT_ACCESS_SECRET as any
    ) as JwtPayload;
    if (!payload.jti) {
      res.status(400);
      throw new Error("Invalid refresh token.");
    }

    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user.id,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    // TODO - Preguntar si es mejor esto el res.status(500) o el next(err)
    // next(err);
    res.status(500);
    throw new Error("An error occurred while refreshing the token.");
  }
}
