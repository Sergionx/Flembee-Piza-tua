import { Unit } from "@/lib/interfaces/Ingredient";
import { z } from "zod";

const ingredientOption = z.object({
  label: z.string(),
  value: z.string(),
});

export const createPizzaSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "El nombre de la pizza debe tener al menos 4 caracteres",
    })
    .max(255, {
      message: "El nombre de la pizza debe tener menos de 255 caracteres",
    }),
  ingredients: z.array(
    z.object({
      // ingredientId: z.string().min(1, { message: "El ingrediente es requerido" }),
      ingredientOption: ingredientOption,
      quantity: z
        .number()
        .min(0, { message: "La cantidad debe ser un número positivo" }),
      unit: z.nativeEnum(Unit),
    })
  ),
});

export type CreatePizzaSchemaType = z.infer<typeof createPizzaSchema>;

export const defaultValues: CreatePizzaSchemaType = {
  name: "",
  ingredients: Array(3).fill({
    ingredientOption: {
      label: "",
      value: "",
    },
    quantity: 0,
    unit: Unit.G,
  }),
};
