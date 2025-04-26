'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = [
  { name: 'Weight', current: 72, target: 68 },
  { name: 'BMI', current: 24.2, target: 22.5 },
  { name: 'Water', current: 1.5, target: 2 },
  { name: 'Steps', current: 7500, target: 10000 },
];

export default function ProgressChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={progressData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={80} />
          <Tooltip />
          <Bar dataKey="current" fill="#3b82f6" name="Current" radius={[0, 4, 4, 0]} />
          <Bar dataKey="target" fill="#d1d5db" name="Target" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span className="text-sm text-gray-600">Target</span>
        </div>
      </div>
    </div>
  );
}