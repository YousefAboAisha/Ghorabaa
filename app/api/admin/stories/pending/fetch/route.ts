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

    const stories = await db
      .collection("stories")
      .aggregate([
        {
          $match: { status: StoryStatus.PENDING }, // ✅ Only pending stories
        },
        {
          $lookup: {
            from: "users",
            localField: "publisher_id",
            foreignField: "_id",
            as: "publisher",
          },
        },
        {
          $unwind: "$publisher",
        },
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
        },
      ])
      .toArray();

    return NextResponse.json({ data: stories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
