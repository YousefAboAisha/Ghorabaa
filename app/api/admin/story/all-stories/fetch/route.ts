import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { Role, StoryStatus } from "@/app/enums"; // make sure StoryStatus is imported

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

    // Extract query params
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    // Build the aggregation pipeline
    const pipeline: object[] = [];

    if (status && Object.values(StoryStatus).includes(status as StoryStatus)) {
      pipeline.push({ $match: { status } });
    }

    pipeline.push(
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
          bio: 1,
          image: 1,
          status: 1,
          city: 1,
          neighborhood: 1,
          publisher_id: 1,
          publisher_name: "$publisher.name",
          createdAt: 1,
        },
      }
    );

    const stories = await db
      .collection("stories")
      .aggregate(pipeline)
      .toArray();

    console.log("Fetched stories:", stories);

    return NextResponse.json({ data: stories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
