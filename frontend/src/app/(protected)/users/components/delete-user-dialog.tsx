"use client";

import useSimpleMutation from "@/hooks/useSimpleMutation";
import { deleteUser } from "@/lib/api/users.service";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import SubmitButton from "@/components/ui/derived/submit-button";

import type { User } from "@/lib/interfaces/User";

export default function DeleteUserDialog({
  user,
  close,
}: {
  user: User;
  close: () => void;
}) {
  const { loading, mutate } = useSimpleMutation({
    fn: () => deleteUser(user.id),
  });

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
          <Button className="gap-x-2" variant="outline">
            Cancelar
          </Button>
        </DialogClose>

        <SubmitButton
          isSubmitting={loading}
          type="button"
          variant="destructive"
          onClick={async () => {
            await mutate();
            close();
          }}
        >
          Eliminar
        </SubmitButton>
      </DialogFooter>
    </DialogContent>
  );
}
