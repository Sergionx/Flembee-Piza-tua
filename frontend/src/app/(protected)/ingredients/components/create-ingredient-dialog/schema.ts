import { Unit } from "@/lib/interfaces/Ingredient";
import { z } from "zod";

export const createIngredientSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(255, { message: "El nombre debe tener menos de 255 caracteres" }),
  price: z
    .number()
    .positive({ message: "El precio debe ser un número positivo" }),
  stock: z
    .number()
    .positive({ message: "El stock debe ser un número positivo" }),
  unit: z.nativeEnum(Unit),
});

export type CreateIngredientSchemaType = z.infer<typeof createIngredientSchema>;

export const defaultValues: CreateIngredientSchemaType = {
  name: "",
  price: 0,
  stock: 0,
  unit: Unit.KG,
};
