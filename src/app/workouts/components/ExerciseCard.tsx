"use client";

import { useState } from "react";
import type { ExerciseInfo } from "@/types/workout";

interface Props {
  exercise: ExerciseInfo;
}

export default function ExerciseCard({ exercise }: Props) {
  const [expanded, setExpanded] = useState(false);

  const english = exercise.translations.find((t) => t.language === 2);
  const name = english?.name || "Unnamed";
  const description = english?.description || "No description available.";

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
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-purple-400 text-xs underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
