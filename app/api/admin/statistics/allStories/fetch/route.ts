// app/api/stories/statistics/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { StoryStatus } from "@/app/enums";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");

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
        storiesCollection.countDocuments({
          status,
          createdAt: { $gte: startOfToday },
        }),
        storiesCollection.countDocuments({
          status,
          createdAt: { $gte: startOfWeek },
        }),
        storiesCollection.countDocuments({
          status,
          createdAt: { $gte: startOfMonth },
        }),
        storiesCollection.countDocuments({ status }),
      ]);

      data[status.toUpperCase()] = {
        today,
        week,
        month,
        total,
      };
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("📊 Error fetching statistics:", error);
    return NextResponse.json(
      { error: "فشل في استرجاع إحصائيات القصص" },
      { status: 500 }
    );
  }
}
