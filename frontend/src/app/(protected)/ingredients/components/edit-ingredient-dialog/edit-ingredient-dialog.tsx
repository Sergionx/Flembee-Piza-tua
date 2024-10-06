"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "@/hooks/use-toast";
import {
  createIngredientSchema,
  CreateIngredientSchemaType,
} from "../create-ingredient-dialog/schema";

import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FloatingLabelInputField } from "@/components/ui/derived/floating-label-input";
import SubmitButton from "@/components/ui/derived/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Unit, type Ingredient } from "@/lib/interfaces/Ingredient";

export default function EditIngredientDialog({
  ingredient,
  close,
}: {
  ingredient: Ingredient;
  close: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(createIngredientSchema),
    mode: "onBlur",
    defaultValues: {
      name: ingredient.name,
      price: ingredient.price,
      stock: ingredient.stock,
      unit: ingredient.unit,
    },
  });

  async function onSubmit(data: CreateIngredientSchemaType) {
    console.log(data);
    try {
      // const result = await createIngredient(data);

      toast({
        variant: "success",
        title: "Creación de ingrediente exitosa",
        description: `Ha creado el ingrediente ${data.name}`,
      });

      close();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al crear al usuario",
        description: error.message,
      });
    }
  }

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Editar un Ingrediente</DialogTitle>
        <DialogDescription>Edita el campo que desee</DialogDescription>
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

          <fieldset className="flex flex-row gap-4">
            <FloatingLabelInputField
              name="price"
              type="number"
              label="Precio"
              containerClassname="w-full"
              showErrors={true}
            />

            <FloatingLabelInputField
              name="stock"
              type="number"
              label="Stock"
              min={0}
              containerClassname="w-full"
              showErrors={true}
            />
          </fieldset>

          {/* TODO - Estilizarlo para que tenga los colores y eso */}
          <FormField
            name="unit"
            render={({ field }) => (
              <FormItem className="space-y-2 flex flex-col">
                <FormLabel>Unidad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Unit.KG}>Kg</SelectItem>
                    <SelectItem value={Unit.G}>G</SelectItem>
                    <SelectItem value={Unit.L}>L</SelectItem>
                    <SelectItem value={Unit.ML}>Ml</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <DialogFooter>
            <SubmitButton isSubmitting={form.formState.isSubmitting}>
              Editar ingrediente
            </SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
