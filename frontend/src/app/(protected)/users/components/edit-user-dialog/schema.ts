import { z } from "zod";

export const editUserSchema = z.object({
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
  role: z.enum(["admin", "user"]),
});

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
