"use client";

import { useEffect, useState } from "react";
// import { createWorkout } from "@/lib/api";
import type { ExerciseInfo } from "@/types/workout";
// import Image from "next/image";

export default function ExploreWorkouts() {
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);
  //   const [loading, setLoading] = useState(true);
  //   const [saving, setSaving] = useState<number | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(
          "https://wger.de/api/v2/exerciseinfo/?language=2&status=2&limit=20"
        );

        const data = await res.json();
        console.log("Raw Wger data:", data);

        setExercises(data.results); // ← no filter
      } catch (err) {
        console.error("Error fetching exercises:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  //   const handleSave = async (exercise: ExerciseInfo) => {
  //     setSaving(exercise.id);
  //     try {
  //       await createWorkout({
  //         name: exercise.name,
  //         sets: 3,
  //         reps: 10,
  //         duration: "30 mins",
  //       });
  //       alert("Workout saved!");
  //     } catch {
  //       alert("Failed to save workout.");
  //     } finally {
  //       setSaving(null);
  //     }
  //   };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Explore Exercises</h1>

      {exercises.map((exercise) => {
        const english = exercise.translations.find((t) => t.language === 2); // language=2 is English
        const name = english?.name || exercise.category?.name || "Unnamed";
        const description = english?.description || "No description available.";

        return (
          <li
            key={exercise.id}
            className="bg-gray-800 text-white rounded-lg p-4 shadow"
          >
            <h2 className="text-lg font-semibold mb-2">{name}</h2>

            <div
              className="text-sm text-gray-200"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </li>
        );
      })}
    </main>
  );
}
