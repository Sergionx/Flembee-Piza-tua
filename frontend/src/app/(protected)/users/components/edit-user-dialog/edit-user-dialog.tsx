"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { editUserSchema, type EditUserSchemaType } from "./schema";
import type { User } from "@/lib/interfaces/User";

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
import { Spinner } from "@/components/ui/spinner";

export default function EditUserDialog({ user }: { user: User }) {
  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  });

  // TODO - Submit
  function onSubmit(data: EditUserSchemaType) {}

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Edita un usuario</DialogTitle>
        <DialogDescription>Edita el campo que desee</DialogDescription>
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
              readOnly
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
              Editar usuario
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
