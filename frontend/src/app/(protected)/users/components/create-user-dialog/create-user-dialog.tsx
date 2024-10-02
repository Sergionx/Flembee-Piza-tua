"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserSchema,
  defaultValues,
  type CreateUserSchemaType,
} from "./schema";

import { Button } from "@/components/ui/button";
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
import { Spinner } from "@/components/ui/spinner";

export default function CreateUserDialog() {
  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: defaultValues,
  });

  // TODO - Submit
  function onSubmit(data: CreateUserSchemaType) {}

  return (
    <DialogContent className="sm:max-w-2xl">
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
                      checked={value === "admin"}
                      onCheckedChange={(checked) => {
                        onChange(checked ? "admin" : "user");
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
            <Button
              type="submit"
              className="gap-x-2"
              disabled={form.formState.isSubmitting}
            >
              <Spinner
                className="text-white"
                show={form.formState.isSubmitting}
              />
              Crear usuario
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
