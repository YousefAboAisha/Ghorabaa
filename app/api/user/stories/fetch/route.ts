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

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // ✅ Filters
    const gender = searchParams.get("gender")?.trim();
    const ageFrom = parseInt(searchParams.get("ageFrom") || "", 10);
    const ageTo = parseInt(searchParams.get("ageTo") || "", 10);
    const city = searchParams.get("city")?.trim();
    const neighborhood = searchParams.get("neighborhood")?.trim();

    // Base query
    const query: Record<string, unknown> = { status };

    // ✅ Add filters if present
    if (gender) query["gender"] = gender;
    if (!isNaN(ageFrom)) {
      query["age"] = { ...(query["age"] || {}), $gte: ageFrom };
    }
    if (!isNaN(ageTo)) {
      query["age"] = { ...(query["age"] || {}), $lte: ageTo };
    }
    if (city) query["city"] = city;
    if (neighborhood) query["neighborhood"] = neighborhood;

    if (!status) {
      return NextResponse.json({ error: "معرف الحالة مفقود" }, { status: 400 });
    }

    // ✅ Get session token
    const token = await getToken({ req, secret });

    let favoritesArray: ObjectId[] = [];

    if (token?.email) {
      const user = await usersCollection.findOne({ email: token.email });
      favoritesArray = user?.favoritesArray || [];
    }

    // ✅ Fetch stories with pagination
    const stories = await storiesCollection
      .find(query)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const serializedStories = stories.map((s) => {
      const isFavorited = favoritesArray.some((favId) =>
        favId.equals ? favId.equals(s._id) : favId === s._id
      );

      return {
        ...s,
        _id: s._id.toString(),
        favorite: isFavorited,
      };
    });

    const total = await storiesCollection.countDocuments(query);
    const hasMore = skip + stories.length < total;

    return NextResponse.json(
      {
        message: "تم جلب البيانات بنجاح",
        data: serializedStories,
        hasMore,
        total,
        page,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
