"use client";

import { useState } from "react";
import Link from "next/link";

type Internship = {
  id: string;
  title: string;
  company: string;
  skills: string[];
  deadline: string;
};

const mockInternships: Internship[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Google",
    skills: ["React", "JavaScript", "Tailwind"],
    deadline: "15 Feb 2025",
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: "Amazon",
    skills: ["Node.js", "Express", "MongoDB"],
    deadline: "1 Mar 2025",
  },
  {
    id: "3",
    title: "Full Stack Intern",
    company: "Microsoft",
    skills: ["React", "Node.js", "SQL"],
    deadline: "28 Feb 2025",
  },
];

export default function InternshipsPage() {
  const [search, setSearch] = useState("");

  const filteredInternships = mockInternships.filter((internship) => {
    const query = search.toLowerCase();
    return (
      internship.title.toLowerCase().includes(query) ||
      internship.company.toLowerCase().includes(query) ||
      internship.skills.join(" ").toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Available Internships</h1>
      <p className="text-muted-foreground mb-6">
        Explore internships and generate AI-powered learning roadmaps
      </p>

      {/* Search Bar */}
      <div className="max-w-md mb-6">
        <input
          type="text"
          placeholder="Search by role, company, or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full rounded-lg border border-border bg-background
            px-4 py-2 text-sm focus:outline-none
            focus:ring-2 focus:ring-primary
          "
        />
      </div>

      {/* Internship Cards */}
      {filteredInternships.length === 0 ? (
        <p className="text-muted-foreground">No internships found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <div
              key={internship.id}
              className="
                rounded-xl border border-border bg-card
                p-5 transition hover:shadow-lg
              "
            >
              <h2 className="text-lg font-semibold">
                {internship.title}
              </h2>

              <p className="text-sm text-muted-foreground">
                {internship.company}
              </p>

              {/* Skills */}
              <div className="mt-3 flex flex-wrap gap-2">
                {internship.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-2 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Deadline */}
              <p className="mt-3 text-sm text-muted-foreground">
                Deadline: {internship.deadline}
              </p>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/internships/${internship.id}`}
                  className="
                    flex-1 rounded-md border border-border
                    px-3 py-2 text-sm text-center hover:bg-muted
                  "
                >
                  View Details
                </Link>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "roadmap",
                      `Roadmap for ${internship.title} will appear here`
                    );
                    window.location.href = "/roadmap";
                  }}
                  className="
                    flex-1 rounded-md bg-primary px-3 py-2
                    text-sm font-medium text-primary-foreground
                    hover:opacity-90
                  "
                >
                  Generate Roadmap
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
