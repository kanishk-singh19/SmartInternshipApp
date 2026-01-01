import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    stipend: {
      type: String,
    },
    deadline: {
      type: String,
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Internship", InternshipSchema);
