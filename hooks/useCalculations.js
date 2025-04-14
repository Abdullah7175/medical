// hooks/useCalculations.js
import { useState } from 'react';
import { calculateBMI, calculateCalories, calculateIdealWeight } from '@/components/utils/calculations';

export function useCalculations() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const performCalculation = (type, inputs) => {
    try {
      let calculatedResult;
      
      switch (type) {
        case 'bmi':
          calculatedResult = calculateBMI(inputs.weight, inputs.height);
          break;
        case 'calories':
          calculatedResult = calculateCalories(
            inputs.weight,
            inputs.height,
            inputs.age,
            inputs.gender,
            inputs.activityLevel
          );
          break;
        case 'ideal-weight':
          calculatedResult = calculateIdealWeight(inputs.height, inputs.gender);
          break;
        default:
          throw new Error('Invalid calculation type');
      }
      
      setResult(calculatedResult);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return { result, error, performCalculation };
}