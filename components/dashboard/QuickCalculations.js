'use client';

import { useState } from 'react';
import { useCalculations } from '@/hooks/useCalculations';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { X } from 'lucide-react';

const calculationTypes = [
  { value: 'Search', label: 'Search' },
  { value: 'bmi', label: 'BMI Calculator' },
  { value: 'calories', label: 'Daily Calorie Needs' },
  { value: 'ideal-weight', label: 'Ideal Weight' },
  { value: 'body-fat', label: 'Body Fat Percentage' },
];

const activityLevels = [
  { value: 'Search', label: 'Search' },
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Lightly active (light exercise 1-3 days/week)' },
  { value: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)' },
  { value: 'active', label: 'Very active (hard exercise 6-7 days/week)' },
  { value: 'extra-active', label: 'Extra active (very hard exercise & physical job)' },
];

export default function QuickCalculations() {
  const [calculationType, setCalculationType] = useState('Search');
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: 'Search',
  });

  const { result, error, performCalculation } = useCalculations();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    performCalculation(calculationType, inputs);
    setShowModal(true);
  };

  const renderInputFields = () => {
    switch (calculationType) {
      case 'Search':
        return null;
      case 'bmi':
        return (
          <div className="space-y-2 grid grid-cols-2 gap-3">
            <Input
              label="Weight (kg)"
              name="weight"
              type="number"
              value={inputs.weight}
              onChange={handleInputChange}
              required
              className="text-sm"
            />
            <Input
              label="Height (cm)"
              name="height"
              type="number"
              value={inputs.height}
              onChange={handleInputChange}
              required
              className="text-sm"
            />
          </div>
        );
      case 'calories':
        return (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Weight (kg)"
              name="weight"
              type="number"
              value={inputs.weight}
              onChange={handleInputChange}
              required
              className="text-sm h-10"
            />
            <Input
              label="Height (cm)"
              name="height"
              type="number"
              value={inputs.height}
              onChange={handleInputChange}
              required
              className="text-sm h-10"
            />
            <Input
              label="Age"
              name="age"
              type="number"
              value={inputs.age}
              onChange={handleInputChange}
              required
              className="text-sm h-10"
            />
            <Select
              label="Gender"
              name="gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              value={inputs.gender}
              onChange={handleInputChange}
              required
              className="text-sm h-10"
            />
            <Select
              label="Activity Level"
              name="activityLevel"
              options={activityLevels}
              value={inputs.activityLevel}
              onChange={handleInputChange}
              required
              className="text-sm h-10"
            />
          </div>
        );
      case 'ideal-weight':
        return (
          <div className="space-y-2 grid grid-cols-2 gap-3">
            <Input
              label="Height (cm)"
              name="height"
              type="number"
              value={inputs.height}
              onChange={handleInputChange}
              required
              className="text-sm h-10"
            />
            <Select
              label="Gender"
              name="gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              value={inputs.gender}
              onChange={handleInputChange}
              required
              className="text-sm h-10"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (error) {
      return (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      );
    }

    if (!result) return null;

    switch (calculationType) {
      case 'Search':
        return null;
      case 'bmi':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">BMI Result</h3>
            <p className="text-2xl font-bold">{result?.bmi?.toFixed?.(1) || 'N/A'}</p>
            <p className="text-sm">{result?.category || ''}</p>
          </div>
        );
      case 'calories':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Daily Calorie Needs</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-2 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Maintenance</p>
                <p className="font-bold">{result?.maintenance?.toFixed?.(0) || 'N/A'} kcal</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-2 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Weight Loss</p>
                <p className="font-bold">{result?.weightLoss?.toFixed?.(0) || 'N/A'} kcal</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-2 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Weight Gain</p>
                <p className="font-bold">{result?.weightGain?.toFixed?.(0) || 'N/A'} kcal</p>
              </div>
            </div>
          </div>
        );
      case 'ideal-weight':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Ideal Weight Range</h3>
            <p className="text-2xl font-bold">
              {result?.minWeight?.toFixed?.(1) || 'N/A'} - {result?.maxWeight?.toFixed?.(1) || 'N/A'} kg
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 relative h-full">
      <h2 className="text-md font-bold">Quick Calculations</h2>

      <Select
        label="Calculation Type"
        options={calculationTypes}
        value={calculationType}
        onChange={(e) => {
          setCalculationType(e.target.value);
          setInputs({
            weight: '',
            height: '',
            age: '',
            gender: 'male',
            activityLevel: 'Search',
          });
        }}
        className="text-sm"
      />

      <form onSubmit={handleCalculate} className="space-y-3">
        {renderInputFields()}

        {calculationType !== 'Search' && (
          <Button type="submit" className="w-full py-1 text-sm">
            Calculate
          </Button>
        )}
      </form>

      {/* In-card Dialog */}
      {showModal && (
        <div className="absolute top-30 left-8  bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-md font-bold">Results</h3>
            <button 
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-[calc(50%-60px)] overflow-y-auto">
            {renderResult()}
          </div>
        </div>
      )}
    </div>
  );
}