import crypto from "crypto";

import type { User } from "@prisma/client";

export function hashToken(token: string) {
  return crypto.createHash("sha512").update(token).digest("hex");
}

export function getUser_NoPassword(user: User) {
  const { password, ...rest } = user;
  return rest;
}

export function calculateDateRange(numberOfDays: number, includeTodayOnRange: boolean) {
  const startDate = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - numberOfDays, 0, 0, 0, 0));

  const endDate = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999));

  
  if (includeTodayOnRange) {
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);
  }
  return { startDate, endDate };
}