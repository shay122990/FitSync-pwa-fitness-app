import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    console.log("Deleting workout with ID:", id);

    if (!id || !ObjectId.isValid(id)) {
      return new NextResponse("Invalid ID format", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("fitsync");
    const result = await db
      .collection("workouts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new NextResponse("Workout not found", { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return new NextResponse("Failed to delete workout", { status: 500 });
  }
}
