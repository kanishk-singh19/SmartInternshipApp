import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Strongly type the document so methods like `matchPassword` are known to TS
export interface AuthUserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "recruiter";
  matchPassword(entered: string): Promise<boolean>;
}

const AuthUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
  },
  { timestamps: true }
);

// Use `any` for `next` to avoid mismatched Mongoose typings for hook callbacks
AuthUserSchema.pre("save", async function (this: any, next: any) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AuthUserSchema.methods.matchPassword = function (entered: string) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model<AuthUserDocument>("AuthUser", AuthUserSchema);
