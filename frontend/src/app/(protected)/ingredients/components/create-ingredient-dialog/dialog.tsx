"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import CreateIngredientDialog from "./create-ingredient-dialog";

export default function CreateIngredientDialogRoot() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="success" className="ml-auto">
          <Plus className="w-6 h-6 mr-2" />
          Crear Ingrediente
        </Button>
      </DialogTrigger>
      <CreateIngredientDialog close={() => setOpen(false)} />
    </Dialog>
  );
}
