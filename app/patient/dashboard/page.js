"use client";

import { useState } from "react";

export default function PatientDashboard() {
  const [progress, setProgress] = useState({
    weight: "75kg",
    bodyFat: "18%",
    dietAdherence: "80%",
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Patient Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold">Your Progress</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Weight</span>
            <span>{progress.weight}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Body Fat</span>
            <span>{progress.bodyFat}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Diet Adherence</span>
            <span>{progress.dietAdherence}</span>
          </div>
        </div>
      </div>
      {/* Add more features like scheduling, follow-ups, chat with dietitian, etc. */}
    </div>
  );
}
