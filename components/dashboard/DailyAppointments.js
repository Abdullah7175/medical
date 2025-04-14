'use client';

import { useState } from 'react';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/common/Button';

const timeSlots = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  formattedTime: `${String(i).padStart(2, '0')}:00 - ${String(i + 1).padStart(2, '0')}:00`,
}));

const appointmentTypes = {
  new: {
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    label: 'New',
  },
  followup: {
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    label: 'Follow-up',
  },
  emergency: {
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    label: 'Emergency',
  },
};

export default function DailyAppointments() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expandedHour, setExpandedHour] = useState(null);

  // Mock appointments data
  const appointments = timeSlots.map(slot => {
    const hasAppointment = Math.random() > 0.6;
    return {
      ...slot,
      appointments: hasAppointment ? [
        {
          id: `${slot.hour}-1`,
          patientName: `Patient ${slot.hour}`,
          type: ['new', 'followup', 'emergency'][Math.floor(Math.random() * 3)],
          notes: 'Routine checkup',
          duration: 30,
        },
        ...(Math.random() > 0.7 ? [{
          id: `${slot.hour}-2`,
          patientName: `Patient ${slot.hour + 0.5}`,
          type: ['new', 'followup', 'emergency'][Math.floor(Math.random() * 3)],
          notes: 'Follow-up visit',
          duration: 45,
        }] : [])
      ] : [],
    };
  });

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daily Appointments</h2>
        <Button
          size="sm"
          variant={isToday(currentDate) ? 'primary' : 'secondary'}
          onClick={navigateToToday}
          disabled={isToday(currentDate)}
        >
          Today
        </Button>
      </div>
      
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentDate(prev => subDays(prev, 1))}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center">
          <p className="text-lg font-semibold">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isToday(currentDate) ? 'Today' : isSameDay(currentDate, addDays(new Date(), 1)) ? 'Tomorrow' : ''}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentDate(prev => addDays(prev, 1))}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {appointments.map(({ hour, formattedTime, appointments }) => (
          <div
            key={hour}
            className={`border-b last:border-b-0 transition-colors ${
              appointments.length > 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
            }`}
          >
            <div
              className="flex items-center p-3 cursor-pointer"
              onClick={() => setExpandedHour(expandedHour === hour ? null : hour)}
            >
              <div className="w-24 font-medium text-gray-500 dark:text-gray-400">
                {formattedTime}
              </div>
              <div className="flex-1 flex gap-2">
                {appointments.length > 0 ? (
                  appointments.map(appointment => (
                    <span
                      key={appointment.id}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointmentTypes[appointment.type].color
                      }`}
                    >
                      {appointment.patientName}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">No appointments</span>
                )}
              </div>
              {appointments.length > 0 && (
                <svg
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    expandedHour === hour ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            
            {expandedHour === hour && appointments.length > 0 && (
              <div className="px-3 pb-3 pt-1 bg-white dark:bg-gray-800 border-t">
                {appointments.map(appointment => (
                  <div key={appointment.id} className="mb-3 last:mb-0 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{appointment.patientName}</h4>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                          appointmentTypes[appointment.type].color
                        }`}>
                          {appointmentTypes[appointment.type].label}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {appointment.duration} min
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {appointment.notes}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        View Patient
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
