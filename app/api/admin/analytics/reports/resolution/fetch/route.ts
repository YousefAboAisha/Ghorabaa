// /app/api/admin/analytics/resolution/fetch/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ReportStatus } from "@/app/enums";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const reports = db.collection("reports");

    const result = await reports
      .aggregate([
        {
          $match: {
            status: { $in: [ReportStatus.KEPT, ReportStatus.DELETED] },
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
      { label: "أبقي عليه", count: 0 },
      { label: "محذوف", count: 0 },
    ];

    result.forEach((item) => {
      if (item._id === ReportStatus.KEPT) {
        formatted[0].count = item.count;
      } else if (item._id === ReportStatus.DELETED) {
        formatted[1].count = item.count;
      }
    });

    return NextResponse.json({ data: formatted });
  } catch (error) {
    console.error("Error fetching report resolution stats:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
