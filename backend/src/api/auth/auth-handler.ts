import type { Request, Response } from "express";
import { type JwtPayload, verify } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { compare } from "bcrypt";

import { hashToken } from "@/lib/utils";
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
    res
      .status(400)
      .json({ message: "You must provide an email and a password." });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Passwords do not match." });
    return;
  }

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ message: "Email already in use." });
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while registering." });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ message: "You must provide an email and a password." });
    return;
  }

  try {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403).json({ message: "Invalid login credentials." });
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
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while logging in." });
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
