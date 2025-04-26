'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, HeartPulse, Pill, Utensils, MessageSquare, Activity } from 'lucide-react';
import ChatBot from '@/components/dashboard/ChatBot';
import UpcomingAppointments from '@/components/ui/UpcomingAppointments';
import HealthMetrics from '@/components/ui/HealthMetrics';
import MedicationTracker from '@/components/ui/MedicationTracker';
import NutritionPlan from '@/components/ui/NutritionPlan';
import ProgressChart from '@/components/ui/ProgressChart';

export default function PatientDashboard() {
  const [upcomingAppointments] = useState([
    { doctor: "Dr. Omar", date: "Today", time: "2:00 pm", type: "Follow-up" },
    { doctor: "Dr. Smith", date: "Tomorrow", time: "11:30 am", type: "Consultation" },
  ]);

  const [healthMetrics] = useState({
    weight: "72 kg",
    bmi: "24.2",
    bloodPressure: "120/80",
    lastCheckup: "2 weeks ago"
  });

  const swiperSlides = [
    {
      title: "Health Overview",
      icon: <HeartPulse className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Weight</p>
            <p className="text-xl font-bold">{healthMetrics.weight}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">BMI</p>
            <p className="text-xl font-bold">{healthMetrics.bmi}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Blood Pressure</p>
            <p className="text-xl font-bold">{healthMetrics.bloodPressure}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Last Checkup</p>
            <p className="text-xl font-bold">{healthMetrics.lastCheckup}</p>
          </div>
        </div>
      )
    },
    {
      title: "Progress Tracking",
      icon: <Activity className="w-5 h-5" />,
      content: <ProgressChart />
    },
    {
      title: "Upcoming Appointments",
      icon: <Calendar className="w-5 h-5" />,
      content: <UpcomingAppointments appointments={upcomingAppointments} />
    },
    {
      title: "Need Help?",
      icon: <MessageSquare className="w-5 h-5" />,
      content: <ChatBot />
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-md">
              👤
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome Back!</h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-600">Nehal Ahmed</h2>
              <p className="text-sm text-gray-500 mt-1">Patient since 2022</p>
            </div>
          </div>
          <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
            Patient View
          </Button>
        </div>

        {/* Swiper Section */}
        <Swiper
          spaceBetween={24}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet bg-gray-300 opacity-100',
            bulletActiveClass: 'swiper-pagination-bullet-active bg-green-500'
          }}
          modules={[Pagination, Autoplay]}
          className="mb-8 rounded-xl shadow-sm"
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
        >
          {swiperSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                    {slide.icon}
                    {slide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {slide.content}
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Quick Access Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Pill className="w-5 h-5" /> Medication Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MedicationTracker />
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Utensils className="w-5 h-5" /> Nutrition Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NutritionPlan />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Health Metrics History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HealthMetrics />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Book Appointment
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Request Refill
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Message Doctor
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}