// /app/api/stories/visit/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb"; // adjust path as needed
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { event_id } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const userAgent = req.headers.get("user-agent") || "";
    if (/bot|crawl|preview/i.test(userAgent)) {
      return NextResponse.json({ success: false, reason: "Bot skipped" });
    }

    const eventsCollection = db.collection("events");

    await eventsCollection.updateOne(
      { _id: new ObjectId(event_id) },
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
