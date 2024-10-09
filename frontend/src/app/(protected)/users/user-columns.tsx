"use client";
import { useState } from "react";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import EditUserDialog from "./components/edit-user-dialog/edit-user-dialog";
import DeleteUserDialog from "./components/delete-user-dialog";

import { Role, type User } from "@/lib/interfaces/User";
import type { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "role",
    header: () => <div className="text-center">Rol</div>,
    cell: ({ row }) => {
      const { role } = row.original;
      const roleStr = role === Role.ADMIN ? "Administrador" : "Usuario";

      return (
        <div className="flex justify-center">
          <span
            className={cn("px-2 rounded-md py-1", {
              "bg-red-500 text-white": role === Role.ADMIN,
              "bg-blue-500 text-white": role === Role.USER,
            })}
          >
            {roleStr}
          </span>
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
      const user = row.original;

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
              <EditUserDialog
                user={user}
                close={() => setCurrentDialog(null)}
              />
            ) : (
              <DeleteUserDialog
                user={user}
                close={() => setCurrentDialog(null)}
              />
            )}
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];
