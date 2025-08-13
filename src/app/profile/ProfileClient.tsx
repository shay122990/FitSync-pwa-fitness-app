"use client";

import Link from "next/link";

interface Props {
  userId: string | null;
  name: string;
}

export default function ProfileClient({ userId, name }: Props) {
  if (!userId) {
    return (
      <div className="p-6 text-red-500">
        You must be signed in to view this page.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Welcome back {name}!</h1>
      <p className="text-gray-400">Your user ID is: {userId}</p>

      <Link
        href="/"
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}
