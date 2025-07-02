import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const visits = db.collection("visits");

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const { path, referrer } = await req.json();

    // Optional: prevent duplicate visits in same session by IP+path+date
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const existing = await visits.findOne({
      ip,
      path,
      createdAt: { $gte: startOfDay },
    });

    if (existing) {
      return NextResponse.json({ message: "Visit already recorded today." });
    }

    await visits.insertOne({
      ip,
      userAgent,
      path,
      referrer,
      createdAt: now,
    });

    return NextResponse.json({ message: "Visit recorded" });
  } catch (error) {
    console.error("Failed to record visit:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
