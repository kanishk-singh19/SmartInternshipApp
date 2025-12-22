const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateRoadmap(data: {
  skills: string[];
  interests: string[];
  targetRole: string;
  deadline: string;
}) {
  const res = await fetch(`${API_URL}/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to generate roadmap");
  }

  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${API_URL}/history`);
  return res.json();
}
