import express from "express";
import { generatePlan, getHistory } from "../controllers/aiController";

const router = express.Router();

router.post("/generate", generatePlan);
router.get("/history", getHistory);

export default router;
