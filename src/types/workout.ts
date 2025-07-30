// For your local MongoDB workouts
export interface Workout {
  _id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: string;
}

// For creating new workouts (no _id yet)
export interface NewWorkout {
  name: string;
  sets: number;
  reps: number;
  duration?: string;
}

// For fetching exercise info from Wger API
// types/wger.ts
export interface ExerciseInfo {
  id: number;
  category: {
    id: number;
    name: string;
  };
  translations: {
    name: string;
    description: string;
    language: number;
  }[];
}





