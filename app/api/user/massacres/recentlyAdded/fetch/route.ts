import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const massacresCollection = db.collection("massacres");

    // ✅ Fetch massacres with status APPROVED (10 recent)
    const massacres = await massacresCollection
      .find({})
      .sort({ createdAt: -1, _id: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(
      {
        message: "تم جلب البيانات بنجاح",
        data: massacres,
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
