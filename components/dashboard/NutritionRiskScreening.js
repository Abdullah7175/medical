'use client';

import { useState } from 'react';
import { ClipboardList, HeartPulse, Scale, Activity } from 'lucide-react';

export default function NutritionRiskScreening() {
  const [view, setView] = useState('grid');
  
  // Nutrition screening tools and resources
  const screeningTools = [
    {
      title: 'MUST Screening Tool',
      description: 'Malnutrition Universal Screening Tool for adults',
      icon: <ClipboardList className="h-3 w-3 text-blue-600" />,
      url: '/nutrition/must-screening'
    },
    {
      title: 'NRS-2002',
      description: 'Nutritional Risk Screening 2002 for hospitalized patients',
      icon: <HeartPulse className="h-3 w-3 text-green-600" />,
      url: '/nutrition/nrs-2002'
    },
    {
      title: 'MNA-SF',
      description: 'Mini Nutritional Assessment for elderly patients',
      icon: <Scale className="h-3 w-3 text-orange-600" />,
      url: '/nutrition/mna-sf'
    },
    {
      title: 'Pediatric Screening',
      description: 'Nutrition risk screening for children',
      icon: <Activity className="h-3 w-3 text-purple-600" />,
      url: '/nutrition/pediatric-screening'
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-gray-800">Nutrition Risk Screening</h2>
        <div className="flex space-x-2">
          {/* <button
            className={`p-2 rounded-lg ${view === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setView('list')}
            aria-label="List view"
          >
            <ClipboardList className="h-4 w-4" />
          </button> */}
          <button
            className={`p-2 rounded-lg ${view === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setView('grid')}
            aria-label="Grid view"
          >
            <Activity className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
        {screeningTools.map((tool, index) => (
          <a
            key={index}
            href={tool.url}
            className={`block p-4 rounded-xl border transition-all hover:shadow-md ${
              view === 'grid' ? 'text-center' : 'flex items-start gap-4'
            }`}
          >
            <div className={`${view === 'grid' ? 'mx-auto mb-3' : ''}`}>
              {tool.icon}
            </div>
            <div>
              <h3 className="font-sm text-gray-800">{tool.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
              {view === 'list' && (
                <span className="inline-block mt-2 text-sm text-blue-600 hover:underline">
                  Start screening →
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
      </>
  );
}
