"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type RoadmapHistory = {
  internshipId: string;
  title: string;
  generatedAt: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<RoadmapHistory[]>([]);

  // Load history on mount
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(stored);
  }, []);

  // Delete a roadmap
  function handleDelete(id: string) {
    const updated = history.filter(
      (item) => item.internshipId !== id
    );

    localStorage.setItem(
      "history",
      JSON.stringify(updated)
    );

    setHistory(updated);
  }

  if (history.length === 0) {
    return (
      <p className="p-6 text-muted-foreground">
        No roadmaps generated yet.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Roadmap History
      </h1>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.internshipId}
            className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted transition"
          >
            {/* Clickable Info */}
            <Link
              href={`/internship/${item.internshipId}`}
              className="flex-1"
            >
              <h2 className="text-lg font-semibold">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                Generated on{" "}
                {new Date(item.generatedAt).toLocaleString()}
              </p>
            </Link>

            {/* Delete Button */}
            <button
              onClick={() =>
                handleDelete(item.internshipId)
              }
              className="ml-4 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
