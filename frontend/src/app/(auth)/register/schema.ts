import { passwordSchema } from "@/app/(protected)/users/components/create-user-dialog/schema";
import { z } from "zod";

export const registerSchema = z
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
    password: passwordSchema,
    confirmPassword: z.string().min(1, {
      message: "Este campo es requerido",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const defaultValues: RegisterSchemaType = {
  email: "",
  password: "",
  name: "",
  lastName: "",
  confirmPassword: "",
};
