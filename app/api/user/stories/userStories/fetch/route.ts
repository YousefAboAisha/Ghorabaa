import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const usersCollection = db.collection("users");

    const token = await getToken({ req, secret });

    let favoritesArray: string[] = [];

    if (token?.email) {
      const user = await usersCollection.findOne({ email: token.email });
      favoritesArray = (user?.favoritesArray || []).map((id: ObjectId) =>
        id.toString()
      );
    }

    const user = await usersCollection.findOne({ email: token?.email });

    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    // ✅ Read status from query param
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim();

    // ✅ Build query
    const query: Record<string, unknown> = {
      publisher_id: new ObjectId(user._id),
    };
    if (status) query.status = status;

    // ✅ Fetch user stories with optional status filter
    const stories = await storiesCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const serializedStories = stories.map((s) => {
      const isFavorite = favoritesArray.includes(s._id.toString());
      // Debug log: compare story id and favoritesArray
      console.log(
        `Story ID: ${s._id.toString()}, Is Favorite: ${isFavorite}, Favorites: ${JSON.stringify(
          favoritesArray
        )}`
      );
      return {
        ...s,
        _id: s._id.toString(),
        favorite: isFavorite,
      };
    });

    return NextResponse.json(
      { message: "تم جلب القصص بنجاح", data: serializedStories },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
