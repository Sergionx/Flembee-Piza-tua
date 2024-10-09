import { Router } from "express";

import { createOrderHandler } from "./order-handlers";
import { isAuthenticated } from "@/api/auth/auth-middleware";

const router = Router();

router.post("/", isAuthenticated, createOrderHandler);

export default router;
