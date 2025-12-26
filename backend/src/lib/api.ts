export async function generateRoadmap(payload: any) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}
