'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { Plus } from 'lucide-react';

const healthStatusOptions = [
  { value: 'select', label: 'Select' },
  { value: 'Diabetic', label: 'Diabetic' },
  { value: 'Cardiac', label: 'Cardiac' },
  { value: 'renal', label: 'Renal' },
  { value: 'surgical', label: 'Surgical' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'Obsteric', label: 'Obsteric' },
  { value: 'pulmonary', label: 'Pulmonary' },
  { value: 'Critical Core', label: 'Critical Core' },
  { value: 'Gastraintestinal', label: 'Gastraintestinal' },
  { value: 'Neurological', label: 'Neurological' },
  { value: 'Eating Disorder', label: 'Eating Disorder' },
  { value: 'Geriatic', label: 'Geriatic' },
  { value: 'Buriatries', label: 'Buriatries' },
];

const stress = [
  { value: 'select', label: 'Select' },
  { value: 'burn 1.5-2.5', label: 'burn 1.5-2.5' },
  { value: 'Growth failure 1.2-1.6', label: 'Growth failure 1.2-1.6' },
  { value: 'Infection 1.2-1.6', label: 'Infection 1.2-1.6' },
  { value: 'starvation 0.70', label: 'starvation 0.70' },
  { value: 'surgery 1.2-1.5', label: 'surgery 1.2-1.5' },
  { value: 'trauma 1.1-1.8', label: 'trauma 1.1-1.8' },
];



const speacial = [
  { value: 'select', label: 'Select' },
  { value: 'Down Syndrome', label: 'Down Syndrome' },
  { value: 'Athetoid', label: 'Athetoid' },
  { value: 'mild to moderate activity', label: 'Mild to Moderate Activity' },
  { value: 'sever physical restriction', label: 'Sever Physical Restriction' },
  { value: 'sever restriction activity', label: 'Sever Restriction Activity' },
  { value: 'weight', label: 'Weight' },
  { value: 'Weight management', label: 'Weight Management' },
];

const physical = [
  { value: 'select', label: 'Select' },
  { value: 'paralyzed', label: 'Paralyzed' },
  { value: 'ambulatory', label: 'Ambulatory' },
  { value: 'confined to bed', label: 'Confined to Bed' },
];

const ascitesEdemaOptions = [
  { value: 'none', label: 'None' },
  { value: 'mild', label: 'Mild' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe' },
];

const getBMI50thPercentile = (age, gender) => {
  // Simplified fixed value for demo
  return 17; // Replace with logic to get BMI percentile from chart
};

const calculateIBW = (heightMeters, age, gender) => {
  const bmi = getBMI50thPercentile(age, gender);
  return bmi * heightMeters * heightMeters;
};

const calculateFluidRequirement = (weightKg) => {
  if (weightKg <= 10) return weightKg * 100;
  if (weightKg <= 20) return 1000 + (weightKg - 10) * 50;
  return 1500 + (weightKg - 20) * 20;
};

export default function AddPatientModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    wegiht: '',
    hieght: '',
    phac:'',
    stressFactor: '',
    specialCase: '',
    healthStatus: '',
    ascitesEdema: '',
    lab:'',
    note: '',
  });


  const [calculations, setCalculations] = useState({ ibw: 0, ibwPercentage: 0, fluidRequirement: 0 });
  const { isOpen, closeModal } = useModal(true);

  useEffect(() => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100;
    const age = parseInt(formData.age);
    const gender = formData.gender;

    if (weight && height && age && gender) {
      const ibw = calculateIBW(height, age, gender);
      const ibwPercentage = (weight / ibw) * 100;
      const fluidRequirement = calculateFluidRequirement(weight);

      setCalculations({ ibw, ibwPercentage, fluidRequirement });
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Add New Patient
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Select
                label="Gender"
                options={[
                  { value: '', label: 'Select gender' },
                  { value: 'boy', label: 'Boy' },
                  { value: 'Girl', label: 'Girl' },
                ]}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              />

              <Input
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
              <Input
                label="Weight"
                type="text"
                value={formData.wegiht}
                onChange={(e) => setFormData({ ...formData, wegiht: e.target.value })}
                required
              />

              <Input
                label="Height"
                type="text"
                value={formData.hieght}
                onChange={(e) => setFormData({ ...formData, hieght: e.target.value })}
                required
              />

              <Select
                label="Physical Activity"
                options={physical}
                value={formData.phac}
                onChange={(e) => setFormData({ ...formData, phac: e.target.value })}
              />

              <Select
                label="Stress Factor (1-10)"
                options={stress}
                value={formData.stressFactor}
                onChange={(e) => setFormData({ ...formData, stressFactor: e.target.value })}
              />

              <Select
                label="Ascites/Edema"
                options={ascitesEdemaOptions}
                value={formData.ascitesEdema}
                onChange={(e) => setFormData({ ...formData, ascitesEdema: e.target.value })}
              />

              <Select
                label="Special Cases"
                options={speacial}
                value={formData.specialCase}
                onChange={(e) => setFormData({ ...formData, specialCase: e.target.value })}
              />

              <Select
                label="Health Status"
                options={healthStatusOptions}
                value={formData.healthStatus}
                onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
              />

              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <Button className="text-nowrap" type="button" variant="secondary" >
                Type of Feeding
              </Button>
              <div className='flex gap-4'>
              <label>Regular </label>
              <Input
                type="checkbox"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
              <label className="text-nowrap">Enteral peripheral </label>
              <Input
                type="checkbox"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
              <label>TPN </label>
              <Input
                type="checkbox"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <Button className="text-nowrap" type="button" variant="secondary" >
                Growth Chart
              </Button>
              <div className='flex gap-4'>
              <label>Normal </label>
              <Input
                type="checkbox"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
              <label className="text-nowrap">Down Syndrome </label>
              <Input
                type="checkbox"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
              <label className="text-nowrap">Cerebral palsy </label>
              <Input
                type="checkbox"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <p className="text-sm text-gray-600">IBW: {calculations.ibw.toFixed(2)} kg</p>
              <p className="text-sm text-gray-600">% IBW: {calculations.ibwPercentage.toFixed(2)}%</p>
              <p className="text-sm text-gray-600">Fluid Requirement (Holliday-Segar): {calculations.fluidRequirement.toFixed(0)} ml/day</p>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-center">
            <Select
                label="Lab Results"
                options={[
                  { value: '', label: 'Lab Results' },
                ]}
                value={formData.lab}
                onChange={(e) => setFormData({ ...formData, lab: e.target.value })}
              />
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <Button className="flex items-center gap-2  text-nowrap" type="button" variant="secondary" onClick={onClose}>
               <Plus color='red'/>
               Add New Formula
              </Button>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-center">
            <Input
                label="Note"
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save Patient
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}