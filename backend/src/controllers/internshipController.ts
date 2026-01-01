import { Request, Response } from "express";
import Internship from "../models/Internship";

// POST /api/internships
export const createInternship = async (req: any, res: Response) => {
  try {
    const {
      title,
      company,
      description,
      skills,
      location,
      stipend,
      deadline,
    } = req.body;

    if (!title || !company || !description || !skills || !deadline) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const internship = await Internship.create({
      title,
      company,
      description,
      skills,
      location,
      stipend,
      deadline,
      recruiter: req.user._id, // 👈 VERY IMPORTANT
    });

    res.status(201).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create internship" });
  }
};

// GET /api/internships
export const getAllInternships = async (_req: Request, res: Response) => {
  const internships = await Internship.find().sort({ createdAt: -1 });
  res.json({ success: true, data: internships });
};
