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
    <div className="h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 overflow-hidden">
      <div className="h-full flex flex-col gap-4 max-w-7xl mx-auto">
        <header className="flex flex-col gap-4 justify-center md:flex-row md:justify-between md:items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Medical Dashboard
            </h1>
          </div>
          <button
            onClick={() => setShowAddPatient(true)}
            className="btn-primary flex items-center gap-2 self-center md:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Add New Patient
          </button>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
            <Card className="flex-1 min-h-0">
              <PerformanceChart />
            </Card>
          </div>
          
          {/* Right Column - Appointments */}
          <div className="flex flex-col gap-4 min-h-0">
            <Card className="flex-1 min-h-0">
              <DailyAppointments />
            </Card>
          </div>

          {/* Bottom Row - Smaller Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
            <Card className="min-h-0">
              <ArticlesList />
            </Card>
            
            <Card className="min-h-0">
              <ChatGPTSearch />
            </Card>
            
            <Card className="">
              <QuickCalculations />
            </Card>
          </div>
        </div>

        {showAddPatient && (
          <AddPatientModal onClose={() => setShowAddPatient(false)} />
        )}
      </div>
    </div>
  );
}
