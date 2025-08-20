// app/api/user/stories/check-id-validity/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id_numberParam = searchParams.get("id_number");

    if (!id_numberParam) {
      return NextResponse.json(
        { error: "id_number is required" },
        { status: 400 }
      );
    }

    const id_number = Number(id_numberParam);

    if (isNaN(id_number)) {
      return NextResponse.json(
        { error: "id_number must be a number" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const story = await storiesCollection.findOne({ id_number });

    if (story) {
      return NextResponse.json({
        _id: story._id,
        exists: true,
      });
    }

    return NextResponse.json({ exists: false });
  } catch (err) {
    console.error("Error checking id_number:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
