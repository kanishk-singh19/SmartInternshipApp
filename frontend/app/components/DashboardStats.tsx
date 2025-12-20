import { Briefcase, CheckCircle, Eye } from "lucide-react";

const stats = [
  { label: "Applied", value: 12, icon: Briefcase },
  { label: "Shortlisted", value: 4, icon: CheckCircle },
  { label: "Viewed", value: 18, icon: Eye },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm"
        >
          <div className="p-3 rounded-lg bg-gray-100">
            <Icon className="w-5 h-5 text-gray-700" />
          </div>

          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
