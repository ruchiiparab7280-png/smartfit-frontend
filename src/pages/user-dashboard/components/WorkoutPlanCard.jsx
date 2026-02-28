import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const WorkoutPlanCard = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      day: "Monday",
      exercises: [
        { id: 1, name: "Bench Press", sets: "4 x 12", completed: true },
        { id: 2, name: "Incline Dumbbell Press", sets: "3 x 10", completed: true },
        { id: 3, name: "Cable Flyes", sets: "3 x 15", completed: false },
        { id: 4, name: "Tricep Dips", sets: "3 x 12", completed: false }
      ]
    },
    {
      id: 2,
      day: "Wednesday",
      exercises: [
        { id: 5, name: "Squats", sets: "4 x 10", completed: false },
        { id: 6, name: "Leg Press", sets: "3 x 12", completed: false },
        { id: 7, name: "Leg Curls", sets: "3 x 15", completed: false },
        { id: 8, name: "Calf Raises", sets: "4 x 20", completed: false }
      ]
    },
    {
      id: 3,
      day: "Friday",
      exercises: [
        { id: 9, name: "Deadlifts", sets: "4 x 8", completed: false },
        { id: 10, name: "Pull-ups", sets: "3 x 10", completed: false },
        { id: 11, name: "Barbell Rows", sets: "3 x 12", completed: false },
        { id: 12, name: "Bicep Curls", sets: "3 x 15", completed: false }
      ]
    }
  ]);

  const [expandedDay, setExpandedDay] = useState(null);

  const toggleDay = (dayId) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  const toggleExercise = (dayId, exerciseId) => {
    setWorkouts(prev => prev?.map(day => {
      if (day?.id === dayId) {
        return {
          ...day,
          exercises: day?.exercises?.map(ex => 
            ex?.id === exerciseId ? { ...ex, completed: !ex?.completed } : ex
          )
        };
      }
      return day;
    }));
  };

  const getCompletionPercentage = (exercises) => {
    const completed = exercises?.filter(ex => ex?.completed)?.length;
    return Math.round((completed / exercises?.length) * 100);
  };

  return (
    <div className="bg-card rounded-lg p-6 card-elevation-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Weekly Workout Plan</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Workout
        </Button>
      </div>
      <div className="space-y-4">
        {workouts?.map((workout) => {
          const completionPercentage = getCompletionPercentage(workout?.exercises);
          const isExpanded = expandedDay === workout?.id;

          return (
            <div key={workout?.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleDay(workout?.id)}
                className="w-full px-5 py-4 bg-muted/30 hover:bg-muted/50 transition-base flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Icon name="Calendar" size={20} color="var(--color-primary)" />
                  <span className="text-lg font-semibold text-foreground">{workout?.day}</span>
                  <span className="text-sm text-muted-foreground">
                    {workout?.exercises?.length} exercises
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{completionPercentage}%</span>
                  </div>
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                  />
                </div>
              </button>
              {isExpanded && (
                <div className="p-5 space-y-3">
                  {workout?.exercises?.map((exercise) => (
                    <div 
                      key={exercise?.id}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-muted/30 transition-base"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={exercise?.completed}
                          onChange={() => toggleExercise(workout?.id, exercise?.id)}
                        />
                        <div>
                          <p className={`font-medium ${exercise?.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                            {exercise?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">{exercise?.sets}</p>
                        </div>
                      </div>
                      <Icon 
                        name={exercise?.completed ? "CheckCircle2" : "Circle"} 
                        size={20}
                        color={exercise?.completed ? "var(--color-success)" : "var(--color-muted-foreground)"}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutPlanCard;