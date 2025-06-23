import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { Role, StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const token = await getToken({ req, secret });

    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Build match stage
    const matchStage: Record<string, unknown> = {};
    if (status && Object.values(StoryStatus).includes(status as StoryStatus)) {
      matchStage.status = status;
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "users",
          localField: "publisher_id",
          foreignField: "_id",
          as: "publisher",
        },
      },
      { $unwind: "$publisher" },
      {
        $project: {
          _id: 1,
          name: 1,
          nickname: 1,
          social_media: 1,
          bio: 1,
          image: 1,
          status: 1,
          city: 1,
          neighborhood: 1,
          publisher_id: 1,
          publisher_name: "$publisher.name",
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];

    // Count total documents separately for pagination metadata
    const totalDocs = await db.collection("stories").countDocuments(matchStage);

    const stories = await db
      .collection("stories")
      .aggregate(pipeline)
      .toArray();

    return NextResponse.json(
      {
        data: stories,
        pagination: {
          total: totalDocs,
          page,
          limit,
          totalPages: Math.ceil(totalDocs / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ error: "تعذر الوصول إلى السيرفر" }, { status: 500 });
  }
}
