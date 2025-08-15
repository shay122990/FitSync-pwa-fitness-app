"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import type { Workout } from "@/types/workout";
import { fetchWorkouts, deleteWorkout } from "@/lib/api";

type WorkoutWithDateFields = Workout & {
  performedAt?: string | number | Date;
  date?: string | number | Date;
  createdAt?: string | number | Date;
  created_at?: string | number | Date;
  updatedAt?: string | number | Date;
};

type WorkoutGroup = {
  key: string;
  date: Date;
  items: WorkoutWithDateFields[];
};

function parseWorkoutDate(workout: WorkoutWithDateFields): Date | null {
  const candidate =
    workout.performedAt ??
    workout.date ??
    workout.createdAt ??
    workout.created_at ??
    workout.updatedAt;

  if (candidate instanceof Date && !Number.isNaN(candidate.getTime())) {
    return candidate;
  }
  if (typeof candidate === "string" || typeof candidate === "number") {
    const parsed = new Date(candidate);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateHeading(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WorkoutsPage() {
  const { user, isLoaded } = useUser();
  const [workouts, setWorkouts] = useState<WorkoutWithDateFields[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const loadWorkouts = async () => {
      try {
        const data = await fetchWorkouts(user.id);
        setWorkouts(data as WorkoutWithDateFields[]);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadWorkouts();
  }, [user?.id]);

  const groupedByDate: WorkoutGroup[] = useMemo(() => {
    const bucket: Record<
      string,
      { date: Date; items: WorkoutWithDateFields[] }
    > = {};

    for (const workout of workouts) {
      const normalizedDate = parseWorkoutDate(workout) ?? new Date();
      const key = formatDateKey(normalizedDate);

      if (!bucket[key]) {
        bucket[key] = { date: new Date(normalizedDate), items: [] };
      }
      bucket[key].items.push(workout);
    }

    return Object.entries(bucket)
      .sort(([, a], [, b]) => b.date.getTime() - a.date.getTime())
      .map(([key, value]) => ({
        key,
        date: value.date,
        items: value.items.sort((a, b) => {
          const dateA = parseWorkoutDate(a) ?? value.date;
          const dateB = parseWorkoutDate(b) ?? value.date;
          return dateB.getTime() - dateA.getTime();
        }),
      }));
  }, [workouts]);

  const handleDelete = async (workoutId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (!confirmed || !user?.id) return;

    try {
      await deleteWorkout(workoutId, user.id);
      setWorkouts((prev) => prev.filter((w) => w._id !== workoutId));
    } catch (error) {
      console.error("Failed to delete workout:", error);
      alert(error instanceof Error ? error.message : "Delete failed");
    }
  };

  if (!isLoaded) {
    return (
      <main className="p-4 max-w-xl mx-auto">
        <p className="text-gray-500">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-4 max-w-xl mx-auto">
        <p className="text-red-500">
          You must be signed in to view your workouts.
        </p>
      </main>
    );
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Workouts</h1>

      {isLoading ? (
        <p className="text-gray-500">Loading…</p>
      ) : workouts.length === 0 ? (
        <p className="text-gray-500">No workouts found.</p>
      ) : (
        <div className="space-y-6">
          {groupedByDate.map(({ key, date, items }) => (
            <section key={key} className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-600">
                {formatDateHeading(date)}
              </h2>
              <ul className="space-y-3">
                {items.map((workout) => (
                  <li
                    key={workout._id}
                    className="border rounded p-3 shadow-sm bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{workout.name}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {workout.sets} sets × {workout.reps} reps
                          {workout.duration ? ` · ${workout.duration}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(workout._id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
