'use client';

import { useState, useEffect } from 'react';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import ArticlesList from '@/components/dashboard/ArticlesList';
import ChatGPTSearch from '@/components/dashboard/ChatGPTSearch';
import ChatBot from '@/components/dashboard/ChatBot';
import DailyAppointments from '@/components/dashboard/DailyAppointments';
import QuickCalculations from '@/components/dashboard/QuickCalculations';
import AddPatientModal from '@/components/dashboard/AddPatientModal';
import NutritionRiskScreening from '@/components/dashboard/NutritionRiskScreening';
import Card from '@/components/common/Card';
import { gsap } from "gsap";
import Loader from "@/components/loader";

export default function Dashboard() {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const loaderTimeline = gsap.timeline({
      onComplete: () => setLoading(false),
    });

    loaderTimeline
      .fromTo(
        ".loader",
        { scaleY: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, duration: 0.5, ease: "power2.inOut" }
      )
      .to(".loader", {
        scaleY: 0,
        transformOrigin: "0% -100%",
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(
        ".wrapper",
        { y: "-100%", ease: "power4.inOut", duration: 1 },
        "-=0.8"
      );

  }, []);

  return (
    <>
    {loading && <Loader />} {/* Use the Loader component */}
    <section
      className={`relative h-screen transition-opacity duration-700 ${
        loading ? "opacity-100" : "opacity-100"
      } bg-[url('https://img.freepik.com/free-psd/interior-luxury-hospital-hall-generative-ai_587448-2177.jpg?t=st=1744714752~exp=1744718352~hmac=05c5b8110e190ee6f79eb3d523fa5c871c7ef8fb093f14bc55cae9280acb0707&w=1380')] bg-cover flex justify-center items-center`}
    >
     

    <div className="h-screen p-4 md:p-6 overflow-hidden  w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-[2px]  border border-gray-100">
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
            className="btn-primary flex items-center gap-2 self-center md:self-auto px-4 py-2 text-white rounded-lg transition-colors"
          >
            Add New Patient
          </button>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-hidden">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
            <Card className="flex-1 min-h-0">
              <PerformanceChart />
            </Card>
          </div>
          
          {/* Right Column - Appointments */}
          <div className="flex flex-col gap-4 min-h-0">
            <Card className="flex-1 min-h-0 overflow-auto">
              <DailyAppointments />
            </Card>
          </div>

          {/* Bottom Row - Smaller Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="min-h-0 ">
              <NutritionRiskScreening />
            </Card>
            
            <Card className="min-h-0">
              <ChatGPTSearch />
            </Card>
            
            <Card className="flex-1 min-h-0">
              <QuickCalculations />
            </Card>
          </div>
        </div>

        {showAddPatient && (
          <AddPatientModal onClose={() => setShowAddPatient(false)} />
        )}
      </div>
    </div>
    <ChatBot />
    </section>
    </>
  );
}
