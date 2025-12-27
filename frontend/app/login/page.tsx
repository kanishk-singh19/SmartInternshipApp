"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/Dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border p-8 bg-card">
        <h1 className="text-2xl font-bold text-center mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Login to continue
        </p>

        {error && (
          <div className="mb-4 text-red-500 text-sm bg-red-500/10 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-background border"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-background border"
          />

          <button
            disabled={loading}
            className="w-full bg-primary text-primary-foreground p-2 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-primary cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
