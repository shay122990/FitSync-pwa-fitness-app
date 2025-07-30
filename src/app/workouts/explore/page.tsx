"use client";

import { useEffect, useState } from "react";
import type { ExerciseInfo } from "@/types/workout";

export default function ExploreWorkouts() {
  const [groupedExercises, setGroupedExercises] = useState<
    Record<string, ExerciseInfo[]>
  >({});

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(
          "https://wger.de/api/v2/exerciseinfo/?language=2&status=2&limit=100"
        );
        const data = await res.json();

        const filtered = data.results.filter((exercise: ExerciseInfo) => {
          const english = exercise.translations.find((t) => t.language === 2);
          return (
            english?.name?.trim() &&
            english?.description?.trim() &&
            exercise.category?.name
          );
        });

        const grouped: Record<string, ExerciseInfo[]> = {};
        filtered.forEach((exercise: ExerciseInfo) => {
          const category = exercise.category.name || "Other";
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(exercise);
        });

        setGroupedExercises(grouped);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchExercises();
  }, []);

  return (
    <main className="p-4 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Explore Exercises by Category</h1>

      {Object.entries(groupedExercises).map(([category, exercises]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">
            {category}
          </h2>
          <ul className="space-y-4">
            {exercises.map((exercise) => {
              const english = exercise.translations.find(
                (t) => t.language === 2
              );
              return (
                <li
                  key={exercise.id}
                  className="bg-gray-800 rounded-lg p-4 shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {english?.name || "Unnamed"}
                  </h3>
                  <div
                    className="text-sm text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html:
                        english?.description || "No description available.",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </main>
  );
}
