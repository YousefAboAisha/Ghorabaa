// /app/api/stats/report-growth/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

const monthNames = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const reports = db.collection("reports");

    const result = await reports
      .aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            reports: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ])
      .toArray();

    const formatted = result.map((item) => {
      const monthIndex = item._id.month - 1;
      return {
        date: `${monthNames[monthIndex]}`,
        reports: item.reports,
      };
    });

    return NextResponse.json({ data: formatted });
  } catch (error) {
    console.error("Error fetching report growth data:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
