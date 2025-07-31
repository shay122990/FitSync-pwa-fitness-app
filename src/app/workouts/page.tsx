"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts");
      const data = await res.json();
      setWorkouts(data);
      setLoading(false);
    };

    fetchWorkouts();
  }, []);

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
              <h2 className="font-semibold">{w.name}</h2>
              <p className="text-sm">
                {w.sets} sets × {w.reps} reps
                {w.duration ? ` · ${w.duration}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
