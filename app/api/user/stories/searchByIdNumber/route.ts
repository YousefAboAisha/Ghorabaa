import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { StoryStatus } from "@/app/enums";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email: token.email });
    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim();

    if (!query) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    const result = await storiesCollection
      .find({
        id_number: query,
        status: { $in: [StoryStatus.IMPORTED, StoryStatus.APPROVED] },
      })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    const storyData = result[0];

    if (!storyData) {
      return NextResponse.json(
        { error: "لم يتم العثور على الشهيد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: storyData }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching story:", error);
    return NextResponse.json({ error: "تعذر الوصول إلى السيرفر" }, { status: 500 });
  }
}
