import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

/* ✅ FIXED PRE-SAVE HOOK (NO next()) */
AuthUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

AuthUserSchema.methods.matchPassword = function (entered: string) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model<AuthUserDocument>("AuthUser", AuthUserSchema);
