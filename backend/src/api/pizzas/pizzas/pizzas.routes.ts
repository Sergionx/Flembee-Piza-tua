import { Router } from "express";
import {
  createPizzaHandler,
  deletePizzaHandler,
  getPizzaByIdHandler,
  getPizzas,
} from "./pizzas-handlers";

const router = Router();

router.get("/", getPizzas);
router.post("/", createPizzaHandler);

router.get("/:id", getPizzaByIdHandler);
router.delete("/:id", deletePizzaHandler);

export default router;
