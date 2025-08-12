"use client";

import { useState } from "react";
import type { NewWorkout } from "@/types/workout";
import { useUser } from "@clerk/nextjs";

interface WorkoutFormProps {
  onSuccess?: () => void;
}

export default function WorkoutForm({ onSuccess }: WorkoutFormProps) {
  const { user } = useUser();

  const [form, setForm] = useState<NewWorkout>({
    userId: user?.id || "",
    name: "",
    sets: 0,
    reps: 0,
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number" || name === "sets" || name === "reps"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userId) return;

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
      onSuccess?.();
    } else {
      alert(await res.text().catch(() => "Failed to create workout"));
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Workout Name"
        value={form.name}
        onChange={handleChange}
        required
        className="input"
        aria-label="Workout name"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          name="sets"
          type="number"
          min={0}
          placeholder="Sets"
          value={form.sets}
          onChange={handleChange}
          required
          className="input"
          aria-label="Sets"
        />
        <input
          name="reps"
          type="number"
          min={0}
          placeholder="Reps"
          value={form.reps}
          onChange={handleChange}
          required
          className="input"
          aria-label="Reps"
        />
      </div>
      <input
        name="duration"
        placeholder="Duration (optional, e.g., 45m)"
        value={form.duration}
        onChange={handleChange}
        className="input"
        aria-label="Duration"
      />
      <button
        type="submit"
        disabled={loading || !form.userId}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Create Workout"}
      </button>

      {success && (
        <p className="text-green-500 text-center font-medium animate-pulse">
          Workout saved successfully!
        </p>
      )}
    </form>
  );
}
