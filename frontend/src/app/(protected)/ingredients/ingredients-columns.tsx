"use client";
import { useState } from "react";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import type { ColumnDef } from "@tanstack/react-table";
import type { Ingredient } from "@/lib/interfaces/Ingredient";
import { cn } from "@/lib/utils";
import DeleteIngredienteDialog from "./components/delete-ingredient-dialog";
import EditIngredientDialog from "./components/edit-ingredient-dialog/edit-ingredient-dialog";

export const columns: ColumnDef<Ingredient>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
  },

  {
    header: () => <div className="text-center">Precio</div>,
    accessorKey: "price",
    cell: ({ row }) => {
      const { price } = row.original;

      return <div className="text-center">{price}$</div>;
    },
  },

  {
    header: () => <div className="text-center">Stock</div>,
    accessorKey: "stock",
    cell: ({ row }) => {
      const { stock, unit } = row.original;

      const unitColor =
        stock < 10
          ? "text-destructive"
          : stock < 20
          ? "text-yellow-500"
          : "text-success";

      return (
        <div className={cn("text-center", unitColor)}>
          {stock}
          {"  "}

          {unit}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Fecha de Creación</div>,

    cell: ({ row }) => {
      const { createdAt } = row.original;

      const date = new Date(createdAt);
      return (
        <div className="text-center">{date.toLocaleDateString("es-ES")}</div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-center">Fecha de Modificación</div>,

    cell: ({ row }) => {
      const { updatedAt } = row.original;

      const date = new Date(updatedAt);
      return (
        <div className="text-center">{date.toLocaleDateString("es-ES")}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ingredient = row.original;

      enum Dialogs {
        editDialog = "dialog1",
        deleteDialog = "dialog2",
      }

      const [currentDialog, setCurrentDialog] = useState<Dialogs | null>(null);
      const isOpen = currentDialog !== null;

      return (
        <Dialog
          open={isOpen}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setCurrentDialog(null);
            }
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>

              <DialogTrigger
                asChild
                onClick={() => {
                  setCurrentDialog(Dialogs.editDialog);
                }}
              >
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar Ingrediente
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger
                asChild
                onClick={() => {
                  setCurrentDialog(Dialogs.deleteDialog);
                }}
              >
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Eliminar Ingrediente
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>

            {currentDialog === Dialogs.editDialog ? (
              <EditIngredientDialog
                ingredient={ingredient}
                close={() => setCurrentDialog(null)}
              />
            ) : (
              <DeleteIngredienteDialog
                ingredient={ingredient}
                close={() => setCurrentDialog(null)}
              />
            )}
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];
