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
    <main className="p-4 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Explore Exercises by Category
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(groupedExercises).map(([category, exercises]) => (
          <div key={category} className="bg-gray-900 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-3 text-purple-400">
              {category}
            </h2>
            <div className="h-80 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {exercises.map((exercise) => {
                const english = exercise.translations.find(
                  (t) => t.language === 2
                );
                return (
                  <div
                    key={exercise.id}
                    className="bg-gray-800 rounded p-3 shadow-sm"
                  >
                    <h3 className="text-md font-semibold mb-1">
                      {english?.name || "Unnamed"}
                    </h3>
                    <div
                      className="text-sm text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html:
                          english?.description || "No description available.",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
