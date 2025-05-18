// /app/api/story/fetch/route.ts
import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("stories");

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    if (!status) {
      return NextResponse.json(
        { error: "معامل الحالة مفقود" },
        { status: 400 }
      );
    }

    const query = { status };

    const stories = await collection
      .find(query)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const serializedStories = stories.map((s) => ({
      ...s,
      _id: s._id.toString(),
    }));

    const total = await collection.countDocuments(query);
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
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب البيانات" },
      { status: 500 }
    );
  }
}
