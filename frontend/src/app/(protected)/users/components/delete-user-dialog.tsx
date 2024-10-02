"use client";

import type { User } from "@/lib/interfaces/User";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Spinner } from "@/components/ui/spinner";

export default function DeleteUserDialog({ user }: { user: User }) {
  // TODO - Considerar usar react query para las mutaciones o simplemente usar un loading state

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Eliminar un usuario</DialogTitle>
        <DialogDescription>
          ¿Seguro que quiere borrar el usuario?{" "}
          <strong>Esta acción es inalterable...</strong>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" className="gap-x-2" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit" className="gap-x-2" variant="destructive">
          {/* <Spinner
                className="text-white"
                show={form.formState.isSubmitting}
              /> */}
          Eliminar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
