import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { StoryStatus } from "@/app/enums"; // Make sure this includes APPROVED, PENDING, REJECTED

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const stories = db.collection("stories");

    const statusCounts = await stories
      .aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const result = {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    };

    for (const status of statusCounts) {
      const s = status._id;
      const count = status.count;
      result.total += count;

      if (s === StoryStatus.APPROVED) result.approved = count;
      else if (s === StoryStatus.PENDING) result.pending = count;
      else if (s === StoryStatus.REJECTED) result.rejected = count;
    }

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching story counts:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
