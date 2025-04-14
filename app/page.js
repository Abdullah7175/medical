'use client';

import { useState } from 'react';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import ArticlesList from '@/components/dashboard/ArticlesList';
import ChatGPTSearch from '@/components/dashboard/ChatGPTSearch';
import DailyAppointments from '@/components/dashboard/DailyAppointments';
import QuickCalculations from '@/components/dashboard/QuickCalculations';
import AddPatientModal from '@/components/dashboard/AddPatientModal';
import Card from '@/components/common/Card';

export default function Dashboard() {
  const [showAddPatient, setShowAddPatient] = useState(false);

  return (
    <>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 overflow-hidden">
        <div className="h-full flex flex-col">
          <header className="flex flex-col gap-4 justify-center md:flex-row md:justify-between md:items-center mb-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <img src="/logo.png" alt="Logo" width={70} height={90} />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Medical Dashboard
              </h1>
            </div>
            <button
              onClick={() => setShowAddPatient(true)}
              className="btn-primary flex items-center gap-2 self-center md:self-auto"
            >
              Add New Patient
            </button>
          </header>

          {/* Grid layout constrained to fill remaining screen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-hidden">
            {/* First Row */}
            <Card className="fade-in overflow-auto max-h-full">
              <PerformanceChart />
            </Card>
            <Card className="fade-in overflow-auto max-h-full">
              <DailyAppointments />
            </Card>

            {/* Stacked cards inside one column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-hidden">
              <Card className="fade-in overflow-auto max-h-full">
                <ArticlesList />
              </Card>
              <Card className="fade-in overflow-auto max-h-full">
                <ChatGPTSearch />
              </Card>
            </div>

            <Card className="fade-in overflow-auto max-h-full">
              <QuickCalculations />
            </Card>
          </div>

          {showAddPatient && (
            <AddPatientModal onClose={() => setShowAddPatient(false)} />
          )}
        </div>
      </div>
    </>
  );
}
