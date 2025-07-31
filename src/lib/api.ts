import type { Workout, NewWorkout } from '@/types/workout';

export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch('/api/workouts');
  if (!res.ok) throw new Error('Failed to fetch workouts');
  return res.json();
}

export async function createWorkout(data: NewWorkout): Promise<{ success: boolean }> {
  const res = await fetch('/api/workouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create workout');
  return res.json();
}
export async function deleteWorkout(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`/api/workouts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete workout");
  }

  return res.json();
}