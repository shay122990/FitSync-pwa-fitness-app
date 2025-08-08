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
        wgerId: exercise.id,
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
    <div className="bg-gray-800 rounded-md p-3 shadow-sm text-white text-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold">{name}</h3>
        <button
          onClick={handleSave}
          disabled={saved || saving}
          className={`text-xs px-2 py-1 rounded ${
            saved || saving
              ? "bg-purple-500 opacity-50 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {saved ? "Saved" : saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className={`mt-2 text-gray-300 ${expanded ? "" : "line-clamp-3"}`}>
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
    </div>
  );
}
