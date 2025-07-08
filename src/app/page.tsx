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
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">🏋️ FitSync</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="name"
          placeholder="Workout Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="sets"
          type="number"
          placeholder="Sets"
          value={form.sets}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="reps"
          type="number"
          placeholder="Reps"
          value={form.reps}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="duration"
          placeholder="Duration (optional)"
          value={form.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Workout"}
        </button>
      </form>

      {success && (
        <p className="text-green-600 font-medium text-center">
          ✅ Workout saved!
        </p>
      )}

      <div className="text-center mt-6">
        <a
          href="/workouts"
          className="text-purple-600 underline hover:text-purple-800"
        >
          View all workouts →
        </a>
      </div>
    </main>
  );
}
