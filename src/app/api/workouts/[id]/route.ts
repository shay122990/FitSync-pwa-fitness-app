import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    console.log("🔍 DELETE workout", id);

    if (!ObjectId.isValid(id)) {
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
    console.error("❌ DELETE /api/workouts/[id] error:", error);
    return new NextResponse(`Failed to delete: ${error}`, { status: 500 });
  }
}
