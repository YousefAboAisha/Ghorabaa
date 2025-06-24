// /app/api/stats/user-growth/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

const monthNames = [
  "يناير", // January
  "فبراير", // February
  "مارس", // March
  "أبريل", // April
  "مايو", // May
  "يونيو", // June
  "يوليو", // July
  "أغسطس", // August
  "سبتمبر", // September
  "أكتوبر", // October
  "نوفمبر", // November
  "ديسمبر", // December
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const users = db.collection("users");

    const result = await users
      .aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            users: { $sum: 1 },
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
        users: item.users,
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
