"use client";

import { useState } from "react";
import type { ExerciseInfo } from "@/types/workout";
import { createWorkout } from "@/lib/api";

interface Props {
  exercise: ExerciseInfo;
}

export default function ExerciseCard({ exercise }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const english = exercise.translations.find((t) => t.language === 2);
  const name = english?.name || "Unnamed";
  const description = english?.description || "No description available.";

  const handleSave = async () => {
    if (saved || saving) return;

    setSaving(true);
    try {
      await createWorkout({
        name,
        sets: 3,
        reps: 10,
      });
      setSaved(true);
    } catch (err) {
      console.error("Failed to save workout", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded p-3 shadow-sm">
      <h3 className="text-md font-semibold mb-1">{name}</h3>

      <div
        className={`text-sm text-gray-300 transition-all duration-300 ease-in-out ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>

      {description.length > 120 && (
        <button
          className="mt-1 text-purple-400 text-xs underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}

      <button
        onClick={handleSave}
        disabled={saved || saving}
        className={`mt-3 inline-block px-3 py-1 text-xs font-medium rounded bg-purple-600 hover:bg-purple-700 text-white ${
          saved ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {saved ? "Saved" : saving ? "Saving..." : "Save to Workouts"}
      </button>
    </div>
  );
}
