import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

const monthNames = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const stories = db.collection("stories");

    const result = await stories
      .aggregate([
        {
          $addFields: {
            effectiveDate: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$effectiveDate" },
              month: { $month: "$effectiveDate" },
            },
            stories: { $sum: 1 },
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
        date: `${monthNames[monthIndex]} ${item._id.year}`,
        stories: item.stories,
      };
    });

    return NextResponse.json({ data: formatted });
  } catch (error) {
    console.error("Error fetching user growth data:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
