import { Router } from "express";
import {
  createPizzaHandler,
  deletePizzaHandler,
  getPizzas,
} from "./pizzas-handlers";

const router = Router();

router.get("/", getPizzas);
router.post("/", createPizzaHandler);


router.delete("/:id", deletePizzaHandler);

export default router;
