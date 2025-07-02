// /app/api/admin/analytics/resolution/fetch/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { StoryStatus } from "@/app/enums";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const stories = db.collection("stories");

    const result = await stories
      .aggregate([
        {
          $match: {
            status: { $in: [StoryStatus.APPROVED, StoryStatus.REJECTED] },
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    // Convert to Pie chart-friendly format
    const formatted = [
      { label: "مقبولة", count: 0 },
      { label: "مرفوضة", count: 0 },
    ];

    result.forEach((item) => {
      if (item._id === StoryStatus.APPROVED) {
        formatted[0].count = item.count;
      } else if (item._id === StoryStatus.REJECTED) {
        formatted[1].count = item.count;
      }
    });

    return NextResponse.json({ data: formatted });
  } catch (error) {
    console.error("Error fetching stories resolution stats:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
