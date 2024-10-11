import express from "express";
import "tsconfig-paths/register";

import ingredientRoutes from "@/api/pizzas/ingredients/ingredients.routes";
import pizzaRoutes from "@/api/pizzas/pizzas/pizzas.routes";
import userRoutes from "@/api/users/users.routes";
import authRoutes from "@/api/auth/auth.routes";
import orderRoutes from "@/api/orders/orders.routes";
import statsRoutes from "@/api/stats/stats.routes";

const PORT = 3001;

const app = express();

app.use(express.json());

app.use("/api/ingredients", ingredientRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
