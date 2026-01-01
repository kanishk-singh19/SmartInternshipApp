"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function PostInternshipPage() {
  const { user, token } = useAuth();
  const router = useRouter();

  // 🔐 Only recruiters allowed
  if (!user || user.role !== "recruiter") {
    router.push("/dashboard");
    return null;
  }

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    skills: "",
    location: "",
    stipend: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/internships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to post internship");
      }

      setSuccess("Internship posted successfully 🎉");
      setForm({
        title: "",
        company: "",
        description: "",
        skills: "",
        location: "",
        stipend: "",
        deadline: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Post New Internship</h1>

      {error && (
        <div className="mb-4 rounded bg-red-500/10 p-3 text-red-500">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded bg-green-500/10 p-3 text-green-500">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Internship Title" name="title" value={form.title} onChange={handleChange} />
        <Input label="Company" name="company" value={form.company} onChange={handleChange} />
        
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2"
          />
        </div>

        <Input
          label="Required Skills (comma separated)"
          name="skills"
          value={form.skills}
          onChange={handleChange}
        />

        <Input label="Location" name="location" value={form.location} onChange={handleChange} />
        <Input label="Stipend" name="stipend" value={form.stipend} onChange={handleChange} />
        <Input
          label="Deadline"
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-6 py-2 text-primary-foreground disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Internship"}
        </button>
      </form>
    </div>
  );
}

/* =======================
   Reusable Input
======================= */
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-lg border border-border bg-background px-4 py-2"
      />
    </div>
  );
}
