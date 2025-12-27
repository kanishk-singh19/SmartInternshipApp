"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "recruiter";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  // Accept either (email, password) or a payload { token, user }
  login: (emailOrPayload: string | { token: string; user: User }, password?: string) => Promise<void> | void;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    role: "student" | "recruiter";
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  const login = async (emailOrPayload: string | { token: string; user: User }, password?: string) => {
    // If called with (email, password)
    if (typeof emailOrPayload === "string") {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrPayload, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      const data = await res.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("auth", JSON.stringify(data));
      return;
    }

    // Otherwise accept a payload directly (used after signup or SSR)
    setUser(emailOrPayload.user);
    setToken(emailOrPayload.token);
    localStorage.setItem("auth", JSON.stringify({ token: emailOrPayload.token, user: emailOrPayload.user }));
  };

  const signup = async (form: {
    name: string;
    email: string;
    password: string;
    role: "student" | "recruiter";
  }) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Signup failed");
    }

    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
