export function calculateBMI(weight, height) {
    if (!weight || !height) return null;
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    return { bmi, category };
  }
  
  export function calculateCalories(weight, height, age, gender, activityLevel) {
    if (!weight || !height || !age || !gender) return null;
    
    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'extra-active': 1.9,
    };
    
    const maintenance = bmr * activityMultipliers[activityLevel];
    const weightLoss = maintenance * 0.85; // 15% reduction for weight loss
    const weightGain = maintenance * 1.15; // 15% increase for weight gain
    
    return { maintenance, weightLoss, weightGain };
  }
  
  export function calculateIdealWeight(height, gender) {
    if (!height || !gender) return null;
    
    // Robinson formula (1983)
    let minWeight, maxWeight;
    if (gender === 'male') {
      minWeight = 52 + 1.9 * ((height - 152.4) / 2.54);
      maxWeight = 56.2 + 1.9 * ((height - 152.4) / 2.54);
    } else {
      minWeight = 49 + 1.7 * ((height - 152.4) / 2.54);
      maxWeight = 53.1 + 1.7 * ((height - 152.4) / 2.54);
    }
    
    return { minWeight, maxWeight };
  }
  
  // Add more calculation functions as needed