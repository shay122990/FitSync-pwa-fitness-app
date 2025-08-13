"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import WorkoutForm from "./components/WorkoutForm";
import Link from "next/link";

export default function HomePage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [workoutCount, setWorkoutCount] = useState<number | null>(null);

  const firstName = useMemo(
    () => user?.firstName || user?.username || "there",
    [user]
  );

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/workouts?userId=${user.id}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((list) => setWorkoutCount(Array.isArray(list) ? list.length : 0))
        .catch(() => setWorkoutCount(0));
    }
  }, [user]);

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
            <WorkoutForm
              onSuccess={() =>
                setWorkoutCount((c) => (typeof c === "number" ? c + 1 : 1))
              }
            />
            <div className="text-center pt-2">
              <Link
                href="/workouts"
                className="inline-block text-sm text-purple-600 hover:text-purple-800 underline"
              >
                View all workouts →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
