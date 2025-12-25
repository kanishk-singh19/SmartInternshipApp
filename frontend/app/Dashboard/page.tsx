"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [appliedCount, setAppliedCount] = useState(0);
  const [roadmapCount, setRoadmapCount] = useState(0);

  useEffect(() => {
    const applied =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    const history =
      JSON.parse(localStorage.getItem("history") || "[]");

    setAppliedCount(applied.length);
    setRoadmapCount(history.length);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        {/* Applied */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">
            Applied Internships
          </h2>
          <p className="text-4xl font-bold mt-2">
            {appliedCount}
          </p>
        </div>

        {/* Roadmaps */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">
            Roadmaps Generated
          </h2>
          <p className="text-4xl font-bold mt-2">
            {roadmapCount}
          </p>
        </div>
      </div>
    </div>
  );
}
