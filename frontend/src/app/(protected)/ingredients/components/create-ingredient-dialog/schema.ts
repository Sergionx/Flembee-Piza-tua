import { Unit } from "@/lib/interfaces/Ingredient";
import { z } from "zod";

export const createIngredientSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "El nombre debe tener al menos 4 caracteres" })
      .max(255, { message: "El nombre debe tener menos de 255 caracteres" }),
    price: z.number().min(0, {message: "El precio no puede ser negativo"}),
    stock: z.number().min(0, {message: "El stock no puede ser negativo"}),
    unit: z.nativeEnum(Unit)
  })
  
export type CreateIngredientSchemaType = z.infer<typeof createIngredientSchema>;

export const defaultValues: CreateIngredientSchemaType = {
  name: "",
  price: 0,
  stock: 0,
  unit: Unit.G
};
