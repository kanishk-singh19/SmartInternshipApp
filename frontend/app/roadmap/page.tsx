"use client";

import { useEffect, useState } from "react";

type Internship = {
  title: string;
  company: string;
  skills: string[];
  deadline: string;
};

export default function RoadmapPage() {
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roadmap, setRoadmap] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("selectedInternship");
    if (stored) {
      setInternship(JSON.parse(stored));
    }
  }, []);

  const generateRoadmap = async () => {
    if (!internship) return;

    setLoading(true);
    setError("");
    setRoadmap("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          internship: {
            role: internship.title,
            company: internship.company,
            requiredSkills: internship.skills,
            deadline: internship.deadline,
          },
          userSkills: ["HTML", "CSS"], // mock for now
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate");
      }

      const json = await res.json();

      // 🔥 THIS WAS MISSING
      setRoadmap(json.data.plan);
    } catch (err) {
      setError("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  if (!internship) {
    return <p className="p-6">No internship selected</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-1">
        {internship.title}
      </h1>
      <p className="text-muted-foreground mb-4">
        Deadline: {internship.deadline}
      </p>

      <button
        onClick={generateRoadmap}
        disabled={loading}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>

      {error && (
        <p className="mt-3 text-red-500">{error}</p>
      )}

      {/* 🔥 SHOW ROADMAP */}
      {roadmap && (
        <div className="mt-6 rounded-lg border border-border bg-card p-4 whitespace-pre-line">
          <h2 className="text-xl font-semibold mb-2">
            Learning Roadmap
          </h2>
          {roadmap}
        </div>
      )}
    </div>
  );
}
