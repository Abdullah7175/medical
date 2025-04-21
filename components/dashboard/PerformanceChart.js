'use client';

import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format, subMonths, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function PerformanceChart() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [chartKey, setChartKey] = useState(0);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  // Generate labels for odd days only (1, 3, 5, ..., 31)
  const labels = Array.from({ length: 16 }, (_, i) => i * 2 + 1);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'New Patients',
        data: labels.map(() => Math.floor(Math.random() * 10)),
        borderColor: 'rgb(74, 222, 128)',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
      },
      {
        label: 'Follow-up Patients',
        data: labels.map(() => Math.floor(Math.random() * 15)),
        borderColor: 'rgb(96, 165, 250)',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
      },
      {
        label: 'Total Appointments',
        data: labels.map(() => Math.floor(Math.random() * 25)),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0 // Disable animations for better resize performance
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Monthly Performance',
        font: {
          size: 16
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          autoSkip: false
        }
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6
      },
      line: {
        borderWidth: 2
      }
    }
  };

  // Handle resize and date changes
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.update();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    // Force chart update when date changes
    setChartKey(prev => prev + 1);

    return () => {
      resizeObserver.disconnect();
    };
  }, [currentDate]);

  return (
    <div className="h-full flex flex-col" ref={chartContainerRef}>
      <div className="flex justify-between items-center mb-4 px-2">
        <button
          onClick={() => setCurrentDate(prev => subMonths(prev, 1))}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentDate(prev => addMonths(prev, 1))}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <div className="box-border md:block h-[308px] md:w-full w-[332px] lg:flex-1">
        <Line 
          className=''
          key={chartKey}
          ref={chartRef}
          data={data} 
          options={options}
          updateMode="resize"
        />
      </div>
    </div>
  );
}

