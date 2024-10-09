import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { PizzaWithIngredients } from "@/lib/interfaces/Pizza";
import { round, convertMagnitude } from "@/lib/numbers";

type Ingredients = Pick<PizzaWithIngredients, "ingredients">;
type Ingredient = Ingredients["ingredients"][number];
export const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "stock",
    header: "Disponibilidad",
    cell: ({ row }) => {
      const { stock, unitPrice, quantity, unitQuantity } = row.original;

      const realStock = convertMagnitude(
        { value: stock, unit: unitPrice },
        unitQuantity
      );

      return (
        <span
          className={cn("text-green-500", {
            "text-yellow-600": realStock < quantity * 2,
            "text-red-500": realStock < quantity || stock === 0,
          })}
        >
          {round(stock, 2)} {unitPrice}
        </span>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Cantidad Necesaria",
    cell: ({ row }) => {
      const { quantity, unitQuantity } = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>
            {quantity} {unitQuantity}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio unitario",
    cell: ({ row }) => {
      const { price, unitPrice, unitQuantity, quantity } = row.original;

      const totalPrice = round(
        price *
          convertMagnitude({ value: quantity, unit: unitQuantity }, unitPrice),
        2
      );
      return (
        <div className="flex items-center gap-2">
          <span>{totalPrice} $</span>
        </div>
      );
    },
  },
];
