import { auth } from "@clerk/nextjs/server";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const { userId } = await auth();
  return <ProfileClient userId={userId} />;
}
