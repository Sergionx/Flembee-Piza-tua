import { SignUpForm } from "./SignUpForm";
import { Toaster } from "@/components/ui/toaster";

export default function page() {
  return (
    <div className="flex h-svh items-center justify-center">
      <SignUpForm />
      <Toaster />
    </div>
  );
}
