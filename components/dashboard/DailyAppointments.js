'use client';

import { useState, useMemo } from 'react';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, List, Grid2X2 } from 'lucide-react';
import Button from '@/components/common/Button';
import * as Tooltip from '@radix-ui/react-tooltip';

const timeSlots = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
}));

const appointmentTypes = {
  new: {
    color: 'bg-green-500',
    label: 'New',
  },
  followup: {
    color: 'bg-blue-500',
    label: 'Follow-up',
  },
  emergency: {
    color: 'bg-red-500',
    label: 'Emergency',
  },
};

export default function DailyAppointments() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expandedHour, setExpandedHour] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const appointments = useMemo(() => {
    return timeSlots.map(slot => {
      const hasAppointment = Math.random() > 0.6;
      return {
        ...slot,
        appointments: hasAppointment
          ? [
              {
                id: `${slot.hour}-1`,
                patientName: `Patient ${slot.hour}`,
                type: ['new', 'followup', 'emergency'][Math.floor(Math.random() * 3)],
                notes: 'Routine checkup',
                duration: 30,
              },
              ...(Math.random() > 0.7
                ? [
                    {
                      id: `${slot.hour}-2`,
                      patientName: `Patient ${slot.hour + 0.5}`,
                      type: ['new', 'followup', 'emergency'][Math.floor(Math.random() * 3)],
                      notes: 'Follow-up visit',
                      duration: 45,
                    },
                  ]
                : []),
            ]
          : [],
      };
    });
  }, [currentDate]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-md font-bold text-gray-800 dark:text-white">Daily Appointments</h2>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            onClick={() => setViewMode('list')}
            tooltip="List view"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            onClick={() => setViewMode('grid')}
            tooltip="Grid view"
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={isToday(currentDate) ? 'primary' : 'secondary'}
            onClick={() => setCurrentDate(new Date())}
            disabled={isToday(currentDate)}
          >
            Today
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCurrentDate(prev => subDays(prev, 1))}
          tooltip="Previous day"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isToday(currentDate) ? 'Today' : isSameDay(currentDate, addDays(new Date(), 1)) ? 'Tomorrow' : ''}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCurrentDate(prev => addDays(prev, 1))}
          tooltip="Next day"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {viewMode === 'grid' ? (
          <>
            <Tooltip.Provider delayDuration={100}>
              <div className="grid grid-cols-5 gap-1 overflow-y-auto  pb-2 pr-1">
                {appointments.map(({ hour, appointments }) => (
                  <div
                    key={hour}
                    className=" dark:border-gray-700 rounded-md p-1 h-9 text-center bg-slate-50 shadow-md  hover:bg-gray-100 dark:bg-gray-800 text-xs hover:shadow-md transition-shadow"
                  >
                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {hour}:00
                    </div>
                    <div className="flex justify-center flex-wrap gap-1">
                      {appointments.length > 0 ? (
                        appointments.map(appt => (
                          <Tooltip.Root key={appt.id}>
                            <Tooltip.Trigger asChild>
                              <div
                                className={`h-2 w-2 rounded-full cursor-pointer ${appointmentTypes[appt.type].color}`}
                              />
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                className="bg-gray-800 text-white px-3 py-2 rounded text-xs shadow-lg"
                                side="top"
                                sideOffset={5}
                              >
                                <div className="font-medium">{appt.patientName}</div>
                                <div className={`text-xs ${appointmentTypes[appt.type].color.replace('bg', 'text')}`}>
                                  {appointmentTypes[appt.type].label}
                                </div>
                                <div className="text-gray-300 text-xs">{appt.notes}</div>
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        ))
                      ) : (
                        <div className="text-gray-300 dark:text-gray-600">–</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Tooltip.Provider>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
              {Object.entries(appointmentTypes).map(([key, { color, label }]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`}></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="border dark:border-gray-700 rounded-lg h-full overflow-y-auto bg-white dark:bg-gray-800 shadow-sm">
            {appointments.map(({ hour, appointments }) => (
              <div
                key={hour}
                className={`border-b dark:border-gray-700 transition-colors ${
                  appointments.length > 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                }`}
              >
                <div
                  className="flex items-center p-3 cursor-pointer"
                  onClick={() => setExpandedHour(expandedHour === hour ? null : hour)}
                >
                  <div className="w-16 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {hour}:00
                  </div>
                  <div className="flex-1 flex gap-2 overflow-x-auto py-1">
                    {appointments.length > 0 ? (
                      appointments.map(appointment => (
                        <span
                          key={appointment.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            appointmentTypes[appointment.type].color
                          } text-white`}
                        >
                          {appointment.patientName}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500">No appointments</span>
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
                  <div className="px-3 pb-3 pt-1 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                    {appointments.map(appointment => (
                      <div key={appointment.id} className="mb-3 last:mb-0 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">{appointment.patientName}</h4>
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                                appointmentTypes[appointment.type].color
                              } text-white`}
                            >
                              {appointmentTypes[appointment.type].label}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {appointment.duration} min
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{appointment.notes}</p>
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
        )}
      </div>
    </div>
  );
}