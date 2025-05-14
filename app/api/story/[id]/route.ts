import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

type Params = Promise<{ id: string }>;

export async function GET(
  req: NextRequest,
  { params }: { params: Params } // params is a simple object, not a Promise
) {
  try {
    const { id } = await params; // Extract id from params

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("stories");

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
