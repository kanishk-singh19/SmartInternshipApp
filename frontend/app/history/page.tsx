"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "generatedRoadmaps";

type RoadmapHistoryItem = {
  roadmapId: string;
  title: string;
  generatedAt: string;
};

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<RoadmapHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setHistory(stored);
    setLoading(false);
  }, []);

  if (loading) return <p className="p-6">Loading…</p>;

  if (history.length === 0)
    return <p className="p-6">No roadmaps generated</p>;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">History</h1>

      {history.map((item) => (
        <div
          key={item.roadmapId}
          onClick={() =>
            router.push(`/roadmap/${item.roadmapId}`)
          }
          className="cursor-pointer border rounded-lg p-4 mb-3 hover:bg-muted"
        >
          <h2 className="font-semibold">{item.title}</h2>
          <p className="text-sm text-muted-foreground">
            {new Date(item.generatedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
