import crypto from "crypto";

import type { User } from "@prisma/client";

export function hashToken(token: string) {
  return crypto.createHash("sha512").update(token).digest("hex");
}

export function getUser_NoPassword(user: User) {
  const { password, ...rest } = user;
  return rest;
}
