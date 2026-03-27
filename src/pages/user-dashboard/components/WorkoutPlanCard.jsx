import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { supabase } from "../../../lib/supabase";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/* ───────────── Toast Component ───────────── */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-2xl ${colors[type] || colors.info}`}
    >
      <Icon name={type === "success" ? "CheckCircle" : type === "error" ? "AlertCircle" : "Info"} size={20} />
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
        <Icon name="X" size={16} />
      </button>
    </motion.div>
  );
};

/* ───────────── Main Component ───────────── */
const WorkoutPlanCard = ({ workouts, setWorkouts }) => {
  const [activeDay, setActiveDay] = useState("Monday");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const userEmail = localStorage.getItem("userEmail");

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const resetForm = () => {
    setExercise("");
    setSets("");
    setReps("");
    setDuration("");
    setFormErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const validate = () => {
    const errors = {};
    if (!exercise.trim()) errors.exercise = "Exercise name is required";
    if (!sets || Number(sets) < 1) errors.sets = "Enter valid sets (≥ 1)";
    if (!reps || Number(reps) < 1) errors.reps = "Enter valid reps (≥ 1)";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ─── CRUD via Supabase client directly ─── */

  const addWorkout = async () => {
    console.log("🟡 addWorkout triggered");
    if (!validate()) {
      console.log("❌ Validation failed", formErrors);
      return;
    }

    if (!userEmail) {
      showToast("Please log in first to add workouts", "error");
      console.error("❌ user_id is null — not logged in");
      return;
    }

    setLoading(true);

    // Build payload – try with duration first, fallback without it
    const baseCols = {
      user_id: userEmail,
      day: activeDay,
      exercise: exercise.trim(),
      sets: Number(sets),
      reps: Number(reps),
    };

    const payloadWithDuration = { ...baseCols, duration: duration.trim() || "" };

    console.log("📤 Sending to Supabase:", payloadWithDuration);

    try {
      // Attempt with duration column
      let { data, error } = await supabase
        .from("workouts")
        .insert([payloadWithDuration])
        .select();

      // If duration column doesn't exist, retry without it
      if (error && error.code === "PGRST204" && error.message?.includes("duration")) {
        console.log("⚠️ 'duration' column missing, retrying without it...");
        const result = await supabase
          .from("workouts")
          .insert([baseCols])
          .select();
        data = result.data;
        error = result.error;
      }

      console.log("📥 Supabase response:", { data, error });

      if (error) throw error;

      if (data && data[0]) {
        setWorkouts((prev) => [...(prev || []), data[0]]);
        console.log("✅ Workout added to state:", data[0]);
        showToast("Workout added successfully!");
      } else {
        throw new Error("No data returned from insert");
      }

      resetForm();
    } catch (err) {
      console.error("❌ Add workout error:", err);
      showToast(err.message || "Failed to add workout", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateWorkout = async () => {
    console.log("🟡 updateWorkout triggered, id:", editingId);
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        exercise: exercise.trim(),
        sets: Number(sets),
        reps: Number(reps),
      };

      // Try adding duration; ignore if column missing
      const durVal = duration.trim() || "";

      console.log("📤 Updating workout:", editingId, payload);

      let { data, error } = await supabase
        .from("workouts")
        .update({ ...payload, duration: durVal })
        .eq("id", editingId)
        .select();

      if (error && error.code === "PGRST204" && error.message?.includes("duration")) {
        console.log("⚠️ 'duration' column missing, retrying without it...");
        const result = await supabase
          .from("workouts")
          .update(payload)
          .eq("id", editingId)
          .select();
        data = result.data;
        error = result.error;
      }

      console.log("📥 Update response:", { data, error });

      if (error) throw error;

      setWorkouts((prev) =>
        (prev || []).map((w) =>
          w.id === editingId ? { ...w, ...payload, duration: durVal } : w
        )
      );

      showToast("Workout updated successfully!");
      resetForm();
    } catch (err) {
      console.error("❌ Update workout error:", err);
      showToast(err.message || "Failed to update workout", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (id) => {
    console.log("🟡 deleteWorkout triggered, id:", id);

    // Optimistic remove
    const prev = [...(workouts || [])];
    setWorkouts((p) => (p || []).filter((w) => w.id !== id));

    try {
      const { error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", id);

      console.log("📥 Delete response:", { error });

      if (error) throw error;
      showToast("Workout deleted!");
    } catch (err) {
      console.error("❌ Delete workout error:", err);
      setWorkouts(prev); // rollback
      showToast("Failed to delete workout", "error");
    }
  };

  const startEdit = (w) => {
    setEditingId(w.id);
    setExercise(w.exercise);
    setSets(String(w.sets));
    setReps(String(w.reps));
    setDuration(w.duration || "");
    setShowForm(true);
    setFormErrors({});
  };

  /* ─── Filtered data ─── */
  const dayWorkouts = (workouts || []).filter((w) => w.day === activeDay);
  const workoutsPerDay = DAYS.map((d) => ({
    day: d,
    count: (workouts || []).filter((w) => w.day === d).length,
  }));

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
              <Icon name="Dumbbell" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Workout Planner</h2>
              <p className="text-xs text-muted-foreground">Plan your weekly exercises</p>
            </div>
          </div>

          <Button
            variant="outline"
            iconName={showForm && !editingId ? "X" : "Plus"}
            onClick={() => {
              if (editingId) resetForm();
              else setShowForm(!showForm);
            }}
            className="rounded-xl"
          >
            {showForm && !editingId ? "Cancel" : "+ Add Workout"}
          </Button>
        </div>

        {/* Day Tabs */}
        <div className="px-6 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
          {workoutsPerDay.map(({ day, count }) => (
            <button
              key={day}
              onClick={() => { setActiveDay(day); resetForm(); }}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeDay === day
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {day.slice(0, 3)}
              {count > 0 && (
                <span
                  className={`ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                    activeDay === day ? "bg-white/25 text-white" : "bg-orange-500/15 text-orange-500"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Add / Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mx-6 my-4 p-5 bg-muted/50 rounded-xl border border-border space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Icon name={editingId ? "Pencil" : "Plus"} size={16} className="text-orange-500" />
                  {editingId ? "Edit Exercise" : `Add Exercise to ${activeDay}`}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Exercise Name */}
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Exercise name (e.g. Bench Press)"
                      className={`w-full px-4 py-2.5 rounded-xl bg-card text-foreground border transition-colors text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                        formErrors.exercise ? "border-red-500" : "border-border"
                      }`}
                      value={exercise}
                      onChange={(e) => { setExercise(e.target.value); setFormErrors((p) => ({ ...p, exercise: "" })); }}
                    />
                    {formErrors.exercise && <p className="text-red-500 text-xs mt-1">{formErrors.exercise}</p>}
                  </div>

                  {/* Sets */}
                  <div>
                    <input
                      type="number"
                      min="1"
                      placeholder="Sets"
                      className={`w-full px-4 py-2.5 rounded-xl bg-card text-foreground border transition-colors text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                        formErrors.sets ? "border-red-500" : "border-border"
                      }`}
                      value={sets}
                      onChange={(e) => { setSets(e.target.value); setFormErrors((p) => ({ ...p, sets: "" })); }}
                    />
                    {formErrors.sets && <p className="text-red-500 text-xs mt-1">{formErrors.sets}</p>}
                  </div>

                  {/* Reps */}
                  <div>
                    <input
                      type="number"
                      min="1"
                      placeholder="Reps"
                      className={`w-full px-4 py-2.5 rounded-xl bg-card text-foreground border transition-colors text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                        formErrors.reps ? "border-red-500" : "border-border"
                      }`}
                      value={reps}
                      onChange={(e) => { setReps(e.target.value); setFormErrors((p) => ({ ...p, reps: "" })); }}
                    />
                    {formErrors.reps && <p className="text-red-500 text-xs mt-1">{formErrors.reps}</p>}
                  </div>

                  {/* Duration */}
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Duration (optional, e.g. 30 min)"
                      className="w-full px-4 py-2.5 rounded-xl bg-card text-foreground border border-border transition-colors text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (editingId) updateWorkout();
                      else addWorkout();
                    }}
                    loading={loading}
                    className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl"
                  >
                    {editingId ? "Save Changes" : "Add Exercise"}
                  </Button>
                  {editingId && (
                    <Button variant="outline" onClick={resetForm} className="rounded-xl">
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workout List */}
        <div className="px-6 pb-6 pt-2 min-h-[180px]">
          {dayWorkouts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Icon name="Dumbbell" size={28} className="text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground font-medium">No workout added</p>
              <p className="text-muted-foreground/60 text-sm mt-1">
                Tap "+ Add Workout" to plan your {activeDay} exercises
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {dayWorkouts.map((w, i) => (
                  <motion.div
                    key={w.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -60, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="group relative bg-muted/40 hover:bg-muted/70 border border-border rounded-xl p-4 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Exercise Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{w.exercise}</h4>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-orange-500/10 text-orange-500 px-2.5 py-1 rounded-lg">
                            <Icon name="Repeat" size={12} /> {w.sets} Sets
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-lg">
                            <Icon name="RotateCcw" size={12} /> {w.reps} Reps
                          </span>
                          {w.duration && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-lg">
                              <Icon name="Clock" size={12} /> {w.duration}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(w)}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
                          title="Edit"
                        >
                          <Icon name="Pencil" size={14} />
                        </button>
                        <button
                          onClick={() => deleteWorkout(w.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                          title="Delete"
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {(workouts || []).length > 0 && (
          <div className="px-6 py-3 bg-muted/30 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>{(workouts || []).length} total exercises planned</span>
            <span>{DAYS.filter((d) => (workouts || []).some((w) => w.day === d)).length}/7 days active</span>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkoutPlanCard;