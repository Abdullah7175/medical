'use client';

import { Utensils, Droplet, Apple, Salad } from 'lucide-react';
import { Button } from "@/components/ui/button";

const meals = [
  { time: "Breakfast", name: "Oatmeal with berries", calories: 350, icon: <Apple className="w-5 h-5" /> },
  { time: "Lunch", name: "Grilled chicken salad", calories: 450, icon: <Salad className="w-5 h-5" /> },
  { time: "Snack", name: "Greek yogurt", calories: 150, icon: <Utensils className="w-5 h-5" /> },
  { time: "Dinner", name: "Salmon with quinoa", calories: 500, icon: <Utensils className="w-5 h-5" /> },
];

export default function NutritionPlan() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Today's Plan</h3>
        <span className="text-sm text-gray-500">1,450 kcal</span>
      </div>
      
      <div className="space-y-3">
        {meals.map((meal, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              {meal.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{meal.time}</h3>
              <p className="text-sm text-gray-600">{meal.name}</p>
            </div>
            <span className="text-sm font-medium">{meal.calories} kcal</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-lg">
        <Droplet className="w-5 h-5 text-green-600" />
        <p className="text-sm text-gray-700">Remember to drink at least 2L of water today</p>
      </div>
      
      <Button variant="outline" className="w-full mt-4 border-blue-500 text-blue-600 hover:bg-blue-50">
        View Weekly Plan
      </Button>
    </div>
  );
}