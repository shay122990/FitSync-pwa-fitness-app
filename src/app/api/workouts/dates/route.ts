import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("fitsync"); 

  const dates = await db
    .collection("workouts")
    .find({ userId })
    .project({ _id: 0, date: 1, performedAt: 1, createdAt: 1 })
    .toArray();

  return NextResponse.json(dates);
}
