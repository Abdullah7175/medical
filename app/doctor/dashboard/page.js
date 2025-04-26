'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, Stethoscope, PieChart, MessageSquare } from 'lucide-react';
import ChatBot from '@/components/dashboard/ChatBot';
import DailyAppointments from '@/components/dashboard/DailyAppointments';
import QuickCalculations from '@/components/dashboard/QuickCalculations';
import FoodDrugInteraction from '@/components/dashboard/FoodDrugInteraction';
import NutritionRiskScreening from '@/components/dashboard/NutritionRiskScreening';
import PerformanceChart from '@/components/dashboard/PerformanceChart';

export default function DoctorDashboard() {
  const [patients] = useState([
    { name: "Nehal Ahmed", time: "10:00 am" },
    { name: "Khalid Omar", time: "11:30 am" },
    { name: "Khalid Omar", time: "2:00 pm" },
  ]);

  const swiperSlides = [
    {
      title: "Today",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> TO DO LIST
            </h3>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                <span>Reading an article</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                <span>Search about surenutri supplement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                <span>Meeting 2:00 pm</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" /> Appointment/Follow up
            </h3>
            <ul className="space-y-3">
              {patients.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-blue-500" /> 
                  <span className="font-medium">{p.time}</span>, {p.name}
                </li>
              ))}
              <li className="flex items-center gap-3 text-gray-600">
                <ClipboardList className="w-4 h-4 text-blue-500" /> 
                <span className="font-medium">Follow-up:</span> 4 Patients
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Your Patient Reach",
      icon: <PieChart className="w-5 h-5" />,
      content: <PerformanceChart />
    },
    {
      title: "Case Overview",
      icon: <PieChart className="w-5 h-5" />,
      content: (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200">
          <p className="text-gray-400">Case distribution pie chart will appear here</p>
        </div>
      )
    },
    {
      title: "Appointments Calendar",
      icon: <Calendar className="w-5 h-5" />,
      content: <DailyAppointments />
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
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-md">
              👨🏻‍⚕️
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Good Morning!</h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-600">Dr. Omar</h2>
              <p className="text-sm text-gray-500 mt-1">Nutrition Specialist</p>
            </div>
          </div>
          <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
            Dietitian Dashboard
          </Button>
        </div>

        {/* Swiper Section */}
        <Swiper
          spaceBetween={24}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet bg-gray-300 opacity-100',
            bulletActiveClass: 'swiper-pagination-bullet-active bg-blue-500'
          }}
          modules={[Pagination, Autoplay]} // Now Autoplay is properly imported
          className="mb-8 rounded-xl shadow-sm"
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true // Optional: pause autoplay on hover
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
              <CardTitle className="text-lg font-semibold text-gray-800">
                Quick Calculations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <QuickCalculations />
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Nutrition Risk Screening
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NutritionRiskScreening />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Food-Drug Interaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FoodDrugInteraction />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Formula and Oral Nutrition Supplement
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 focus-visible:ring-white/50"
              >
                Show all Formula and Oral nutrition supplement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}