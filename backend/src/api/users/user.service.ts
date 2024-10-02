import { prisma } from "@/lib/config/db";
import { hashSync } from "bcrypt";
import type { User } from "@prisma/client";

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt">;
export function createUserByEmailAndPassword(user: CreateUser) {
  user.password = hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
