import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  // ✅ Clone request before passing to getToken or reading the body
  const reqForToken = originalReq.clone(); // For auth
  const reqForBody = originalReq.clone(); // For body  const nextReq = new NextRequest(req);

  // ✅ Authenticate user
  const token = await getToken({ req: new NextRequest(reqForToken), secret });

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    const body = await reqForBody.json();
    console.log("Raw request boty:", body);

    const { text, user_id, story_id, author_name, author_image } = body;

    if (!text || !user_id || !story_id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("comments");

    const newComment = {
      text,
      user_id: new ObjectId(user_id), // Convert to ObjectId
      story_id: new ObjectId(story_id), // Convert to ObjectId
      author_name,
      author_image,
      createdAt: new Date(),
    };

    // Check if the user is authenticated
    const result = await collection.insertOne(newComment);

    return NextResponse.json({ success: true, date: result }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
