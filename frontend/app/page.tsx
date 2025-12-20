import DashboardStats from "./components/DashboardStats";
import { internships } from "./data/internships";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      <DashboardStats />

      <section>
        <h2 className="text-lg font-semibold mb-4">
          Available Internships
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">
                {internship.role}
              </h3>

              <p className="text-sm text-gray-500">
                {internship.company} • {internship.location}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Skills: {internship.skills.join(", ")}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Deadline:{" "}
                <span className="font-medium">
                  {internship.deadline}
                </span>
              </p>

              <Link href={`/internship/${internship.id}`}>
                <button className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
