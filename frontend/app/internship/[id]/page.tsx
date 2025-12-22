"use client";

import { useState } from "react";
import { generateRoadmap } from "@/lib/api";

export default function InternshipDetail({ params }: any) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);

    const response = await generateRoadmap({
      skills: ["React", "JavaScript"],
      interests: ["Web Development"],
      targetRole: "Frontend Intern",
      deadline: "30 days",
    });

    setResult(response.result);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Frontend Intern</h1>

      <button
        onClick={handleGenerate}
        className="mt-6 bg-blue-600 px-6 py-2 rounded-lg"
      >
        {loading ? "Generating..." : "Generate AI Roadmap"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-900 p-4 rounded-lg whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}
