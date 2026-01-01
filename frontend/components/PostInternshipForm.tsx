"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";

export default function PostInternshipForm() {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [stipend, setStipend] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/internships`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            company,
            location,
            description,
            stipend,
            duration,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to post internship");
      }

      setMessage("Internship posted successfully ✅");
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setStipend("");
      setDuration("");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-card p-6 max-w-xl"
    >
      <h2 className="text-xl font-semibold">Post Internship</h2>

      {message && (
        <p className="text-sm text-primary">{message}</p>
      )}

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg border p-2"
        required
      />

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full rounded-lg border p-2"
        required
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full rounded-lg border p-2"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-lg border p-2"
        required
      />

      <input
        placeholder="Stipend"
        value={stipend}
        onChange={(e) => setStipend(e.target.value)}
        className="w-full rounded-lg border p-2"
      />

      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full rounded-lg border p-2"
      />

      <button
        disabled={loading}
        className="w-full rounded-lg bg-primary text-primary-foreground py-2"
      >
        {loading ? "Posting..." : "Post Internship"}
      </button>
    </form>
  );
}
