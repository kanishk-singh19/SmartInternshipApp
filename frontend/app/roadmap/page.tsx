"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const internshipRaw = localStorage.getItem("selectedInternship");

    if (!internshipRaw) {
      setRoadmap("No internship selected.");
      setLoading(false);
      return;
    }

    const internship = JSON.parse(internshipRaw);

    const generateRoadmap = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ai/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            internship,
            userSkills: ["HTML", "CSS"], // later make dynamic
          }),
        });

        const data = await res.json();

        // ✅ correct path
        setRoadmap(data.data.plan);
      } catch (err) {
        setRoadmap("Failed to generate roadmap.");
      } finally {
        setLoading(false);
      }
    };

    generateRoadmap();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">AI Generated Learning Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Generating roadmap...</p>
          ) : (
            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
              {roadmap}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
