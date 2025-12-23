"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { internships } from "../mockInternships";

export default function InternshipDetail() {
  const { id } = useParams();
  const internship = internships.find((i) => i.id === id);

  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);

  if (!internship) {
    return <div className="p-6">Internship not found</div>;
  }

  // 🔹 Generate Roadmap
  async function handleGenerateRoadmap() {
    try {
      setLoading(true);
      setError("");
      setRoadmap(null);

      const res = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          internship: {
            role: internship.title,
            company: internship.company,
            requiredSkills: internship.skills,
            deadline: internship.deadline,
          },
          userSkills: ["HTML", "CSS"], // later from user profile
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate roadmap");
      }

      setRoadmap(data.data.plan);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Apply Internship
  function handleApply() {
    const appliedInternships =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    localStorage.setItem(
      "appliedInternships",
      JSON.stringify([...appliedInternships, internship])
    );

    setApplied(true);
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-3xl font-bold">{internship.title}</h1>
      <p className="text-muted-foreground">{internship.company}</p>

      <p className="mt-4">{internship.description}</p>

      <div className="mt-4 space-y-1">
        <p>📍 {internship.location}</p>
        <p>💰 {internship.stipend}</p>
        <p>⏳ Deadline: {internship.deadline}</p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleGenerateRoadmap}
          disabled={loading}
          className="bg-blue-600 px-6 py-2 rounded text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>

        <button
          onClick={handleApply}
          disabled={applied}
          className="bg-green-600 px-6 py-2 rounded text-white disabled:opacity-50"
        >
          {applied ? "Applied ✅" : "Apply"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-500 font-medium">{error}</p>
      )}

      {/* Roadmap Output */}
      {roadmap && (
        <div className="mt-6 bg-muted p-4 rounded-lg whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">📘 Your AI Roadmap</h2>
          {roadmap}
        </div>
      )}
    </div>
  );
}
