import type { NextFunction, Request, Response } from "express";
import { type JwtPayload, TokenExpiredError, verify } from "jsonwebtoken";

export interface AuthRequest extends Request {
  payload?: JwtPayload & {
    userId: string;
  };
}

export function isAuthenticated(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "🚫 Un-Authorized 🚫" });
    return;
  }

  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error(
      "JWT_ACCESS_SECRET is not defined in environment variables"
    );
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.JWT_ACCESS_SECRET) as any;

    req.payload = payload;
  } catch (err) {
    res.status(401);
    if (err instanceof TokenExpiredError) {
      throw new Error("🚫 Token Expired 🚫");
    }

    throw new Error("🚫 Un-Authorized 🚫");
  }

  return next();
}
