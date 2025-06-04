import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  const token = await getToken({ req: nextReq, secret });

  if (!token) {
    return NextResponse.json(
      { error: "غير مصرح لك، الرجاء تسجيل الدخول!" },
      { status: 401 }
    );
  }

  const { story_id, isFavorite } = await originalReq.json();

  if (!mongoose.Types.ObjectId.isValid(story_id)) {
    return NextResponse.json({ message: "معرف القصة غير صالح" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const usersCollection = db.collection("users");

    const storyObjectId = new ObjectId(story_id);

    // ✅ Update user's favoritesArray only
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
      favorited: isFavorite,
    });
  } catch (error) {
    console.error("Favorite toggle error:", error);
    return NextResponse.json({ message: "خطأ في السيرفر" }, { status: 500 });
  }
}
