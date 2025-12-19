import mongoose from "mongoose";

const AIPlanSchema = new mongoose.Schema(
  {
    internship: {
      role: { type: String, required: true },
      company: String,
      requiredSkills: { type: [String], required: true },
      deadline: { type: String, required: true },
    },
    userSkills: {
      type: [String],
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AIPlan", AIPlanSchema);
