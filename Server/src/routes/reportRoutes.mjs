import express from "express";
import {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} from "../controllers/reportController.mjs";
import { authenticate, requireRole } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get(
  "/",
  authenticate,
  requireRole(["viewer", "reviewer", "admin"]),
  getReports
);

router.get(
  "/:id",
  authenticate,
  requireRole(["viewer", "reviewer", "admin"]),
  getReportById
);

// Admin or Reviewer only

router.post(
  "/",
  authenticate,
  requireRole(["reviewer", "admin"]),
  createReport
);
router.put(
  "/:id",
  authenticate,
  requireRole(["reviewer", "admin"]),
  updateReport
);
router.delete(
  "/:id",
  authenticate,
  requireRole(["reviewer", "admin"]),
  deleteReport
);

export default router;
