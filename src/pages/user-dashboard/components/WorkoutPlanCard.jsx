import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const WorkoutPlanCard = ({ workouts, setWorkouts }) => {


  const [expandedDay, setExpandedDay] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [day, setDay] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");

  const [exerciseList, setExerciseList] = useState([]);

  const [editing, setEditing] = useState(null);

  const [saveError, setSaveError] = useState("");

  const toggleDay = (id) => {
    setExpandedDay(expandedDay === id ? null : id);
  };

  const syncWorkout = async (id, updatedExercises) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/update-workout/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercises: updatedExercises })
      });
    } catch(err) {
      console.log("Sync error", err);
    }
  };

  const toggleExercise = (dayId, exerciseId) => {
    setWorkouts(prev =>
      prev.map(day => {
        if (day.id === dayId) {
          const updatedExercises = day.exercises.map(ex =>
            ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
          );
          syncWorkout(dayId, updatedExercises);
          return { ...day, exercises: updatedExercises };
        }
        return day;
      })
    );
  };

  const getCompletionPercentage = (exercises) => {

    if (exercises.length === 0) return 0;

    const completed = exercises.filter(e => e.completed).length;

    return Math.round((completed / exercises.length) * 100);

  };

  const addExercise = () => {

    if (!exercise || !sets) return;

    setExerciseList([
      ...exerciseList,
      {
        id: Date.now(),
        name: exercise,
        sets: sets,
        completed: false
      }
    ]);

    setExercise("");
    setSets("");

  };

  const saveWorkout = async () => {

    if (!day || exerciseList.length === 0) return;

    setSaveError("");
    const user_email = localStorage.getItem("userEmail")

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/add-workout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_email,
          day,
          date: new Date().toISOString(),
          exercises: exerciseList
        })
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setSaveError(errData.message || "Failed to save workout. Please try again.");
        return;
      }

      const data = await res.json()
      console.log(data)

    } catch (err) {
      console.log("Workout save error", err)
      setSaveError("Network error. Please check your connection and try again.");
      return;
    }

    setExerciseList([]);
    setDay("");
    setShowForm(false);

    // After adding new exercises, refresh the whole list to ensure UI has correct DB IDs
    const fetchWorkouts = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user-workouts/${email}`);
        if (!res.ok) return;
        const data = await res.json();
        setWorkouts(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchWorkouts();

  };

  const deleteExercise = (dayId, exerciseId) => {
    setWorkouts(prev =>
      prev.map(day => {
        if (day.id === dayId) {
          const updatedExercises = day.exercises.filter(e => e.id !== exerciseId);
          syncWorkout(dayId, updatedExercises);
          return { ...day, exercises: updatedExercises };
        }
        return day;
      })
    );
  };

  const startEdit = (dayId, exercise) => {

    setEditing({ dayId, exerciseId: exercise.id });

    setExercise(exercise.name);
    setSets(exercise.sets);

  };

  const saveEdit = () => {
    setWorkouts(prev =>
      prev.map(day => {
        if (day.id === editing.dayId) {
          const updatedExercises = day.exercises.map(ex =>
            ex.id === editing.exerciseId ? { ...ex, name: exercise, sets: sets } : ex
          );
          syncWorkout(editing.dayId, updatedExercises);
          return { ...day, exercises: updatedExercises };
        }
        return day;
      })
    );

    setEditing(null);
    setExercise("");
    setSets("");

  };

  const handleDeleteDay = async (dayName) => {
    try {
      const user_email = localStorage.getItem("userEmail");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/delete-day/${encodeURIComponent(dayName)}?user_email=${encodeURIComponent(user_email)}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");
      setWorkouts(prev => prev.filter(w => w.day !== dayName));
    } catch (err) {
      console.log("Delete day error", err);
    }
  };

  return (

    <div className="bg-card rounded-lg p-6">

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold text-foreground">
          Weekly Workout Plan
        </h2>

        <Button
          variant="outline"
          iconName="Plus"
          onClick={() => setShowForm(!showForm)}
        >
          Add Workout
        </Button>

      </div>

      {showForm && (

        <div className="bg-muted p-4 rounded-lg mb-6 space-y-3">

          <select
            className="w-full p-2 rounded bg-card text-foreground border border-border"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >

            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>

          </select>

          <input
            type="text"
            placeholder="Exercise Name"
            className="w-full p-2 rounded bg-card text-foreground border border-border"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />

          <input
            type="text"
            placeholder="Sets (3 x 12)"
            className="w-full p-2 rounded bg-card text-foreground border border-border"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />

          <Button onClick={addExercise}>
            Add Exercise
          </Button>

          <div className="space-y-2">

            {exerciseList.map(ex => (

              <div key={ex.id} className="flex justify-between bg-background p-2 rounded">

                <span>{ex.name} - {ex.sets}</span>

                <button
                  className="text-red-500"
                  onClick={() => setExerciseList(exerciseList.filter(e => e.id !== ex.id))}
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

          <Button onClick={saveWorkout}>
            Save Workout
          </Button>

          {saveError && (
            <p className="text-red-500 text-sm mt-2">{saveError}</p>
          )}

        </div>

      )}

      <div className="space-y-4">

        {workouts.map(workout => {

          const percent = getCompletionPercentage(workout.exercises);

          const expanded = expandedDay === workout.id;

          return (

            <div key={workout.id} className="border rounded-lg">

              <div className="w-full flex justify-between items-center p-4">

                <button
                  onClick={() => toggleDay(workout.id)}
                  className="flex-1 flex justify-between items-center"
                >
                  <span className="font-semibold">{workout.day}</span>
                  <span>{percent}%</span>
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteDay(workout.day); }}
                  className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                  title="Delete workout"
                >
                  <Icon name="Trash2" size={16} />
                </button>

              </div>

              {expanded && (

                <div className="p-4 space-y-3">

                  {workout.exercises.map(exercise => (

                    <div key={exercise.id} className="flex justify-between items-center">

                      <div className="flex items-center gap-3">

                        <Checkbox
                          checked={exercise.completed}
                          onChange={() => toggleExercise(workout.id, exercise.id)}
                        />

                        <div>

                          <p className={`${exercise.completed ? "line-through text-muted-foreground" : ""}`}>
                            {exercise.name}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {exercise.sets}
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-4">

                        <button
                          className="text-blue-500"
                          onClick={() => startEdit(workout.id, exercise)}
                        >
                          Edit
                        </button>

                        <button
                          className="text-red-500"
                          onClick={() => deleteExercise(workout.id, exercise.id)}
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          );

        })}

      </div>

      {editing && (

        <div className="bg-muted p-4 rounded-lg mt-6 space-y-3">

          <h3>Edit Exercise</h3>

          <input
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="w-full p-2 rounded bg-card text-foreground border border-border"
          />

          <input
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="w-full p-2 rounded bg-card text-foreground border border-border"
          />

          <Button onClick={saveEdit}>
            Save Changes
          </Button>

        </div>

      )}

    </div>

  );

};

export default WorkoutPlanCard;