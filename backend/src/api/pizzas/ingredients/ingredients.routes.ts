import { Router } from "express";
import {
  createIngredientHandler,
  deleteIngredientHandler,
  getIngredientByIdHandler,
  getIngredients,
  getIngredientsByPizzaHandler,
  updateIngredientHandler,
} from "./ingredients-handlers";

const router = Router();

router.get("/", getIngredients);
router.post("/", createIngredientHandler);

router.get("/:id", getIngredientByIdHandler);
router.delete("/:id", deleteIngredientHandler);
router.put("/:id", updateIngredientHandler);

router.get("/pizza/:id", getIngredientsByPizzaHandler);

export default router;
