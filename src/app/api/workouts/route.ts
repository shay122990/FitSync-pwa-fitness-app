import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import type { Workout } from "@/types/workout";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("Missing userId", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("fitsync");

    const workouts = await db
      .collection<Workout>("workouts")
      .find({ userId })
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(workouts);
  } catch (error) {
    console.error("GET /api/workouts error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("fitsync");

    const data: Omit<Workout, "_id"> = await req.json();

    if (!data.userId) {
      return new NextResponse("Missing userId", { status: 400 });
    }

    const result = await db.collection("workouts").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST /api/workouts error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}