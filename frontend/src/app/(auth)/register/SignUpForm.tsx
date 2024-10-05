"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { defaultValues, registerSchema, RegisterSchemaType } from "./schema";
import { toast } from "@/hooks/use-toast";
import { register } from "@/lib/api/auth.service";
import { useAuth } from "@/context/auth-context";
import { Role } from "@/lib/interfaces/User";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FloatingLabelInputField } from "@/components/ui/derived/floating-label-input";
import { FloatingLabelPasswordInput } from "@/components/ui/derived/floating-label-password-input";
import SubmitButton from "@/components/ui/derived/submit-button";

export function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const { login } = useAuth();

  async function onSubmit(data: RegisterSchemaType) {
    try {
      const result = await register({
        ...data,
        role: Role.ADMIN,
      });

      const token = {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      };

      const fullName = `${result.user.name} ${result.user.lastName}`;

      toast({
        variant: "success",
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${fullName}`,
      });

      login(token, result.user);

      // TODO - Redireccionar y guardar el token
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description: error.message,
      });
    }
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Registrar admin</CardTitle>
        <CardDescription>
          Ingresa los datos de tu cuenta para crear la cuenta de admin
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInputField name="name" label="Nombre" showErrors />
              <FloatingLabelInputField
                name="lastName"
                label="Apellido"
                showErrors
              />
            </div>
            <FloatingLabelInputField
              type="email"
              name="email"
              label="Email"
              showErrors
            />
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelPasswordInput
                name="password"
                label="Contraseña"
                showErrors
              />

              <FloatingLabelPasswordInput
                name="confirmPassword"
                label="Confirmar Contraseña"
                showErrors
              />
            </div>

            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              className="w-full"
            >
              Crear cuenta
            </SubmitButton>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Ya tienes una cuenta?{" "}
          <Link href="/login" className="underline">
            Iniciar sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
