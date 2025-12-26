import mongoose, { Schema } from "mongoose";

const AIPlanSchema = new Schema(
  {
    // 🔑 Link roadmap to logged-in user
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    internship: {
      role: { type: String, required: true },
      company: { type: String },
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
