"use client";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome back {name}!</h1>
      <p className="mt-2 text-gray-400">Your user ID is: {userId}</p>
    </div>
  );
}
