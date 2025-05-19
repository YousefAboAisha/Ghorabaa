import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  // ✅ Clone request before passing to getToken or reading the body
  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  // ✅ Authenticate user
  const token = await getToken({ req: nextReq, secret });

  console.log("Token values [server]", token);

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  const { story_id, isFavorite } = await originalReq.json();

  if (!mongoose.Types.ObjectId.isValid(story_id)) {
    return NextResponse.json({ message: "Invalid story ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const usersCollection = db.collection("users");
    const storiesCollection = db.collection("stories");

    const storyObjectId = new ObjectId(story_id);

    // ✅ Update the story status (e.g., mark as isFavorite)
    await storiesCollection.updateOne(
      { _id: storyObjectId },
      { $set: { isFavorite: isFavorite } }
    );

    // ✅ Update the user's favoritesArray
    await usersCollection.updateOne(
      { email: token.email },
      {
        [isFavorite ? "$addToSet" : "$pull"]: { favoritesArray: storyObjectId },
      }
    );

    return NextResponse.json({
      message: isFavorite
        ? "Story added to favorites"
        : "Story removed from favorites",
    });
  } catch (error) {
    console.error("Favorite toggle error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
