import { LoginForm } from "./LoginForm";
import { Toaster } from "@/components/ui/toaster";

export default function page() {
  return (
    <div className="flex h-svh items-center justify-center">
      <LoginForm />
      <Toaster />
    </div>
  );
}
