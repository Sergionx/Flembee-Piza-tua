"use client";

import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/auth-context";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loadingUser } = useAuth();

  if (!user && !loadingUser) {
    toast(
      {
        title: "No autorizado",
        description: "Debes iniciar sesión para acceder a esta página",
        variant: "destructive",
      },
    )
    redirect("login");
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
