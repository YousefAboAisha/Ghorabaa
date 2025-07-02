import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const visits = db.collection("visits");

    const result = await visits
      .aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ])
      .toArray();

    // Format the result into the structure needed for the chart
    const formatted = result.map((item) => {
      const date = new Date(item._id.year, item._id.month - 1);
      const month = date.toLocaleString("ar-EG", {
        month: "short",
        year: "numeric",
      });

      return {
        date: month,
        visits: item.count,
      };
    });

    return NextResponse.json({ data: formatted });
  } catch (error) {
    console.error("Error fetching monthly visits:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
