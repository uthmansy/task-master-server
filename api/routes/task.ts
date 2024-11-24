import { Router } from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  searchTask,
} from "../controllers/taskController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
//@ts-ignore
router.post("/create", authenticateToken, createTask);
// @ts-ignore
router.post("/complete", authenticateToken, completeTask);
//@ts-ignore
router.get("/get", authenticateToken, getTasks);
//@ts-ignore
router.post("/delete", authenticateToken, deleteTask);
//@ts-ignore
router.post("/search", authenticateToken, searchTask);

export default router;
