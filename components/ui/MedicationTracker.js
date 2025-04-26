'use client';

import { Pill, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const medications = [
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily", status: "taken" },
  { name: "Vitamin D", dosage: "1000IU", frequency: "Once daily", status: "pending" },
  { name: "Omega-3", dosage: "1000mg", frequency: "With lunch", status: "pending" },
  { name: "Probiotic", dosage: "1 capsule", frequency: "Before bed", status: "missed" },
];

export default function MedicationTracker() {
  return (
    <div className="space-y-3">
      {medications.map((med, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className={`p-2 rounded-full ${
            med.status === "taken" ? "bg-green-100 text-green-600" :
            med.status === "pending" ? "bg-yellow-100 text-yellow-600" :
            "bg-red-100 text-red-600"
          }`}>
            {med.status === "taken" ? <CheckCircle className="w-5 h-5" /> :
             med.status === "pending" ? <Pill className="w-5 h-5" /> :
             <AlertCircle className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{med.name}</h3>
            <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
          </div>
          <button className={`px-3 py-1 text-sm rounded-full ${
            med.status === "taken" ? "bg-green-100 text-green-600" :
            med.status === "pending" ? "bg-blue-100 text-blue-600" :
            "bg-gray-100 text-gray-600"
          }`}>
            {med.status === "taken" ? "Taken" :
             med.status === "pending" ? "Mark Taken" :
             "Missed"}
          </button>
        </div>
      ))}
      <Button variant="outline" className="w-full mt-4 border-blue-500 text-blue-600 hover:bg-blue-50">
        View All Medications
      </Button>
    </div>
  );
}