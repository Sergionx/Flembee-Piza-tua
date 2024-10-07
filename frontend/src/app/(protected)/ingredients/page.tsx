import { getIngredients } from "@/lib/api/ingredients.service";
import { columns } from "./ingredients-columns";
import { DataTable } from "@/components/DataTable";
import CreateIngredientDialogRoot from "./components/create-ingredient-dialog/dialog";
import CreatePizzaDialogRoot from "./components/create-pizza-dialog/dialog";

import  type { Option } from "@/components/ui/derived/autocomplete";

export default async function Ingredients() {
  const data = await getIngredients();

  const ingredientsOption: Option[] = data.map((ingredient) => ({
    value: ingredient.id,
    label: ingredient.name,
  }));
  return (
    <div className="container mx-auto py-10">
      <div className="flex mb-4">
        <h1 className="text-3xl font-bold">Ingredientes</h1>

        <section className="flex gap-4 ml-auto">
          <CreateIngredientDialogRoot />

          <CreatePizzaDialogRoot ingredientsOption={ingredientsOption} />
        </section>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
