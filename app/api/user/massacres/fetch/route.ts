import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const massacresCollection = db.collection("massacres");

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Base query
    const query: Record<string, unknown> = { status };

    if (!status) {
      return NextResponse.json({ error: "معرف الحالة مفقود" }, { status: 400 });
    }

    // ✅ Fetch massacres with pagination
    const massacres = await massacresCollection
      .find(query)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await massacresCollection.countDocuments(query);
    const hasMore = skip + massacres.length < total;

    return NextResponse.json(
      {
        message: "تم جلب البيانات بنجاح",
        data: massacres,
        hasMore,
        total,
        page,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching massacres:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
