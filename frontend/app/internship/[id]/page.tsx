"use client";

import { useParams } from "next/navigation";
import { internships } from "../../data/internships";
import { useState } from "react";

export default function InternshipDetailPage() {
  const { id } = useParams();
  const internship = internships.find((i) => i.id === id);

  const [userSkills, setUserSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  if (!internship) {
    return <p className="p-6">Internship not found</p>;
  }

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    const res = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        internship: {
          role: internship.role,
          company: internship.company,
          requiredSkills: internship.skills,
          deadline: internship.deadline,
        },
        userSkills: userSkills.split(",").map((s) => s.trim()),
      }),
    });

    const data = await res.json();
    setResult(data.data?.plan || "No response");
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">
          {internship.role}
        </h1>

        <p className="text-gray-500 mt-1">
          {internship.company} • {internship.location}
        </p>

        <p className="mt-4 text-gray-600">
          {internship.description}
        </p>

        <p className="mt-4 text-sm text-gray-600">
          <strong>Required Skills:</strong>{" "}
          {internship.skills.join(", ")}
        </p>

        <p className="mt-2 text-sm text-gray-600">
          <strong>Deadline:</strong>{" "}
          {internship.deadline}
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold mb-2">
          Your Current Skills
        </h2>

        <input
          className="w-full border rounded-lg p-2"
          placeholder="HTML, CSS"
          value={userSkills}
          onChange={(e) => setUserSkills(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Generating..." : "Generate AI Roadmap"}
        </button>
      </div>

      {result && (
        <div className="bg-gray-900 text-green-400 p-6 rounded-xl whitespace-pre-wrap text-sm">
          {result}
        </div>
      )}
    </main>
  );
}
