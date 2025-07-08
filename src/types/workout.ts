 export interface Workout {
  _id?: string; 
  name: string;
  sets: number;
  reps: number;
  duration?: string; 
}

export interface NewWorkout {
  name:string;
  sets: number;
  reps:number;
  duration: string;
}
