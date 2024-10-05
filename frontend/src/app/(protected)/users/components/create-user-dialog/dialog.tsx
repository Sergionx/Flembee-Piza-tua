"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import CreateUserDialog from "./create-user-dialog";

export default function CreateUserDialogRoot() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="success" className="ml-auto">
          <Plus className="w-6 h-6 mr-2" />
          Crear usuario
        </Button>
      </DialogTrigger>
      <CreateUserDialog close={() => setOpen(false)} />
    </Dialog>
  );
}
