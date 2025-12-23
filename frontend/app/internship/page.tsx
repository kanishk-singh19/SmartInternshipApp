"use client";

import { useState } from "react";
import Link from "next/link";

export type Internship = {
  id: string;
  title: string;
  company: string;
  skills: string[];
  deadline: string;
  description: string;
  location: string;
  stipend: string;
};

export const internships: Internship[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Google",
    skills: ["React", "JavaScript", "Tailwind"],
    deadline: "2025-02-15",
    description: "Work on modern frontend applications using React.",
    location: "Remote",
    stipend: "₹30,000 / month",
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: "Amazon",
    skills: ["Node.js", "Express", "MongoDB"],
    deadline: "2025-03-01",
    description: "Build scalable backend APIs.",
    location: "Bangalore",
    stipend: "₹35,000 / month",
  },
];

export default function InternshipsPage() {
  const [search, setSearch] = useState("");

  const filtered = internships.filter((i) =>
    `${i.title} ${i.company} ${i.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Internships</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search internships..."
        className="mb-6 w-full max-w-md rounded-lg border px-4 py-2"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((internship) => (
          <div key={internship.id} className="rounded-xl border p-5 bg-card">
            <h2 className="text-lg font-semibold">{internship.title}</h2>
            <p className="text-muted-foreground">{internship.company}</p>

            <div className="mt-3 flex gap-2 flex-wrap">
              {internship.skills.map((skill) => (
                <span key={skill} className="bg-muted px-2 py-1 text-xs rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              Deadline: {internship.deadline}
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Link
                href={`/internship/${internship.id}`}
                className="border rounded-md py-2 text-center hover:bg-muted"
              >
                View Details
              </Link>

              <button
                onClick={() => {
                  localStorage.setItem("selectedInternship", JSON.stringify(internship));
                  window.location.href = "/roadmap";
                }}
                className="bg-primary text-primary-foreground rounded-md py-2"
              >
                Generate Roadmap
              </button>

              <button
                onClick={() => alert("Applied successfully ✅")}
                className="bg-green-600 text-white rounded-md py-2"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
