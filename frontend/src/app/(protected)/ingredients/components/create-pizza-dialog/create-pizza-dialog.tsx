"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";

import {
  createPizzaSchema,
  defaultValues,
  type CreatePizzaSchemaType,
} from "./schema";
import { toast } from "@/hooks/use-toast";
import { createPizza } from "@/lib/api/piza.service";

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

import IngredientInput from "./ingredient-input";

import { Unit } from "@/lib/interfaces/Ingredient";
import type { Option } from "@/components/ui/derived/autocomplete";


export default function CreatePizzaDialog({
  ingredientsOption,
  close,
}: {
  ingredientsOption: Option[];
  close: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(createPizzaSchema),
    mode: "onBlur",
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  async function onSubmit(data: CreatePizzaSchemaType) {
    try {
      const result = await createPizza(
        {
          name: data.name,
        },
        data.ingredients.map((ingredient) => ({
          ingredientId: ingredient.ingredientOption.value,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        }))
      );

      toast({
        variant: "success",
        title: "Creación de pizza exitosa",
        description: `Ha creado la pizza ${result.name}`,
      });

      // form.reset();
      close();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al crear la pizza",
        description: error.message,
      });
    }
  }

  // console.log(form.formState.errors, form.watch("ingredients"));

  return (
    <DialogContent className="sm:max-w-2xl max-h-[70vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Crea una Receta de pizza</DialogTitle>
        <DialogDescription>
          Escoge los ingredientes y sus cantidades para esta pizza
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="flex flex-row gap-4">
            <FloatingLabelInputField
              name="name"
              label="Nombre"
              containerClassname="w-full"
              showErrors={true}
            />
          </fieldset>

            <section className="flex">
              <h3 className="text-lg font-semibold">Ingredientes</h3>

              <div className="flex flex-row ml-auto">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-success border-success"
                  onClick={() =>
                    append({
                      ingredientOption: {
                        label: "",
                        value: "",
                      },
                      unit: Unit.G,
                      quantity: 0,
                    })
                  }
                >
                  <PlusIcon />
                </Button>
              </div>
            </section>
          <section className="space-y-6 !mt-2">
            {fields.map((field, index) => (
              <IngredientInput
                key={field.ingredientOption.value + index}
                index={index}
                ingredientsOptions={ingredientsOption}
                remove={remove}
                lenFields={fields.length}
              />
            ))}
          </section>

          <DialogFooter>
            <SubmitButton isSubmitting={form.formState.isSubmitting}>
              Crear Pizza
            </SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
