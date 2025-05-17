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
    const collection = db.collection("users");

    const users = await collection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
