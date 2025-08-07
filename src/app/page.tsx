"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import type { NewWorkout } from "@/types/workout";

export default function HomePage() {
  const { user } = useUser();

  const [form, setForm] = useState<NewWorkout>({
    userId: "",
    name: "",
    sets: 0,
    reps: 0,
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Inject Clerk userId once it's available
  useEffect(() => {
    if (user?.id) {
      setForm((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

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
      setForm({
        userId: user?.id || "",
        name: "",
        sets: 0,
        reps: 0,
        duration: "",
      });
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
            required
            className="input"
          />
          <input
            name="sets"
            type="number"
            placeholder="Sets"
            value={form.sets}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="reps"
            type="number"
            placeholder="Reps"
            value={form.reps}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="duration"
            placeholder="Duration (optional)"
            value={form.duration}
            onChange={handleChange}
            className="input"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
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
            className="inline-block text-sm text-purple-600 hover:text-purple-800 underline"
          >
            View all workouts →
          </a>
        </div>
      </div>
    </main>
  );
}
