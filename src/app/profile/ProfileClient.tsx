"use client";

import Link from "next/link";
import Image from "next/image";

interface Props {
  userId: string | null;
  name: string;
  email?: string | null;
  imageUrl?: string | null;
}

export default function ProfileClient({
  userId,
  name,
  email,
  imageUrl,
}: Props) {
  if (!userId) {
    return (
      <div className="p-6 text-red-500">
        You must be signed in to view this page.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 mt-10">
      <div className="flex items-center gap-4">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={60}
            height={60}
            className="rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {name}!</h1>
          {email && <p className="text-gray-400">{email}</p>}
          <p className="text-gray-400 text-sm">User ID: {userId}</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link
          href="/"
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-purple-700"
        >
          Home
        </Link>
        <Link
          href="/workouts"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
        >
          Workouts
        </Link>
      </div>
    </div>
  );
}
