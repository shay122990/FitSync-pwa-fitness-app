"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";
import { fetchWorkouts, deleteWorkout } from "@/lib/api";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (!confirmed) return;

    try {
      await deleteWorkout(id);
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (error) {
      console.error("Failed to delete workout:", error);
      alert(error instanceof Error ? error.message : "Delete failed");
    }
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Workouts</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : workouts.length === 0 ? (
        <p className="text-gray-500">No workouts found.</p>
      ) : (
        <ul className="space-y-3">
          {workouts.map((w) => (
            <li
              key={w._id}
              className="border rounded p-3 shadow-sm bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold">{w.name}</h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {w.sets} sets × {w.reps} reps
                    {w.duration ? ` · ${w.duration}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(w._id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
  