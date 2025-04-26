'use client';

import { Calendar, Clock, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function UpcomingAppointments({ appointments }) {
  return (
    <div className="space-y-4">
      {appointments.map((appt, index) => (
        <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="bg-blue-100 p-2 rounded-full">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <h3 className="font-medium">{appt.doctor}</h3>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{appt.date}, {appt.time}</span>
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                {appt.type}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-50">
            Details
          </Button>
        </div>
      ))}
      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
        Book New Appointment
      </Button>
    </div>
  );
}