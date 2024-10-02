"use client";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import type { User } from "@/lib/interfaces/User";
import type { ColumnDef } from "@tanstack/react-table";
import EditUserDialog from "./components/edit-user-dialog/edit-user-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import DeleteUserDialog from "./components/delete-user-dialog";

export const columns: ColumnDef<User>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    header: "Apellido",
    accessorKey: "lastName",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Rol",
    cell: ({ row }) => {
      const { role } = row.original;
      const roleStr = role === "admin" ? "Administrador" : "Usuario";

      return (
        <span
          className={cn("px-2 rounded-md py-1", {
            "bg-red-500 text-white": role === "admin",
            "bg-blue-500 text-white": role === "user",
          })}
        >
          {roleStr}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Fecha de creación</div>,

    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <div className="text-center">
          {createdAt.toLocaleDateString("en-US")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      enum Dialogs {
        editDialog = "dialog1",
        deleteDialog = "dialog2",
      }

      const [currentDialog, setCurrentDialog] = useState<Dialogs | null>();

      return (
        <Dialog>
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
                  Editar Usuario
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
                  Eliminar Usuario
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>

            {currentDialog === Dialogs.editDialog ? (
              <EditUserDialog user={user} />
            ) : (
              <DeleteUserDialog user={user} />
            )}
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];
