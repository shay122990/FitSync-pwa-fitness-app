"use client";

import { useState } from "react";
import type { NewWorkout } from "@/types/workout";

export default function HomePage() {
  const [form, setForm] = useState<NewWorkout>({
    name: "",
    sets: 0,
    reps: 0,
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "sets" || name === "reps" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: "", sets: 0, reps: 0, duration: "" });
      setSuccess(true);
    } else {
      alert("Failed to create workout");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black px-4 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white tracking-tight">
          Create New Workout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Workout Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            name="sets"
            type="number"
            placeholder="Sets"
            value={form.sets}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            name="reps"
            type="number"
            placeholder="Reps"
            value={form.reps}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            name="duration"
            placeholder="Duration (optional)"
            value={form.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white text-sm py-2 rounded hover:bg-purple-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create Workout"}
          </button>
        </form>

        {success && (
          <p className="text-green-500 text-center font-medium animate-pulse">
            Workout saved successfully!
          </p>
        )}

        <div className="text-center pt-4">
          <a
            href="/workouts"
            className="inline-block text-sm text-purple-600 hover:text-purple-800 transition-colors underline"
          >
            View all workouts →
          </a>
        </div>
      </div>
    </main>
  );
}
