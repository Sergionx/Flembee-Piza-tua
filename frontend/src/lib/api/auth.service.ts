"use server";

import { customFetch } from "@/lib/fetch";

import type { User } from "@/lib/interfaces/User";
import type { JWToken } from "@/lib/interfaces/JWToken";
import { revalidateTag } from "next/cache";

type AuthResponse = JWToken & { user: User };

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await customFetch(`auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}

type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  password: string;
  confirmPassword: string;
};
export async function register(createUser: CreateUser): Promise<AuthResponse> {
  const response = await customFetch(`auth/register`, {
    method: "POST",
    body: JSON.stringify(createUser),
  });

  if (response.ok) {
    revalidateTag("users");
  }

  return response.json();
}
