'use client';

import { useState } from 'react';
import { Search, AlertTriangle, Pill, Utensils } from 'lucide-react';

export default function FoodDrugInteraction() {
  const [drugInput, setDrugInput] = useState('');
  const [foodInput, setFoodInput] = useState('');
  const [interactions, setInteractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample interaction data (replace with actual API calls)
  const sampleInteractions = [
    {
      drug: 'Warfarin',
      food: 'Leafy greens',
      severity: 'Moderate',
      description: 'Vitamin K-rich foods may decrease Warfarin effectiveness',
      recommendation: 'Maintain consistent vitamin K intake'
    },
    {
      drug: 'Statins',
      food: 'Grapefruit',
      severity: 'Severe',
      description: 'Grapefruit increases statin concentration in blood',
      recommendation: 'Avoid grapefruit and its juice'
    }
  ];

  const checkInteractions = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setInteractions(sampleInteractions);
      setIsLoading(false);
    }, 1000);
  };

  return (
<>
      <div className="flex items-center gap-2 mb-4">
        <Pill className="text-blue-600" size={20} />
        <h2 className="text-sm font-bold text-gray-800 dark:text-white">Food & Drug Interactions</h2>
      </div>

      <form onSubmit={checkInteractions} className="space-y-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Pill className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={drugInput}
            onChange={(e) => setDrugInput(e.target.value)}
            placeholder="Enter medication name"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Utensils className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            placeholder="Enter food or beverage"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Search className="h-5 w-5" />
          )}
          Check Interactions
        </button>
      </form>

      {interactions.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Potential Interactions:</h3>
          {interactions.map((interaction, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  interaction.severity === 'Severe' 
                    ? 'bg-red-100 text-red-600' 
                    : interaction.severity === 'Moderate' 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-blue-100 text-blue-600'
                }`}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-medium">{interaction.drug}</h4>
                    <span className="text-gray-500">+</span>
                    <h4 className="font-medium">{interaction.food}</h4>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      interaction.severity === 'Severe' 
                        ? 'bg-red-100 text-red-800' 
                        : interaction.severity === 'Moderate' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {interaction.severity} risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{interaction.description}</p>
                  <div className="mt-2 p-2 bg-gray-50 rounded">
                    <p className="text-xs font-medium text-gray-700">Recommendation:</p>
                    <p className="text-sm text-gray-800">{interaction.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
        </>
      )}
      </>
  );
}