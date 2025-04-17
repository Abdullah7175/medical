'use client';

import { useState , useMemo, useRef, useEffect } from 'react';
import { useCalculations } from '@/hooks/useCalculations';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import { X, Search, Calculator } from 'lucide-react';

const calculationTypes = [
  { value: 'Search', label: 'Search' },
  { value: 'bmi', label: 'BMI Calculator' },
  { value: 'calories', label: 'Daily Calorie Needs' },
  { value: 'ideal-weight', label: 'Ideal Weight' },
  { value: 'body-fat', label: 'Body Fat Percentage' },
  { value: 'bmr', label: 'Basal Metabolic Rate (BMR)' },
  { value: 'tdee', label: 'Total Daily Energy Expenditure (TDEE)' },
  { value: 'waist-to-hip', label: 'Waist-to-Hip Ratio' },
  { value: 'lean-body-mass', label: 'Lean Body Mass' },
  { value: 'macros', label: 'Macronutrient Split' },
  { value: 'water-intake', label: 'Daily Water Intake' },
  { value: 'pregnancy-due-date', label: 'Pregnancy Due Date' },
  { value: 'child-growth-percentile', label: 'Child Growth Percentile' },
  { value: 'target-heart-rate', label: 'Target Heart Rate Zone' },
  { value: 'vo2max', label: 'VO2 Max Estimation' },
  { value: 'calorie-burn', label: 'Calories Burned by Activity' }
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchResultsRef = useRef(null);
  const [inputs, setInputs] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: 'Search',
  });

  const useClickOutside = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  };
  

  useClickOutside(searchResultsRef, () => {
    setShowSearchResults(false);
  });

  const { result, error, performCalculation } = useCalculations();

  // Filter calculation types based on search query
// Filter calculation types based on search query
const filteredCalculations = useMemo(() => {
  if (!searchQuery) return calculationTypes;
  return calculationTypes.filter(calc => 
    calc.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [searchQuery]);
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    performCalculation(calculationType, inputs);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset to default state
    setCalculationType('Search');
    setInputs({
      weight: '',
      height: '',
      age: '',
      gender: '',
      activityLevel: 'Search',
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleSelectCalculation = (value) => {
    setCalculationType(value);
    setInputs({
      weight: '',
      height: '',
      age: '',
      gender: 'male',
      activityLevel: 'Search',
    });
    setShowSearchResults(false);
    setSearchQuery('');
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
            <p className="text-xl font-bold">{result?.bmi?.toFixed?.(1) || 'N/A'}</p>
            <p className="text-xs">{result?.category || ''}</p>
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
            <p className="text-xl font-bold">
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
      <div className='flex gap-2 items-center'>
      <Calculator className="text-blue-600" size={20} />
      <h2 className="text-md font-bold">Quick Calculations</h2>
      </div>
      {/* <Select
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
      /> */}


            {/* Replace Select with Search Input */}
            <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search calculation type..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSearchResults(true)}
            className="pl-10 text-sm"
          />
        </div>
        
        {showSearchResults && (
          <div  ref={searchResultsRef}  className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredCalculations.length > 0 ? (
              filteredCalculations.map((calc) => (
                <div
                  key={calc.value}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                  onClick={() => handleSelectCalculation(calc.value)}
                >
                  {calc.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No calculations found
              </div>
            )}
          </div>
        )}
      </div>
            {/* Replace Select with Search Input */}



      <form onSubmit={handleCalculate} className="space-y-3 transition-colors">
        {renderInputFields()}

        {calculationType !== 'Search' && (
          <button type="submit" className="btn-secondary w-full py-1 text-sm transition-colors">
            Calculate
          </button>
        )}
      </form>

      {/* In-card Dialog */}
      {showModal && (
        <div className="absolute inset-10  bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-0">
            <p className="text-xs font-bold">Results</p>
            <button 
              // onClick={() => setShowModal(false)}
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-[calc(100%-60px)]">
            {renderResult()}
          </div>
        </div>
      )}
    </div>
  );
}
