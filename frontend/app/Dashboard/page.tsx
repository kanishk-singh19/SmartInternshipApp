"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

/* =====================================================
   MAIN DASHBOARD PAGE (DO NOT TOUCH ROUTE STRUCTURE)
===================================================== */
export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  // 🔥 ROLE-BASED UI (SINGLE DASHBOARD ROUTE)
  if (user.role === "student") {
    return <StudentDashboard />;
  }

  if (user.role === "recruiter") {
    return <RecruiterDashboard />;
  }

  return null;
}

/* =====================================================
   STUDENT DASHBOARD (YOUR PREVIOUS DASHBOARD CODE)
===================================================== */
function StudentDashboard() {
  const [appliedCount, setAppliedCount] = useState(0);
  const [roadmapCount, setRoadmapCount] = useState(0);

  useEffect(() => {
    const applied =
      JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    const history =
      JSON.parse(localStorage.getItem("history") || "[]");

    setAppliedCount(applied.length);
    setRoadmapCount(history.length);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        {/* Applied Internships */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">
            Applied Internships
          </h2>
          <p className="text-4xl font-bold mt-2">
            {appliedCount}
          </p>
        </div>

        {/* Roadmaps Generated */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">
            Roadmaps Generated
          </h2>
          <p className="text-4xl font-bold mt-2">
            {roadmapCount}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   RECRUITER DASHBOARD (BASIC FOR NOW)
===================================================== */
function RecruiterDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Recruiter Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">
            Posted Internships
          </h2>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">
            Total Applicants
          </h2>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm text-muted-foreground">
            Active Listings
          </h2>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
