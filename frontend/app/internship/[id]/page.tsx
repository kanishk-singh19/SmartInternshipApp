"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { internships } from "../mockInternships";
import { generateRoadmap } from "@/lib/api";

type AppliedInternship = {
  id: string;
  title: string;
  company: string;
  appliedAt: string;
};

type HistoryItem = {
  internshipId: string;
  title: string;
  generatedAt: string;
};

export default function InternshipDetail() {
  const params = useParams();
  const id = params.id as string;

  const internship = internships.find((i) => i.id === id);

  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  /* -----------------------------------
     Check applied status on load
  ------------------------------------*/
  useEffect(() => {
    if (!id) return;

    const appliedList: AppliedInternship[] =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    setApplied(appliedList.some((i) => i.id === id));
  }, [id]);

  if (!internship) {
    return <div className="p-6">Internship not found</div>;
  }

  /* -----------------------------------
     Generate Roadmap + Save History
  ------------------------------------*/
  async function handleGenerate() {
    try {
      setLoading(true);
      setError("");

      const res = await generateRoadmap({
        internship: {
          role: internship.title,
          company: internship.company,
          requiredSkills: internship.skills,
          deadline: internship.deadline,
        },
        userSkills: ["HTML", "CSS"],
      });

      const plan = res?.data?.plan || "No roadmap generated";
      setRoadmap(plan);

      // ✅ SAVE TO HISTORY
      const history: HistoryItem[] =
        JSON.parse(localStorage.getItem("history") || "[]");

      const alreadyExists = history.some(
        (h) => h.internshipId === internship.id
      );

      if (!alreadyExists) {
        history.push({
          internshipId: internship.id,
          title: internship.title,
          generatedAt: new Date().toISOString(),
        });

        localStorage.setItem("history", JSON.stringify(history));
      }
    } catch {
      setError("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  }

  /* -----------------------------------
     Apply / Cancel Application
  ------------------------------------*/
  function handleApplyToggle() {
    const appliedList: AppliedInternship[] =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    if (applied) {
      // ❌ Cancel
      const updated = appliedList.filter((i) => i.id !== id);
      localStorage.setItem("appliedInternships", JSON.stringify(updated));
      setApplied(false);
    } else {
      // ✅ Apply
      appliedList.push({
        id: internship.id,
        title: internship.title,
        company: internship.company,
        appliedAt: new Date().toISOString(),
      });

      localStorage.setItem(
        "appliedInternships",
        JSON.stringify(appliedList)
      );

      setApplied(true);
    }
  }

  /* -----------------------------------
     UI
  ------------------------------------*/
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-3xl font-bold">{internship.title}</h1>
      <p className="text-muted-foreground">{internship.company}</p>

      <p className="mt-4">{internship.description}</p>

      <div className="mt-3 space-y-1">
        <p><b>Location:</b> {internship.location}</p>
        <p><b>Stipend:</b> {internship.stipend}</p>
        <p><b>Deadline:</b> {internship.deadline}</p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 px-6 py-2 rounded text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>

        <button
          onClick={handleApplyToggle}
          className={`px-6 py-2 rounded text-white ${
            applied ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {applied ? "Cancel Application" : "Apply"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {roadmap && (
        <div className="mt-6 bg-muted p-4 rounded whitespace-pre-wrap">
          {roadmap}
        </div>
      )}
    </div>
  );
}
