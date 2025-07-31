import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import type { Workout } from "@/types/workout";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("fitsync");
    const workouts = await db
      .collection<Workout>("workouts")
      .find()
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(workouts);
  } catch (error) {
    console.error("API error in GET /api/workouts:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("fitsync");

  const data: Omit<Workout, "_id"> = await req.json();
  const result = await db.collection("workouts").insertOne(data);

  return NextResponse.json({ success: true, insertedId: result.insertedId });
}