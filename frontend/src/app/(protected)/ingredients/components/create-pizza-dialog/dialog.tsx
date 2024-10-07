"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import CreatePizzaDialog from "./create-pizza-dialog";

import type { Option } from "@/components/ui/derived/autocomplete";

export default function CreatePizzaDialogRoot({
  ingredientsOption,
}: {
  ingredientsOption: Option[]
}) {
  const [open, setOpen] = useState(false);

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-success">
          <Plus className="w-6 h-6 mr-2" />
          Crear Receta de Pizza
        </Button>
      </DialogTrigger>
      <CreatePizzaDialog ingredientsOption={ingredientsOption} close={() => setOpen(false)} />
    </Dialog>
  );
}
