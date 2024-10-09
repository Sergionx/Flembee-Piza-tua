import { Unit } from "./Ingredient";

export interface Pizza {
  id: string;
  name: string;
}

export interface PizzaWithIngredients extends Pizza {
  price: number;
  ingredients: {
    id: string;
    name: string;
    quantity: number;
    stock: number;
    price: number;
    unitPrice: Unit;
    unitQuantity: Unit;
  }[];
}
