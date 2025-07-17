import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { requestLogger } from "./src/middlewares/requestLogger.mjs";
import reportRoutes from "./src/routes/reportRoutes.mjs";
import feedbackRoutes from "./src/routes/feedbackRoutes.mjs";
import authRoutes from "./src/routes/authRoutes.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";

import { connectDB } from "./src/config/db.mjs";

//Connect to Database
connectDB();

const app = express();

// Global Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(requestLogger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
