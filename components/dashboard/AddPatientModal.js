'use client';

import { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';

const healthStatusOptions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
];

const ascitesEdemaOptions = [
  { value: 'none', label: 'None' },
  { value: 'mild', label: 'Mild' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe' },
];

export default function AddPatientModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    stressFactor: '',
    specialCase: '',
    healthStatus: '',
    ascitesEdema: ''
  });

  const { isOpen, closeModal } = useModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
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
                label="Stress Factor (1-10)"
                type="number"
                min="1"
                max="10"
                value={formData.stressFactor}
                onChange={(e) => setFormData({ ...formData, stressFactor: e.target.value })}
              />

              <Input
                label="Special Case"
                type="text"
                value={formData.specialCase}
                onChange={(e) => setFormData({ ...formData, specialCase: e.target.value })}
              />

              <Select
                label="Health Status"
                options={healthStatusOptions}
                value={formData.healthStatus}
                onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
              />

              <Select
                label="Ascites/Edema"
                options={ascitesEdemaOptions}
                value={formData.ascitesEdema}
                onChange={(e) => setFormData({ ...formData, ascitesEdema: e.target.value })}
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