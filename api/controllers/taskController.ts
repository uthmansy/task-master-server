import { Request, Response } from "express";
import Task from "../models/Task";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = new Task({ ...req.body, user: req.user?.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user?.id }).sort({
      createdAt: -1,
    });
    console.log(req.user?.id);
    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const completeTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.body; // Extract taskId from the request body
    console.log(req.body);

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const task = await Task.findOne({ _id: taskId, user: req.user?.id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = true; // Mark the task as completed
    await task.save();

    res.status(200).json({ message: "Task marked as completed", task });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.body; // Extract taskId from the request parameters
    console.log(taskId);

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const task = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user?.id,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const searchTask = async (req: AuthRequest, res: Response) => {
  try {
    const { query } = req.body; // Extract the search query from query parameters
    console.log(query);

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const tasks = await Task.find({
      user: req.user?.id,
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search on title
        { description: { $regex: query, $options: "i" } }, // Case-insensitive search on description
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
