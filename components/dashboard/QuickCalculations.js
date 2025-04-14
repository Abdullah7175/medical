'use client';

import { useState } from 'react';
import { useCalculations } from '@/hooks/useCalculations';
import Card from '@/components/common/Card';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const calculationTypes = [
  { value: 'Search', label: 'Search' },
  { value: 'bmi', label: 'BMI Calculator' },
  { value: 'calories', label: 'Daily Calorie Needs' },
  { value: 'ideal-weight', label: 'Ideal Weight' },
  { value: 'body-fat', label: 'Body Fat Percentage' },
];

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Lightly active (light exercise 1-3 days/week)' },
  { value: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)' },
  { value: 'active', label: 'Very active (hard exercise 6-7 days/week)' },
  { value: 'extra-active', label: 'Extra active (very hard exercise & physical job)' },
];

export default function QuickCalculations() {
  const [calculationType, setCalculationType] = useState('Search');
  const [inputs, setInputs] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'moderate',
  });

  const { result, error, performCalculation } = useCalculations();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    performCalculation(calculationType, inputs);
  };

  const renderInputFields = () => {
    switch (calculationType) {
      case 'Search':
        return null;
      case 'bmi':
        return (
          <>
            <Input
              label="Weight (kg)"
              name="weight"
              type="number"
              value={inputs.weight}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Height (cm)"
              name="height"
              type="number"
              value={inputs.height}
              onChange={handleInputChange}
              required
            />
          </>
        );
      case 'calories':
        return (
          <>
            <Input
              label="Weight (kg)"
              name="weight"
              type="number"
              value={inputs.weight}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Height (cm)"
              name="height"
              type="number"
              value={inputs.height}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Age"
              name="age"
              type="number"
              value={inputs.age}
              onChange={handleInputChange}
              required
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
            />
            <Select
              label="Activity Level"
              name="activityLevel"
              options={activityLevels}
              value={inputs.activityLevel}
              onChange={handleInputChange}
              required
            />
          </>
        );
      case 'ideal-weight':
        return (
          <>
            <Input
              label="Height (cm)"
              name="height"
              type="number"
              value={inputs.height}
              onChange={handleInputChange}
              required
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
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (error) {
      return (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
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
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">BMI Result</h3>
            <p className="text-2xl font-bold mt-2">{result.bmi.toFixed(1)}</p>
            <p className="mt-1">{result.category}</p>
          </div>
        );
      case 'calories':
        return (
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Daily Calorie Needs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Maintenance</p>
                <p className="text-xl font-bold">{result.maintenance.toFixed(0)} kcal</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Weight Loss</p>
                <p className="text-xl font-bold">{result.weightLoss.toFixed(0)} kcal</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Weight Gain</p>
                <p className="text-xl font-bold">{result.weightGain.toFixed(0)} kcal</p>
              </div>
            </div>
          </div>
        );
      case 'ideal-weight':
        return (
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Ideal Weight Range</h3>
            <p className="text-2xl font-bold mt-2">
              {result.minWeight.toFixed(1)} - {result.maxWeight.toFixed(1)} kg
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Quick Calculations</h2>

      <Select
        label="Search Calculation Type"
        options={calculationTypes}
        value={calculationType}
        onChange={(e) => {
          setCalculationType(e.target.value);
          setInputs({
            weight: '',
            height: '',
            age: '',
            gender: 'male',
            activityLevel: 'moderate',
          });
        }}
      />

      <form onSubmit={handleCalculate} className="space-y-4">
        {renderInputFields()}

        {calculationType !== 'Search' && (
          <Button type="submit" className="w-full">
            Calculate
          </Button>
        )}
      </form>

      {renderResult()}
    </div>
  );
}
