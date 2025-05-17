import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

type Params = Promise<{ id: string }>;

export async function GET(
  req: NextRequest,
  { params }: { params: Params } // params is a simple object, not a Promise
) {
  try {
    const { id } = await params; // Extract id from params

    if (!id) {
      return NextResponse.json({ error: "Missing story ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("comments");

    const comments = await collection
      .find({ user_id: new ObjectId(id) })
      .sort({ createdAt: -1 }) // Optional: newest first
      .toArray();

    return NextResponse.json({ data: comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
