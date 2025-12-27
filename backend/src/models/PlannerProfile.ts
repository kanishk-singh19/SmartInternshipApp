import mongoose from "mongoose";

const PlannerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
    skills: [String],
    interests: [String],
    targetRole: String,
    deadline: String,
  },
  { timestamps: true }
);

export default mongoose.model("PlannerProfile", PlannerProfileSchema);
