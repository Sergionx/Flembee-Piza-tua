import type { NextFunction, Request, Response } from "express";
import {type JwtPayload, verify } from "jsonwebtoken";

export interface AuthRequest extends Request {
  payload?: JwtPayload 
}

export function isAuthenticated(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;

    req.payload = payload;
  } catch (err) {
    res.status(401);

    throw new Error("🚫 Un-Authorized 🚫");
  }

  return next();
}
