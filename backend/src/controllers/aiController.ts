import { Request, Response } from "express";
import AIPlan from "../models/AIPlan";
import { getAIProvider } from "../services/ai";

export const generatePlan = async (req: Request, res: Response) => {
  try {
    const { internship, userSkills } = req.body;

    // Validation
    if (
      !internship ||
      !internship.role ||
      !Array.isArray(internship.requiredSkills) ||
      !internship.deadline ||
      !Array.isArray(userSkills)
    ) {
      return res.status(400).json({
        message: "Invalid input format",
      });
    }

    const aiProvider = getAIProvider();

    const planText = await aiProvider.generatePlan({
      internship,
      userSkills,
    });

    const savedPlan = await AIPlan.create({
      internship,
      userSkills,
      plan: planText,
    });

    return res.status(201).json({
      success: true,
      data: savedPlan,
    });
  } catch (error) {
    console.error("AI ERROR 👉", error);
    return res.status(500).json({
      error: "AI generation failed",
    });
  }
};

export const getHistory = async (_req: Request, res: Response) => {
  try {
    const plans = await AIPlan.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch history",
    });
  }
};
