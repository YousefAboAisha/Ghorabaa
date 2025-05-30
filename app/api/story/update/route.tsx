// /app/api/story/update/route.ts

import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";
import { Role } from "@/app/enums"; // ✅ Import Role enum
import { extractArabicKeywords } from "@/app/lib/extractArabicKeywords";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token || !token.id || !token.role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.id;
    const userRole = token.role;

    const body = await req.json();
    const { _id, publisher_id, bio, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing story ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");

    const existingStory = await storiesCollection.findOne({
      _id: new ObjectId(_id),
    });

    if (!existingStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // ✅ Authorization check: allow publisher or admin
    const isPublisher = existingStory.publisher_id?.toString() === userId;
    const isAdmin = userRole === Role.ADMIN;

    if (!isPublisher && !isAdmin) {
      return NextResponse.json({ error: "Not authorized!" }, { status: 403 });
    }

    let keywords: string[] = [];
    if (bio && typeof bio === "string") {
      try {
        keywords = await extractArabicKeywords(bio);
      } catch (err) {
        console.warn("Keyword extraction failed:", err);
      }
    }

    const updated = await storiesCollection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...updateFields,
          ...(bio && { bio }),
          publisher_id: new ObjectId(publisher_id),
          keywords,
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
