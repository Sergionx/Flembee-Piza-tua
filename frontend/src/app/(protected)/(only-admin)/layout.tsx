"use client";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/auth-context";
import { Role } from "@/lib/interfaces/User";
import { redirect } from "next/navigation";

export default function OnlyAdminlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loadingUser } = useAuth();

  if (!loadingUser && (!user || user.role !== Role.ADMIN)) {
    redirect("login");
  }

  return children
}
