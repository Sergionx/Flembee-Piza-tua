"use client";

import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loadingUser } = useAuth();

  if (!user && !loadingUser) {
    redirect("login");
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
