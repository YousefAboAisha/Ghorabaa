import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("martyrs");

    const martyr = await collection.findOne({
      _id: new ObjectId(id),
      status: StoryStatus.APPROVED,
    });
    if (!martyr) {
      return NextResponse.json({ error: "Martyr not found" }, { status: 404 });
    }

    return NextResponse.json(martyr, { status: 200 });
  } catch (error) {
    console.error("Error fetching martyr:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
