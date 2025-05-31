// app/api/stories/all/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const reportsCollection = db.collection("reports");
    const token = await getToken({ req, secret });

    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const reports = await reportsCollection
      .aggregate([
        {
          $lookup: {
            from: "stories",
            localField: "user_id",
            foreignField: "publisher_id",
            as: "story",
          },
        },
        {
          $unwind: {
            path: "$story",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            reason: 1,
            details: 1,
            status: 1,
            content_id: 1,
            content_type: 1,
            createdAt: 1,
            content_name: "$story.name",
          },
        },
      ])
      .toArray();

    return NextResponse.json({ data: reports }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
