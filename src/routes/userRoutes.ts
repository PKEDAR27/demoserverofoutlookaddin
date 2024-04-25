import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers";
import { authenticateJWT } from "../middleware/authenticationMiddleware";

const router = express.Router();

router.get("/", authenticateJWT, getUsers);
router.post("/", createUser);
router.put("/:id", authenticateJWT, updateUser);
router.delete("/:id", authenticateJWT, deleteUser);

export default router;