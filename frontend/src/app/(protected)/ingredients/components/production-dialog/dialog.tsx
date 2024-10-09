"use client";
import { Cog } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import ProductionDialog from "./production-dialog";

import type { PizzaWithIngredients } from "@/lib/interfaces/Pizza";

export default function ProudctionDialogRoot({
  pizzas,
}: {
  pizzas: PizzaWithIngredients[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-x-2">
          <Cog className="w-6 h-6" />
          Producir
        </Button>
      </DialogTrigger>
      <ProductionDialog pizzas={pizzas} close={() => setOpen(false)} />
    </Dialog>
  );
}
