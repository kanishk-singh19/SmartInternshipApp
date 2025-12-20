"use client";

import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          Smart Internship Planner
        </h1>

        <div className="flex items-center gap-4 text-gray-600">
          <Bell className="w-5 h-5 cursor-pointer" />
          <UserCircle className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
