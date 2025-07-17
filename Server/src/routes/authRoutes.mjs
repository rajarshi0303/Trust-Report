import express from "express";
import {
  register,
  login,
  logout,
  refreshTokenHandler,
  getMe,
} from "../controllers/authController.mjs";
import { authenticate } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshTokenHandler);
router.get("/me", authenticate, getMe);

export default router;
