'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, Stethoscope, Calculator, FileText } from 'lucide-react';
import ChatBot from '@/components/dashboard/ChatBot';
import DailyAppointments from '@/components/dashboard/DailyAppointments';
import QuickCalculations from '@/components/dashboard/QuickCalculations';
import AddPatientModal from '@/components/dashboard/AddPatientModal';
import FoodDrugInteraction from '@/components/dashboard/FoodDrugInteraction';
import NutritionRiskScreening from '@/components/dashboard/NutritionRiskScreening';

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([
    { name: "Nehal Ahmed", time: "10:00 am" },
    { name: "Khalid Omar", time: "11:30 am" },
    { name: "Khalid Omar", time: "2:00 pm" },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col grid-cols-2 items-center mb-8">
        <div className="w-50 h-50 rounded-full bg-blue-400 flex items-center justify-center text-white text-4xl font-bold">👨🏻‍⚕️</div>
        <div>

        <h1 className="text-2xl font-bold mt-4">Hello!<br/>Dt. Omar</h1>
        </div>
        <Button variant="link" className="text-blue-600 mt-2">Clint Dashboard</Button>
      </div>

      {/* Today Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Today</h2>
          <p className="text-gray-600 mb-6">Let's stay on track — you've got this! 💪</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">TO DO LIST</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Reading an article</li>
                <li>Search about surenutri supplement</li>
                <li>Meeting 2:00 pm</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Appointment/Follow up</h3>
              <ul className="space-y-2">
                {patients.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {p.time}, {p.name}
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" /> Follow-up: 4 Patients
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation and Screening Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          {/* <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Quick Calculation</h3>
              <Calculator className="w-5 h-5" />
            </div>
            <Button variant="link" className="mt-4">References</Button>
          </CardContent> */}
          <Card className="flex-1">
                        <QuickCalculations />
                      </Card>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Nutrition Risk Screening</h3>
              <FileText className="w-5 h-5" />
            </div>
            <Button variant="link" className="mt-4">References</Button>
          </CardContent>
        </Card>
      </div>

      {/* Blog and Food Interaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-green-300">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Nutricare Blog</h3>
            <p>Explore articles about nutrition.</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Food and Drug Interaction</h3>
            <Button variant="link" className="mt-2">Show all Food and Drug Interactions</Button>
          </CardContent>
        </Card>
      </div>

      {/* Formula and Oral Nutrition Supplement */}
      <Card className="bg-blue-400">
        <CardContent className="p-6 text-center text-white">
          <h3 className="text-lg font-bold mb-2">Formula and Oral nutrition supplement</h3>
          <Button variant="link" className="text-white">Show all Formula and Oral nutrition supplement</Button>
        </CardContent>
      </Card>
    </div>
  );
}
