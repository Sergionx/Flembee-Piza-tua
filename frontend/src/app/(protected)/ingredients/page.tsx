import { getIngredients } from '@/lib/api/ingredients.service';
import { columns } from './ingredients-columns';
import { DataTable } from '@/components/DataTable';
import CreateIngredientDialogRoot from './components/create-ingredient-dialog/dialog';

export default async function Ingredients() {
  const data = await getIngredients();

  console.log(data)
  return (
    <div className="container mx-auto py-10">
      <div className="flex mb-4">
        <h1 className="text-3xl font-bold">Ingredientes</h1>
        <CreateIngredientDialogRoot />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
