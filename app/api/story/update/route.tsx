// /app/api/story/update/route.ts

import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    console.warn("Token [update story route]", token);

    const userId = token?.id;
    const body = await req.json();
    const { _id, publisher_id, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing story ID" }, { status: 400 });
    }

    console.log("publisher_id", publisher_id);
    console.log("userId", userId);

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");

    const existingStory = await storiesCollection.findOne({
      _id: new ObjectId(_id),
    });

    if (!existingStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    if (
      !existingStory.publisher_id ||
      existingStory.publisher_id.toString() !== userId
    ) {
      return NextResponse.json({ error: "Not authorized!" }, { status: 403 });
    }

    const updated = await storiesCollection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...updateFields,
          status: StoryStatus.PENDING,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Failed to update story" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Story updated successfully",
      data: updated.value,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update story" },
      { status: 500 }
    );
  }
}
