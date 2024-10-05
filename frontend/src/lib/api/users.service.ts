"use server";
import { type User } from "@/lib/interfaces/User";
import { customFetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

export async function getUsers() {
  const response = await customFetch("users", {
    next: {
      tags: ["users"],
    },
  });

  const data = await response.json();

  return data as User[];
}

export async function getUserById(id: string) {
  const response = await customFetch(`users/${id}`, {
    next: {
      tags: ["users", id],
    },
  });

  const data = await response.json();

  if (!data) {
    return null;
  }

  return data as User;
}

export async function updateUser(id: string, user: Partial<User>) {
  const response = await customFetch(`users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    next: {
      tags: ["users", id],
    },
  });

  if (response.ok) {
    revalidateTag("users");
  }

  const data = await response.json();

  return data as User;
}


export async function deleteUser(id: string){
  const response = await customFetch(`users/${id}`, {
    method: "delete",
    next: {
      tags: ["users", id],
    },
  });

  if (response.ok) {
    revalidateTag("users");
  }

  const data = await response.json();

  return data
}