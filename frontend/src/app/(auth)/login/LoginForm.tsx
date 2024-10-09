"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { defaultValues, loginSchema, type LoginSchemaType } from "./schema";

import { toast } from "@/hooks/use-toast";
import { login } from "@/lib/api/auth.service";
import { useAuth } from "@/context/auth-context";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingLabelPasswordInput } from "@/components/ui/derived/floating-label-password-input";
import { Form } from "@/components/ui/form";
import { FloatingLabelInputField } from "@/components/ui/derived/floating-label-input";
import SubmitButton from "@/components/ui/derived/submit-button";



export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues,
  });

  const { login: saveLoginData } = useAuth();
  const router = useRouter();

  async function onSubmit(data: LoginSchemaType) {
    try {
      const result = await login(data.email, data.password);

      const token = {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      };
      const fullName = `${result.user.name} ${result.user.lastName}`;

      toast({
        variant: "success",
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${fullName}`,
      })
      saveLoginData(token, result.user);
      router.push("/users");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description: error.message,
      })
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Ingresa tu email y contraseña para acceder a tu cuenta.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FloatingLabelInputField
              type="email"
              name="email"
              label="Email"
              showErrors
              showColorsState={false}
            />
            <FloatingLabelPasswordInput
              name="password"
              label="Contraseña"
              containerClassname="w-full"
              showErrors
              showColorsState={false}
            />
          </CardContent>

          <CardFooter>
            <SubmitButton
              className="w-full"
              isSubmitting={form.formState.isSubmitting}
            >
              Iniciar sesión
            </SubmitButton>
          </CardFooter>
          <div className="mt-4 pb-4 text-center text-sm">
            Aún no tienes una cuenta?{" "}
            <Link href="/register" className="underline">
              Regístrate
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  );
}
