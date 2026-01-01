import express from "express";
import {
  createInternship,
  getAllInternships,
} from "../controllers/internshipController";
import { protect, recruiterOnly } from "../middleware/authMiddleware";

const router = express.Router();

// Recruiter only
router.post("/", protect, recruiterOnly, createInternship);

// Public (students can view)
router.get("/", getAllInternships);

export default router;
