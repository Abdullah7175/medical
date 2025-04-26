"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDietitians: 0,
    totalPatients: 0,
    totalReports: 0,
  });

  useEffect(() => {
    // Simulating fetching admin stats (replace with actual API later)
    setStats({
      totalDietitians: 5,
      totalPatients: 150,
      totalReports: 200,
    });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Total Dietitians</h2>
          <p className="text-2xl">{stats.totalDietitians}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Total Patients</h2>
          <p className="text-2xl">{stats.totalPatients}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Total Reports</h2>
          <p className="text-2xl">{stats.totalReports}</p>
        </div>
      </div>
      {/* Add more features, like manage users, view reports, etc. */}
    </div>
  );
}
