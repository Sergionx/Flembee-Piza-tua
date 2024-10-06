export enum Unit {
  KG = "KG",
  G = "G",
  L = "L",
  ML = "ML"
}

export interface Ingredient {
  id: string
  name: string
  price: number
  stock: number
  unit: Unit
  createdAt: string
  updatedAt: string
}

export interface PizzaIngredient {
  id: string
  pizzaId: string
  ingredientId: string
  quantity: number
}