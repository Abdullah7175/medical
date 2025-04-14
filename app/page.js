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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-[2000px] mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Medical Dashboard
          </h1>
          <button
            onClick={() => setShowAddPatient(true)}
            className="btn-primary flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Patient
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Dashboard */}
          <Card className="lg:col-span-2 fade-in">
            <PerformanceChart />
          </Card>

          {/* Daily Appointments */}
          <Card className="fade-in">
            <DailyAppointments />
          </Card>

          {/* Quick Calculations */}
          <Card className="fade-in">
            <QuickCalculations />
          </Card>

          {/* Articles */}
          <Card className="fade-in">
            <ArticlesList />
          </Card>

          {/* ChatGPT Search */}
          <Card className="lg:col-span-2 fade-in">
            <ChatGPTSearch />
          </Card>
        </div>

        {showAddPatient && (
          <AddPatientModal onClose={() => setShowAddPatient(false)} />
        )}
      </div>
    </div>
  );
}