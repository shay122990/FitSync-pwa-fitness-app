import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const userId = url.searchParams.get("userId");

    if (!id || !ObjectId.isValid(id)) {
      return new NextResponse("Invalid ID format", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Missing userId", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("fitsync");

    const result = await db.collection("workouts").deleteOne({
      _id: new ObjectId(id),
      userId: userId, 
    });

    if (result.deletedCount === 0) {
      return new NextResponse("Workout not found or does not belong to user", { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/workouts/[id] error:", error);
    return new NextResponse("Failed to delete workout", { status: 500 });
  }
}
