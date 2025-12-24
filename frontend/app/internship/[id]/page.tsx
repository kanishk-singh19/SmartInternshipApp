"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { internships } from "../mockInternships";
import { generateRoadmap } from "@/lib/api";

type RoadmapHistoryItem = {
  roadmapId: string;
  internshipId: string;
  title: string;
  roadmap: string;
  generatedAt: string;
};

type AppliedInternship = {
  id: string;
  title: string;
  company: string;
  appliedAt: string;
};

export default function InternshipDetail() {
  const params = useParams();
  const id = params?.id?.toString();

  const internship = internships.find((i) => i.id === id);

  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  /* -------------------------------------------
     Check applied status
  --------------------------------------------*/
  useEffect(() => {
    if (!id) return;

    const appliedList: AppliedInternship[] =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    setApplied(appliedList.some((i) => i.id === id));
  }, [id]);

  if (!internship) {
    return <div className="p-6">Internship not found</div>;
  }

  /* -------------------------------------------
     Generate Roadmap (FIXED)
  --------------------------------------------*/
  async function handleGenerate() {
    try {
      setLoading(true);
      setError("");
      setRoadmap(null);

      const res = await generateRoadmap({
        internship: {
          role: internship.title,
          company: internship.company,
          requiredSkills: internship.skills,
          deadline: internship.deadline,
        },
        userSkills: ["HTML", "CSS"],
      });

      const planText = res?.data?.plan || "No roadmap generated";
      setRoadmap(planText);

      // ✅ FIXED: Save full roadmap with UNIQUE ID
      const history: RoadmapHistoryItem[] =
        JSON.parse(localStorage.getItem("generatedRoadmaps") || "[]");

      history.push({
        roadmapId: crypto.randomUUID(), // ✅ REQUIRED
        internshipId: internship.id,
        title: internship.title,
        roadmap: planText,
        generatedAt: new Date().toISOString(),
      });

      localStorage.setItem(
        "generatedRoadmaps",
        JSON.stringify(history)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------
     Apply / Cancel Application
  --------------------------------------------*/
  function handleApplyToggle() {
    const appliedList: AppliedInternship[] =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    if (applied) {
      const updated = appliedList.filter(
        (i) => i.id !== internship.id
      );
      localStorage.setItem(
        "appliedInternships",
        JSON.stringify(updated)
      );
      setApplied(false);
    } else {
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

  /* -------------------------------------------
     UI
  --------------------------------------------*/
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

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 px-6 py-2 rounded text-white"
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
