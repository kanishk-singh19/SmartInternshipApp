import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  skills: string[];
  interests: string[];
  targetRole: string;
  deadline: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    skills: {
      type: [String],
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    targetRole: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
