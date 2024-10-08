import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AutocompleteInputField } from "@/components/ui/derived/floating-label-autocomplete";
import { FloatingLabelInputField } from "@/components/ui/derived/floating-label-input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { Option } from "@/components/ui/derived/autocomplete";
import { Unit } from "@/lib/interfaces/Ingredient";

interface Props {
  index: number;
  ingredientsOptions: Option[];
  remove: (index: number) => void;
  lenFields: number;
}

// TODO - Add hover par ver los errores
export default function IngredientInput({
  index,
  ingredientsOptions,
  remove,
  lenFields,
}: Props) {
  const ingredientName = `ingredients.${index}`;

  return (
    <fieldset className="flex flex-row max-sm:flex-wrap gap-4 items-center">
      <AutocompleteInputField
        name={`${ingredientName}.ingredientOption`}
        label="Ingrediente"
        options={ingredientsOptions}
        emptyMessage="No hay Ingredientes para escoger"
        // showErrors={true}
        containerClassname="w-full"
      />

      <FloatingLabelInputField
        name={`${ingredientName}.quantity`}
        label="Cantidad"
        type="number"
        containerClassname="w-1/4 min-w-[5rem]"
        // showErrors={true}
      />

      <FormField
        name={`${ingredientName}.unit`}
        render={({ field }) => (
          <FormItem className="space-y-2 flex flex-col min-w-20 h-14">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-full">
                  <SelectValue />
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

      <Button
        size="icon"
        variant="outline"
        onClick={() => remove(index)}
        className="ml-auto border-destructive shrink-0"
        disabled={lenFields === 1}
      >
        <Trash />
      </Button>
    </fieldset>
  );
}
