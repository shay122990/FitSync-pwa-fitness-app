import { currentUser } from "@clerk/nextjs/server";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user)
    return <div className="p-6 text-red-500">You must be signed in.</div>;

  const name =
    user.fullName ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    user.primaryEmailAddress?.emailAddress ||
    user.id;

  return (
    <ProfileClient
      name={name}
      userId={user.id}
      email={user.primaryEmailAddress?.emailAddress}
      imageUrl={user.imageUrl}
    />
  );
}
