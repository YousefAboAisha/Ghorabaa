// /app/api/missings/visit/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb"; // adjust path as needed
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { missing_id } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const userAgent = req.headers.get("user-agent") || "";
    if (/bot|crawl|preview/i.test(userAgent)) {
      return NextResponse.json({ success: false, reason: "Bot skipped" });
    }

    await db.collection("missings").updateOne(
      { _id: new ObjectId(missing_id) },
      {
        $inc: { visits: 1 },
        $set: { lastVisitedAt: new Date() },
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error logging visit", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
