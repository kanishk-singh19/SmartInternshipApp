import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthUser from "../models/AuthUser";


const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

// SIGNUP
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await AuthUser.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await AuthUser.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
  console.error("SIGNUP ERROR 👉", err.message || err);
  res.status(500).json({
    message: err.message || "Signup failed",
  });
}

};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await AuthUser.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};
