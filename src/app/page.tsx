"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import type { NewWorkout } from "@/types/workout";

export default function HomePage() {
  const { user, isSignedIn, isLoaded } = useUser();

  const [form, setForm] = useState<NewWorkout>({
    userId: "",
    name: "",
    sets: 0,
    reps: 0,
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [workoutCount, setWorkoutCount] = useState<number | null>(null);

  const firstName = useMemo(
    () => user?.firstName || user?.username || "there",
    [user]
  );

  useEffect(() => {
    if (user?.id) {
      setForm((prev) => ({ ...prev, userId: user.id }));
      fetch(`/api/workouts?userId=${user.id}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((list) => setWorkoutCount(Array.isArray(list) ? list.length : 0))
        .catch(() => setWorkoutCount(0));
    }
  }, [user]);

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
      setWorkoutCount((c) => (typeof c === "number" ? c + 1 : 1));
    } else {
      alert(await res.text().catch(() => "Failed to create workout"));
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black px-4 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 space-y-6">
        <section className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white tracking-tight">
            {isSignedIn ? `Welcome back, ${firstName}!` : "Welcome to FitSync"}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {isSignedIn
              ? workoutCount === 0
                ? "Let’s create your first workout. It takes under a minute."
                : "Ready for your next session? Create a new workout below."
              : "Sign in to start creating and tracking your workouts."}
          </p>
        </section>

        <ol className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-200 space-y-2">
          <li>1. Name your workout (e.g., “Upper Body A”).</li>
          <li>2. Set total sets & reps per exercise.</li>
          <li>3. Optionally add a duration (e.g., “45m”).</li>
          <li>4. Save it. Then view all workouts to start.</li>
        </ol>

        {!isLoaded || !isSignedIn ? (
          <div className="flex items-center justify-center">
            <SignInButton mode="modal">
              <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                Sign in to create a workout
              </button>
            </SignInButton>
          </div>
        ) : (
          <>
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
            </form>

            {success && (
              <p className="text-green-500 text-center font-medium animate-pulse">
                Workout saved successfully!
              </p>
            )}

            <div className="text-center pt-2">
              <a
                href="/workouts"
                className="inline-block text-sm text-purple-600 hover:text-purple-800 underline"
              >
                View all workouts →
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
