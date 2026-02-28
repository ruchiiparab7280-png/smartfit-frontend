import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressChart = () => {
  const [chartType, setChartType] = useState('weight');

  const weightData = [
    { month: 'Jan', weight: 185, target: 180 },
    { month: 'Feb', weight: 183, target: 178 },
    { month: 'Mar', weight: 180, target: 176 },
    { month: 'Apr', weight: 178, target: 174 },
    { month: 'May', weight: 176, target: 172 },
    { month: 'Jun', weight: 174, target: 170 }
  ];

  const workoutData = [
    { month: 'Jan', sessions: 12 },
    { month: 'Feb', sessions: 16 },
    { month: 'Mar', sessions: 14 },
    { month: 'Apr', sessions: 18 },
    { month: 'May', sessions: 20 },
    { month: 'Jun', sessions: 22 }
  ];

  const caloriesData = [
    { month: 'Jan', burned: 2400, consumed: 2200 },
    { month: 'Feb', burned: 2600, consumed: 2100 },
    { month: 'Mar', burned: 2500, consumed: 2000 },
    { month: 'Apr', burned: 2700, consumed: 2100 },
    { month: 'May', burned: 2800, consumed: 2000 },
    { month: 'Jun', burned: 2900, consumed: 1900 }
  ];

  const chartOptions = [
    { id: 'weight', label: 'Weight Progress', icon: 'TrendingDown' },
    { id: 'workouts', label: 'Workout Sessions', icon: 'Activity' },
    { id: 'calories', label: 'Calorie Tracking', icon: 'Flame' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 card-elevation-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Progress Tracking</h2>
        <div className="flex gap-2">
          {chartOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={chartType === option?.id ? 'default' : 'outline'}
              size="sm"
              iconName={option?.icon}
              iconPosition="left"
              onClick={() => setChartType(option?.id)}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full h-80" aria-label={`${chartOptions?.find(o => o?.id === chartType)?.label} Chart`}>
        {chartType === 'weight' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                name="Current Weight (lbs)"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="var(--color-success)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target Weight (lbs)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === 'workouts' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="sessions" 
                fill="var(--color-accent)" 
                name="Workout Sessions"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'calories' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={caloriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="burned" 
                stroke="var(--color-error)" 
                strokeWidth={3}
                name="Calories Burned"
              />
              <Line 
                type="monotone" 
                dataKey="consumed" 
                stroke="var(--color-warning)" 
                strokeWidth={3}
                name="Calories Consumed"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Target" size={20} color="var(--color-primary)" />
            <span className="text-sm text-muted-foreground">Current Goal</span>
          </div>
          <p className="text-2xl font-bold text-foreground">170 lbs</p>
          <p className="text-xs text-muted-foreground mt-1">4 lbs to go</p>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={20} color="var(--color-success)" />
            <span className="text-sm text-muted-foreground">Progress Rate</span>
          </div>
          <p className="text-2xl font-bold text-foreground">1.8 lbs/mo</p>
          <p className="text-xs text-muted-foreground mt-1">On track</p>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Calendar" size={20} color="var(--color-accent)" />
            <span className="text-sm text-muted-foreground">Est. Completion</span>
          </div>
          <p className="text-2xl font-bold text-foreground">Aug 2025</p>
          <p className="text-xs text-muted-foreground mt-1">2 months left</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;