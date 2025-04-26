'use client';

import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format, subMonths, addMonths, getDaysInMonth } from 'date-fns';
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

  const generateLabels = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  };

  const generateData = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const baseValue = daysInMonth > 28 ? 10 : 8;
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const midMonthPeak = Math.min(20, baseValue + Math.abs(day - Math.floor(daysInMonth / 2)) / 2);
      return Math.floor(midMonthPeak * (0.8 + Math.random() * 0.4));
    });
  };

  const labels = generateLabels();

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'New Patients',
        data: generateData(),
        borderColor: 'rgb(74, 222, 128)',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
      },
      {
        label: 'Follow-up Patients',
        data: generateData(),
        borderColor: 'rgb(96, 165, 250)',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
      },
      {
        label: 'Total Appointments',
        data: generateData().map((val, i, arr) =>
          Math.floor(val + (arr[Math.max(0, i - 3)] ?? 0) * 0.5)
        ),
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
      duration: 0
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: `Appointments - ${format(currentDate, 'MMMM yyyy')}`,
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (context) => {
            const day = context[0].label;
            return `${format(currentDate, 'MMMM')} ${day}`;
          }
        },
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        },
        ticks: {
          font: {
            weight: 'bold'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          autoSkip: false, // <<<<<<<<<< NO SKIPPING AT ALL
          font: {
            weight: 'bold'
          }
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
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentDate(prev => addMonths(prev, 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="flex-1 min-h-[300px]">
        <Line 
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
