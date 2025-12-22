"use client";

import { useEffect, useState } from "react";
import { fetchHistory } from "@/lib/api";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory().then(setHistory);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Generated Roadmaps</h1>

      {history.map((item: any) => (
        <div
          key={item._id}
          className="bg-gray-900 p-4 rounded mb-3"
        >
          <p className="font-semibold">{item.targetRole}</p>
          <p className="text-sm text-gray-400">
            Deadline: {item.deadline}
          </p>
        </div>
      ))}
    </div>
  );
}
