import express from "express";
import { generatePlan, getHistory } from "../controllers/aiController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/generate", protect, generatePlan);
router.get("/history", protect, getHistory);

export default router;
