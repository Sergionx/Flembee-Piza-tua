export interface Ingredient {
  id: string
  name: string
  price: number
  stock: number
  createdAt: Date
  updatedAt: Date
}

export interface PizzaIngredient {
  id: string
  pizzaId: string
  ingredientId: string
  quantity: number
}