"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import type { ExerciseInfo } from "@/types/workout";
import { createWorkout } from "@/lib/api";

interface Props {
  exercise: ExerciseInfo;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Failed to save workout";
}

export default function ExerciseCard({ exercise }: Props) {
  const { user, isLoaded } = useUser();
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const english = exercise.translations.find((t) => t.language === 2);
  const name = english?.name || "Unnamed";
  const description = english?.description || "No description available.";

  const handleSave = async () => {
    if (saved || saving) return;
    if (!user?.id) {
      setErr("You need to sign in to save workouts.");
      return;
    }

    setSaving(true);
    setErr(null);
    try {
      await createWorkout(user.id, {
        wgerId: exercise.id,
        name,
        sets: 3,
        reps: 10,
      });
      setSaved(true);
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      setErr(message);
      console.error("Failed to save workout:", message);
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
          disabled={saved || saving || !isLoaded || !user?.id}
          className={`text-xs px-2 py-1 rounded ${
            saved || saving || !user?.id
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

      {err && <p className="mt-2 text-xs text-red-400">{err}</p>}
    </div>
  );
}
