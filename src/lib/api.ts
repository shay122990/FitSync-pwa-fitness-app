import type { Workout, NewWorkout } from "@/types/workout";

export async function fetchWorkouts(userId: string): Promise<Workout[]> {
  const res = await fetch(`/api/workouts?userId=${userId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createWorkout(
  userId: string,
  data: Omit<NewWorkout, "userId">
): Promise<{ success: boolean; insertedId: string }> {
  const res = await fetch("/api/workouts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteWorkout(id: string, userId: string): Promise<{ success: boolean }> {
  const res = await fetch(`/api/workouts/${id}?userId=${userId}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
