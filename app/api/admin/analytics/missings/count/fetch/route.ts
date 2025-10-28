// app/api/missings/statistics/count/fetch/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { StoryStatus } from "@/app/enums";

export async function GET() {
  async function countByDate(
    collection: import("mongodb").Collection<import("mongodb").Document>,
    status: string,
    date: Date
  ): Promise<number> {
    const result = await collection
      .aggregate([
        {
          $match: { status },
        },
        {
          $addFields: {
            effectiveDate: {
              $ifNull: ["$updatedAt", "$createdAt"],
            },
          },
        },
        {
          $match: {
            effectiveDate: { $gte: date },
          },
        },
        {
          $count: "count",
        },
      ])
      .toArray();

    return result[0]?.count || 0;
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const missingsCollection = db.collection("missings");

    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const startOfMonth = new Date();
    startOfMonth.setMonth(startOfMonth.getMonth() - 1);

    const statuses = [
      StoryStatus.APPROVED,
      StoryStatus.PENDING,
      StoryStatus.REJECTED,
    ];

    const data: Record<
      string,
      { today: number; week: number; month: number; total: number }
    > = {};

    for (const status of statuses) {
      const [today, week, month, total] = await Promise.all([
        countByDate(missingsCollection, status, startOfToday),
        countByDate(missingsCollection, status, startOfWeek),
        countByDate(missingsCollection, status, startOfMonth),
        missingsCollection.countDocuments({ status }),
      ]);

      data[status.toUpperCase()] = { today, week, month, total };
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("📊 Error fetching statistics:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
