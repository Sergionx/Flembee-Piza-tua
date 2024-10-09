import { Unit } from "@/lib/interfaces/Ingredient";
import { z } from "zod";

export const orderPizzaSchema = z.object({
  pizzas: z.record(
    z.string(),
    z.object({
      quantity: z
        .number()
        .int({
          message: "La cantidad debe ser un número entero",
        })
        .min(0, {
          message: "La cantidad no puede ser negativa",
        })
        .max(100, {
          message: "La cantidad máxima es 100",
        }),
      price: z.number().min(0, {
        message: "El precio no puede ser negativo",
      }),
    })
  ),
});

export type OrderPizzaSchemaType = z.infer<typeof orderPizzaSchema>;
