import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../handlers/users";

const router = Router();

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
