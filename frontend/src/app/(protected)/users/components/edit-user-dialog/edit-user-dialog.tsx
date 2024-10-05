"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { editUserSchema, type EditUserSchemaType } from "./schema";
import { toast } from "@/hooks/use-toast";
import { login } from "@/lib/api/auth.service";
import { type User, Role } from "@/lib/interfaces/User";

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
import SubmitButton from "@/components/ui/derived/submit-button";
import { updateUser } from "@/lib/api/users.service";

export default function EditUserDialog({
  user,
  close,
}: {
  user: User;
  close: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(editUserSchema),
    mode: "onBlur",
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  });

  // TODO - Submit
  async function onSubmit(data: EditUserSchemaType) {
    try {
      const updatedUser = await updateUser(user.id, data);

      const fullName = `${updatedUser.name} ${updatedUser.lastName}`;

      toast({
        variant: "success",
        title: "Creación de usuario exitosa",
        description: `Ha creado al usuario: ${fullName}`,
      });

      close();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al editar al usuario",
        description: error.message,
      });
    }
  }

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

          <DialogFooter>
            <SubmitButton isSubmitting={form.formState.isSubmitting}>
              Editar usuario
            </SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
