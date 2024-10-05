import { passwordSchema } from "@/app/(protected)/users/components/create-user-dialog/schema";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Por favor, ingresa un email válido"),
  password: passwordSchema,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const defaultValues: LoginSchemaType = {
  email: "",
  password: "",
};
