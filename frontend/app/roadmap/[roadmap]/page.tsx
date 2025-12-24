"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "generatedRoadmaps";

type RoadmapItem = {
  roadmapId: string;
  title: string;
  roadmap: string;
  generatedAt: string;
};

export default function RoadmapPage() {
  const { roadmapId } = useParams() as { roadmapId: string };

  const [item, setItem] = useState<RoadmapItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored: RoadmapItem[] =
      JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const found = stored.find(
      (r) => r.roadmapId === roadmapId
    );

    setItem(found || null);
    setLoading(false);
  }, [roadmapId]);

  if (loading) return <p className="p-6">Loading…</p>;

  if (!item)
    return <p className="p-6 text-red-500">Roadmap not found</p>;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">
        {item.title}
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        {new Date(item.generatedAt).toLocaleString()}
      </p>

      <div className="border rounded-lg p-5 whitespace-pre-wrap">
        {item.roadmap}
      </div>
    </div>
  );
}
