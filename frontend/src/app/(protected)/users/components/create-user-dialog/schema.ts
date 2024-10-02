import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "El nombre debe tener al menos 4 caracteres" })
      .max(255, { message: "El nombre debe tener menos de 255 caracteres" }),
    lastName: z
      .string()
      .min(4, { message: "El apellido debe tener al menos 4 caracteres" })
      .max(255, { message: "El apellido debe tener menos de 255 caracteres" }),
    email: z.string().email({
      message: "El email debe ser un email válido",
    }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .regex(/[A-Z]/, {
        message: "La contraseña debe tener al menos una letra mayúscula",
      })
      .regex(/[a-z]/, {
        message: "La contraseña debe tener al menos una letra minúscula",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe tener al menos un número",
      }),
    confirmPassword: z.string().min(1, {
      message: "Este campo es requerido",
    }),
    role: z.enum(["admin", "user"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;

export const defaultValues: CreateUserSchemaType = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
};
