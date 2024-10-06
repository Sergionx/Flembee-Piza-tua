"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserSchema,
  defaultValues,
  type CreateUserSchemaType,
} from "./schema";
import { toast } from "@/hooks/use-toast";
import { register } from "@/lib/api/auth.service";
import { Role } from "@/lib/interfaces/User";

import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FloatingLabelInputField } from "@/components/ui/derived/floating-label-input";
import { FloatingLabelPasswordInput } from "@/components/ui/derived/floating-label-password-input";
import SubmitButton from "@/components/ui/derived/submit-button";

export default function CreateUserDialog({
  close,
}: {
  close: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: defaultValues,
  });


  async function onSubmit(data: CreateUserSchemaType) {
    try {
      const result = await register(data);

      const fullName = `${result.user.name} ${result.user.lastName}`;

      toast({
        variant: "success",
        title: "Creación de usuario exitosa",
        description: `Ha creado al usuario: ${fullName}`,
      });

      form.reset();
      close();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al crear al usuario",
        description: error.message,
      });
    }
  }

  return (
    <DialogContent className="sm:max-w-2xl" >
      <DialogHeader>
        <DialogTitle>Crea un usuario</DialogTitle>
        <DialogDescription>
          Puedes crear un nuevo usuario normal o admin
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="flex flex-row gap-4">
            <FloatingLabelInputField
              name="name"
              label="Nombre"
              containerClassname="w-full"
              showErrors={true}
            />

            <FloatingLabelInputField
              name="lastName"
              label="Apellido"
              containerClassname="w-full"
              showErrors={true}
            />
          </fieldset>

          <fieldset className="flex flex-row gap-4">
            <FloatingLabelInputField
              name="email"
              label="Email"
              type="email"
              containerClassname="w-full"
              showErrors={true}
            />

            <FormField
              name="role"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="space-y-2 flex flex-col">
                  <FormLabel>Admin?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={value === Role.ADMIN}
                      onCheckedChange={(checked) => {
                        onChange(checked ? Role.ADMIN : Role.USER);
                      }}
                      size="sm"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="flex flex-row gap-4">
            <FloatingLabelPasswordInput
              name="password"
              label="Contraseña"
              containerClassname="w-full"
              showErrors={true}
            />

            <FloatingLabelPasswordInput
              name="confirmPassword"
              label="Confirmar Contraseña"
              containerClassname="w-full"
              showErrors={true}
            />
          </fieldset>

          <DialogFooter>
            <SubmitButton isSubmitting={form.formState.isSubmitting}>
              Crear usuario
            </SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
