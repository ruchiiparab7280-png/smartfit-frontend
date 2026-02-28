import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) {
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmiValue = (weightInKg / (heightInMeters * heightInMeters))?.toFixed(1);
    
    setBmi(bmiValue);

    let cat = '';
    let rec = '';

    if (bmiValue < 18.5) {
      cat = 'Underweight';
      rec = 'Consider increasing calorie intake and strength training to build healthy muscle mass. Consult with a nutritionist for a personalized meal plan.';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      cat = 'Normal Weight';
      rec = 'Great job! Maintain your current lifestyle with regular exercise and balanced nutrition. Continue monitoring your progress.';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      cat = 'Overweight';
      rec = 'Focus on cardio exercises and calorie deficit. Aim for 150 minutes of moderate activity per week and consider consulting a fitness trainer.';
    } else {
      cat = 'Obese';
      rec = 'Consult with healthcare professionals for a comprehensive weight management plan. Start with low-impact exercises and gradual dietary changes.';
    }

    setCategory(cat);
    setRecommendation(rec);
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
    setRecommendation('');
  };

  const getCategoryColor = () => {
    if (!category) return 'text-muted-foreground';
    if (category === 'Normal Weight') return 'text-success';
    if (category === 'Underweight' || category === 'Overweight') return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg p-6 card-elevation-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">BMI Calculator</h2>
          <p className="text-sm text-muted-foreground">Calculate your Body Mass Index</p>
        </div>
      </div>
      <div className="space-y-4">
        <Input
          label="Height (cm)"
          type="number"
          placeholder="Enter height in centimeters"
          value={height}
          onChange={(e) => setHeight(e?.target?.value)}
          min="100"
          max="250"
          required
        />

        <Input
          label="Weight (kg)"
          type="number"
          placeholder="Enter weight in kilograms"
          value={weight}
          onChange={(e) => setWeight(e?.target?.value)}
          min="30"
          max="300"
          required
        />

        <div className="flex gap-3">
          <Button 
            variant="default" 
            fullWidth 
            onClick={calculateBMI}
            disabled={!height || !weight}
            iconName="Calculator"
            iconPosition="left"
          >
            Calculate BMI
          </Button>
          {bmi && (
            <Button 
              variant="outline" 
              onClick={resetCalculator}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset
            </Button>
          )}
        </div>

        {bmi && (
          <div className="mt-6 space-y-4">
            <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
              <p className="text-5xl font-bold text-primary mb-2">{bmi}</p>
              <p className={`text-lg font-semibold ${getCategoryColor()}`}>{category}</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Health Recommendation</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{recommendation}</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-3">BMI Categories</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Underweight</span>
                  <span className="font-medium text-foreground">&lt; 18.5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Normal Weight</span>
                  <span className="font-medium text-foreground">18.5 - 24.9</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overweight</span>
                  <span className="font-medium text-foreground">25 - 29.9</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Obese</span>
                  <span className="font-medium text-foreground">&ge; 30</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;