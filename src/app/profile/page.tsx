"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-white p-4">Loading...</p>;
  }

  const handleSignIn = () => {
    signIn("email"); // opens the email login form
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      {!session?.user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <button
            onClick={handleSignIn}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded"
          >
            Sign in with Email
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <p className="mb-2">Email: {session.user.email}</p>
          <p className="mb-6">User ID: {session.user.id}</p>

          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
