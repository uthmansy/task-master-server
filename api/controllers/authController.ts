import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof Error) {
      // Narrow the type of `error` to access `error.message`
      res.status(400).json({ error: error.message });
    } else {
      // Handle unexpected error types
      res.status(400).json({ error: "An unexpected error occurred" });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "Invalid email or password" });
      return; // Ensure to return after sending a response
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
