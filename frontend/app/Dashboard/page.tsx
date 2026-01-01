"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* =====================================================
   MAIN DASHBOARD PAGE (SINGLE ROUTE)
===================================================== */
export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // Wait for auth hydration
  useEffect(() => {
    if (user === null) {
      // auth not ready yet
      setReady(true);
      return;
    }
    setReady(true);
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (ready && !user) {
      router.push("/login");
    }
  }, [ready, user, router]);

  if (!ready || !user) return null;

  // ROLE-BASED RENDERING
  return user.role === "student" ? (
    <StudentDashboard />
  ) : (
    <RecruiterDashboard />
  );
}

/* =====================================================
   STUDENT DASHBOARD
===================================================== */
function StudentDashboard() {
  const [appliedCount, setAppliedCount] = useState(0);
  const [roadmapCount, setRoadmapCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const applied = JSON.parse(
      localStorage.getItem("appliedInternships") || "[]"
    );

    const roadmaps = JSON.parse(
      localStorage.getItem("generatedRoadmaps") || "[]"
    );

    setAppliedCount(applied.length);
    setRoadmapCount(roadmaps.length);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Track applications and AI-generated roadmaps
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        <DashboardCard title="Applied Internships" value={appliedCount} />
        <DashboardCard title="Roadmaps Generated" value={roadmapCount} />
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push("/internship")}
          className="rounded-lg bg-primary px-6 py-2 text-primary-foreground"
        >
          Browse Internships
        </button>

        <button
          onClick={() => router.push("/history")}
          className="rounded-lg border border-border px-6 py-2"
        >
          View Roadmap History
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   RECRUITER DASHBOARD
===================================================== */
function RecruiterDashboard() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Manage internships and applicants
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <DashboardCard title="Posted Internships" value={0} />
        <DashboardCard title="Total Applicants" value={0} />
        <DashboardCard title="Active Listings" value={0} />
      </div>

      <div className="mt-8">
        <Link href="/Dashboard/post-internship">
          <button className="rounded-lg bg-primary px-6 py-2 text-primary-foreground">
            + Post New Internship
          </button>
        </Link>
      </div>
    </div>
  );
}

/* =====================================================
   REUSABLE CARD
===================================================== */
function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-sm text-muted-foreground">{title}</h2>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
