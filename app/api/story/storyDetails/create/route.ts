import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  const token = await getToken({ req: nextReq, secret });

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("stories");

    const body = await originalReq.json();
    const { story_id, ...rest } = body;

    if (!story_id) {
      return NextResponse.json(
        { error: "Story ID is required." },
        { status: 400 }
      );
    }

    const existingStory = await collection.findOne({
      _id: new ObjectId(story_id),
    });

    if (!existingStory) {
      return NextResponse.json({ error: "Story not found." }, { status: 404 });
    }

    const updatedFields = {
      ...rest,
      publisher_id: new ObjectId(token.id),
      status: StoryStatus.PENDING,
      hasCompleteProfile: true,
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(story_id) },
      { $set: updatedFields }
    );

    const updatedStory = await collection.findOne({
      _id: new ObjectId(story_id),
    });

    return NextResponse.json(
      { message: "Story updated", data: updatedStory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating story:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تعديل بيانات الشهيد." },
      { status: 500 }
    );
  }
}
