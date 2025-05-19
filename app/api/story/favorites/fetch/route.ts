import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const usersCollection = db.collection("users");
    const storiesCollection = db.collection("stories");

    const user = await usersCollection.findOne({ email: token.email });

    if (!user || !user.favoritesArray) {
      return NextResponse.json({ favorites: [] });
    }

    // Ensure all IDs are ObjectId
    const storyIds = user.favoritesArray.map(
      (id: string | mongoose.Types.ObjectId) =>
        typeof id === "string" ? new mongoose.Types.ObjectId(id) : id
    );

    const favoriteStories = await storiesCollection
      .find({ _id: { $in: storyIds } })
      .toArray();

    return NextResponse.json({ data: favoriteStories });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
