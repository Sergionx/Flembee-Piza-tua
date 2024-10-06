import { Router } from "express";
import { getUsers, getUserById, updateUserHandler, deleteUserHandler } from "./users-handler";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);
router.put("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);

export default router;
