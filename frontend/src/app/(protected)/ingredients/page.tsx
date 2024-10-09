import { getIngredients } from "@/lib/api/ingredients.service";
import { getPizzas } from "@/lib/api/pizzas.service";

import { columns } from "./ingredients-columns";
import CreateIngredientDialogRoot from "./components/create-ingredient-dialog/dialog";
import CreatePizzaDialogRoot from "./components/create-pizza-dialog/dialog";
import ProudctionDialogRoot from "./components/production-dialog/dialog";

import { DataTable } from "@/components/DataTable";

import type { Option } from "@/components/ui/derived/autocomplete";

export default async function Ingredients() {
  const [ingredients, pizzas] = await Promise.all([
    getIngredients(),
    getPizzas(),
  ]);

  const ingredientsOption: Option[] = ingredients.map((ingredient) => ({
    value: ingredient.id,
    label: ingredient.name,
  }));
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex mb-4 gap-16">
        <h1 className="text-3xl font-bold">Ingredientes</h1>

        <section className="flex flex-wrap gap-4 ml-auto">
          <CreateIngredientDialogRoot />

          <CreatePizzaDialogRoot ingredientsOption={ingredientsOption} />

          <ProudctionDialogRoot pizzas={pizzas} />
        </section>
      </div>

      <DataTable columns={columns} data={ingredients} />
    </div>
  );
}
