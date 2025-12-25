"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { internships } from "./mockInternships";

type AppliedInternship = {
  id: string;
};

export default function InternshipsPage() {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  /* -------------------------------
     Load applied internships
  --------------------------------*/
  useEffect(() => {
    const applied: AppliedInternship[] =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    setAppliedIds(applied.map((i) => i.id));
  }, []);

  const filtered = internships.filter((i) =>
    `${i.title} ${i.company} ${i.skills.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Available Internships</h1>
      <p className="text-muted-foreground mb-6">
        Explore internships and generate AI-powered roadmaps
      </p>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by role, company, or skill..."
        className="mb-6 w-full max-w-md rounded-lg border border-border bg-background px-4 py-2"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((internship) => {
          const isApplied = appliedIds.includes(internship.id);

          return (
            <div
              key={internship.id}
              className="relative rounded-xl border border-border bg-card p-5"
            >
              {/* Applied badge */}
              {isApplied && (
                <span className="absolute top-3 right-3 rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                  Applied
                </span>
              )}

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

              <Link
                href={`/internship/${internship.id}`}
                className="mt-4 inline-block w-full rounded-md border border-border px-3 py-2 text-center text-sm hover:bg-muted"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
