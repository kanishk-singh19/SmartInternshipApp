"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [appliedCount, setAppliedCount] = useState(0);
  const [roadmapCount, setRoadmapCount] = useState(0);

  useEffect(() => {
    const applied =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");
    const roadmaps =
      JSON.parse(localStorage.getItem("generatedRoadmaps") || "[]");

    setAppliedCount(applied.length);
    setRoadmapCount(roadmaps.length);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">
            Internships Applied
          </h2>
          <p className="text-3xl font-bold mt-2">{appliedCount}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">
            Roadmaps Generated
          </h2>
          <p className="text-3xl font-bold mt-2">{roadmapCount}</p>
        </div>
      </div>
    </div>
  );
}
