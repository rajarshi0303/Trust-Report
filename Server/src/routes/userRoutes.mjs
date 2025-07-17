import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.mjs";
import { requireRole, authenticate } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.use(authenticate);
router.use(requireRole(["admin"]));

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
