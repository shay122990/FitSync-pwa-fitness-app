"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { fetchWorkouts } from "@/lib/api";

type WorkoutDateLike = Partial<{
  performedAt: string | number | Date;
  date: string | number | Date;
  createdAt: string | number | Date;
  created_at: string | number | Date;
  updatedAt: string | number | Date;
}>;

type CalendarDay = {
  date: Date;
  isInCurrentMonth: boolean;
  key: string;
};

export default function ProgressPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [workedOutDays, setWorkedOutDays] = useState<Set<string>>(new Set());

  const todayDate = new Date();
  const [displayYear, setDisplayYear] = useState<number>(
    todayDate.getFullYear()
  );
  const [displayMonth, setDisplayMonth] = useState<number>(
    todayDate.getMonth()
  );

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);

    fetchWorkouts(user.id)
      .then((workouts) => {
        const workoutDaysSet = new Set<string>();

        for (const workout of workouts as WorkoutDateLike[]) {
          const parsedDate =
            parseToDate(workout.performedAt) ??
            parseToDate(workout.date) ??
            parseToDate(workout.createdAt) ??
            parseToDate(workout.created_at) ??
            parseToDate(workout.updatedAt);

          if (!parsedDate) continue;
          workoutDaysSet.add(formatDateKey(parsedDate));
        }

        setWorkedOutDays(workoutDaysSet);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  const calendarGrid = useMemo(
    () => buildCalendarGrid(displayYear, displayMonth),
    [displayYear, displayMonth]
  );

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-bg text-fg flex items-center justify-center p-6">
        <div className="card p-6 text-center">
          <p className="mb-4">Sign in to see your workout progress.</p>
          <SignInButton mode="modal">
            <button className="btn">Sign In</button>
          </SignInButton>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg text-fg p-6 max-w-3xl mx-auto">
      <header className="flex flex-col gap-6 items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-highlight">
          Workout Progress — {getMonthName(displayMonth)} {displayYear}
        </h1>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-lg border border-line hover:bg-surface"
            onClick={() => {
              const prevMonthDate = new Date(displayYear, displayMonth, 1);
              prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
              setDisplayYear(prevMonthDate.getFullYear());
              setDisplayMonth(prevMonthDate.getMonth());
            }}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 rounded-lg border border-line hover:bg-surface"
            onClick={() => {
              setDisplayYear(todayDate.getFullYear());
              setDisplayMonth(todayDate.getMonth());
            }}
          >
            Today
          </button>
          <button
            className="px-3 py-1 rounded-lg border border-line hover:bg-surface"
            onClick={() => {
              const nextMonthDate = new Date(displayYear, displayMonth, 1);
              nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
              setDisplayYear(nextMonthDate.getFullYear());
              setDisplayMonth(nextMonthDate.getMonth());
            }}
          >
            Next
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 text-xs font-medium text-fg/70 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday) => (
          <div key={weekday} className="px-2 py-1">
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarGrid.map((day) => {
          const hasWorkout = workedOutDays.has(day.key);
          return (
            <div
              key={day.key}
              title={`${day.key}${hasWorkout ? " — Worked out" : ""}`}
              className={`aspect-square rounded-xl flex items-center justify-center border 
                ${
                  day.isInCurrentMonth
                    ? "border-line"
                    : "border-transparent opacity-40"
                } 
                ${
                  hasWorkout ? "bg-primary text-white" : "bg-surface text-fg/70"
                }`}
            >
              {day.date.getDate()}
            </div>
          );
        })}
      </div>

      {isLoading && <p className="mt-4 text-sm text-fg/60">Loading…</p>}
    </main>
  );
}

/* ---------- Helper functions ---------- */

function parseToDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonthName(monthIndex: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex];
}

function buildCalendarGrid(year: number, month: number): CalendarDay[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const startOffset = firstDayOfMonth.getDay();
  const startDate = new Date(year, month, 1 - startOffset);

  const days: CalendarDay[] = [];
  for (let index = 0; index < 42; index++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + index);
    const isInCurrentMonth = currentDate.getMonth() === month;

    days.push({
      date: currentDate,
      isInCurrentMonth,
      key: formatDateKey(currentDate),
    });
  }
  return days;
}
