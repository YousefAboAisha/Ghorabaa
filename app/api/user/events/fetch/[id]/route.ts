import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    // Validate id first:
    if (!ObjectId.isValid(id)) {
      // If id is invalid format, immediately return 404
      return NextResponse.json(
        { error: "معرف الشهيد غير صالح" },
        { status: 404 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const eventsCollection = db.collection("events");

    // Check if story exists and is approved
    const result = await eventsCollection
      .find({
        _id: new ObjectId(id),
      })
      .toArray();

    const data = result[0];

    if (!data) {
      return NextResponse.json(
        { error: "لم يتم العثور على تفاصيل المجزرة" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error while fetching:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
