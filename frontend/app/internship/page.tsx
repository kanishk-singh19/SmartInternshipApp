"use client";

import Link from "next/link";
import { useState } from "react";
import { internships } from "./mockInternships";

export default function InternshipsPage() {
  const [search, setSearch] = useState("");

  // SAFE FILTER — WILL NOT HIDE DATA
  const filteredInternships = internships.filter((i) => {
    const q = search.toLowerCase();
    return (
      i.title.toLowerCase().includes(q) ||
      i.company.toLowerCase().includes(q) ||
      i.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  // DEBUG (remove later)
  console.log("TOTAL:", internships.length);
  console.log("FILTERED:", filteredInternships.length);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Available Internships</h1>
      <p className="text-muted-foreground mb-6">
        Explore internships and generate AI-powered learning roadmaps
      </p>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by role, company, or skill..."
        className="mb-6 w-full max-w-md rounded-lg border px-4 py-2 bg-background"
      />

      {/* Internship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <div
            key={internship.id}
            className="rounded-xl border bg-card p-5"
          >
            <h2 className="text-lg font-semibold">
              {internship.title}
            </h2>

            <p className="text-sm text-muted-foreground">
              {internship.company}
            </p>

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

            <p className="mt-3 text-sm text-muted-foreground">
              Deadline: {internship.deadline}
            </p>

            <div className="mt-4 flex gap-2">
              <Link
                href={`/internship/${internship.id}`}
                className="flex-1 rounded-md border px-3 py-2 text-sm text-center hover:bg-muted"
              >
                View Details
              </Link>

              <button
                onClick={() => {
                  localStorage.setItem(
                    "selectedInternship",
                    JSON.stringify(internship)
                  );
                  window.location.href = "/roadmap";
                }}
                className="flex-1 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
              >
                Generate Roadmap
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
