import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/aiRoutes";
import { authRoutes } from "./routes/authRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- Test Route -------------------- */
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

/* -------------------- Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

/* -------------------- MongoDB -------------------- */
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.error("MongoDB connection error:", err)
  );

/* -------------------- Server -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
