import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";

import connectDB from "./config/db";

dotenv.config();

const app = express();

connectDB();
// Middleware
app.use(cors());

app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

// Global Error Handling Middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // If the error is an instance of Error, return the message
    res.status(500).json({ error: err.message });
  } else {
    // In case of unknown error, respond with a generic message
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

export default app;
