'use client';

import { useState } from 'react';
import { CloseButton, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useCalculations } from '@/hooks/useCalculations';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { ChartBarStacked, Circle, CircleX, ExpandIcon } from 'lucide-react';

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
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm">
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
          <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">BMI Result</h3>
            <p className="text-xl font-bold mt-1">{result?.bmi?.toFixed?.(1) || 'N/A'}</p>
            <p className="mt-1 text-sm">{result?.category || ''}</p>
          </div>
        );
      case 'calories':
        return (
          <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Daily Calorie Needs</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Maintenance</p>
                <p className="text-lg font-bold">{result?.maintenance?.toFixed?.(0) || 'N/A'} kcal</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Weight Loss</p>
                <p className="text-lg font-bold">{result?.weightLoss?.toFixed?.(0) || 'N/A'} kcal</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Weight Gain</p>
                <p className="text-lg font-bold">{result?.weightGain?.toFixed?.(0) || 'N/A'} kcal</p>
              </div>
            </div>
          </div>
        );
      case 'ideal-weight':
        return (
          <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Ideal Weight Range</h3>
            <p className="text-xl font-bold mt-1">
              {result?.minWeight?.toFixed?.(1) || 'N/A'} - {result?.maxWeight?.toFixed?.(1) || 'N/A'} kg
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2 p-2">
      <h2 className="text-lg font-semibold mb-2">Quick Calculations</h2>

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

      {/* Result Modal */}
      <Dialog open={showModal} onClose={setShowModal} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed z-10 w-2/12 bottom-0 right-96 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <CircleX aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {renderResult()}
                  </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
