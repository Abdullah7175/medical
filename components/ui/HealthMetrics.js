'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', weight: 75, bmi: 26.5 },
  { name: 'Feb', weight: 74, bmi: 26.1 },
  { name: 'Mar', weight: 73, bmi: 25.8 },
  { name: 'Apr', weight: 72, bmi: 25.2 },
  { name: 'May', weight: 72, bmi: 24.9 },
  { name: 'Jun', weight: 72, bmi: 24.2 },
];

export default function HealthMetrics() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Weight (kg)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bmi"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="BMI"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Weight (kg)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">BMI</span>
        </div>
      </div>
    </div>
  );
}