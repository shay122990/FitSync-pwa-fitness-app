"use client";

import { useEffect, useState } from "react";
import { createWorkout } from "@/lib/api";

interface Exercise {
  id: number;
  name: string | null;
  description: string | null;
  category: number;
}

export default function ExploreWorkouts() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      const res = await fetch(
        "https://wger.de/api/v2/exercise/?language=2&status=2&limit=20"
      );
      const data = await res.json();

      // No .filter — just basic safe fallback in render
      setExercises(data.results);
      setLoading(false);
    };

    fetchExercises();
  }, []);

  const handleSave = async (exercise: Exercise) => {
    setSaving(exercise.id);
    try {
      await createWorkout({
        name: exercise.name || "Unnamed",
        sets: 3,
        reps: 10,
        duration: "30 mins",
      });
      alert("Workout saved!");
    } catch {
      alert("Failed to save workout.");
    } finally {
      setSaving(null);
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Explore Exercises</h1>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {exercises.map((exercise) => (
            <li
              key={exercise.id}
              className="bg-gray-800 text-white rounded-lg p-4 shadow"
            >
              <h2 className="text-lg font-semibold mb-2">
                {exercise.name || "Unnamed Exercise"}
              </h2>
              <div
                className="text-sm text-gray-200"
                dangerouslySetInnerHTML={{
                  __html:
                    exercise.description?.trim() ||
                    "<p>No description available.</p>",
                }}
              />

              <button
                onClick={() => handleSave(exercise)}
                disabled={saving === exercise.id}
                className="mt-2 bg-purple-600 text-white px-4 py-1 text-sm rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {saving === exercise.id ? "Saving..." : "Save to My Workouts"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
