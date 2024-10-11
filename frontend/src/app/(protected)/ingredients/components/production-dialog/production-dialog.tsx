"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { orderPizzaSchema, type OrderPizzaSchemaType } from "./schema";
import { columns } from "./pizzaIngredients-columns";

import { toast } from "@/hooks/use-toast";
import { createOrder } from "@/lib/api/orders.service";

import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FloatingLabelInputField } from "@/components/ui/derived/floating-label-input";
import SubmitButton from "@/components/ui/derived/submit-button";

import { Unit } from "@/lib/interfaces/Ingredient";

import type { PizzaWithIngredients } from "@/lib/interfaces/Pizza";
import { round } from "@/lib/numbers";
import { DataTable } from "@/components/DataTable";
import { useAuth } from "@/context/auth-context";

export type DataPizza = OrderPizzaSchemaType["pizzas"]["string"];
export default function ProductionDialog({
  pizzas,
  close,
}: {
  pizzas: PizzaWithIngredients[];
  close: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(orderPizzaSchema),
    mode: "onBlur",
    defaultValues: {
      pizzas: pizzas.reduce((acc, pizza) => {
        acc[pizza.id] = {
          quantity: 0,
          price: 0
        };
        return acc;
      }, {} as Record<string, DataPizza>),
    },
  });

  const {token} = useAuth()

  async function onSubmit(data: OrderPizzaSchemaType) {
    const filteredPizzas: Record<string, DataPizza> = {};

    for (const [key, value] of Object.entries(data.pizzas)) {
      if (value.quantity > 0) {
        filteredPizzas[key] = value;
      }
    }

    try {
      const result = await createOrder({
        pizzas: filteredPizzas,
      }, token?.accessToken);

      console.log(result)
      toast({
        variant: "success",
        title: "Orden creada exitosamente",
        description: `Ha creado la orden ${result.id} con el total de ${result.total}$`,
      });

      form.reset();
      close();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al crear la orden",
        description: error.message,
      });
    }
  }

  return (
    <DialogContent className="sm:max-w-2xl max-h-[70vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Producción de Pizzas</DialogTitle>
        <DialogDescription>
          Especifica la cantidad de pizzas que deseas producir por cada receta
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <section className="space-y-4">
            {pizzas.map((pizza) => (
              <div key={pizza.id} className="w-full">
                <span className="flex flex-row flex-wrap gap-2 items-center">
                  <h3 className="font-semibold">{pizza.name}:</h3>

                  <span className="text-gray-700">
                    Total: {round(pizza.price, 2)}$
                  </span>

                  <FloatingLabelInputField
                    label="Cantidad"
                    type="number"
                    name={`pizzas.${pizza.id}.quantity`}
                    // disabled={pizza.price > 2}
                    min={0}
                    step={1}
                    className="w-24"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      form.setValue(
                        `pizzas.${pizza.id}.price`,
                        value * pizza.price
                      );
                    }}
                    containerClassname="ml-auto"
                  />
                </span>

                <div className="mt-2">
                  <DataTable columns={columns} data={pizza.ingredients} />
                </div>
              </div>
            ))}
          </section>

          <DialogFooter>
            <SubmitButton isSubmitting={form.formState.isSubmitting}>
              Producir recetas
            </SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
