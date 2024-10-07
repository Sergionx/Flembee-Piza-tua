/*
  Warnings:

  - Added the required column `unit` to the `PizzaIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PizzaIngredient" DROP CONSTRAINT "PizzaIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "PizzaIngredient" DROP CONSTRAINT "PizzaIngredient_pizzaId_fkey";

-- AlterTable
ALTER TABLE "PizzaIngredient" ADD COLUMN     "unit" "Unit" NOT NULL;

-- AddForeignKey
ALTER TABLE "PizzaIngredient" ADD CONSTRAINT "PizzaIngredient_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaIngredient" ADD CONSTRAINT "PizzaIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
