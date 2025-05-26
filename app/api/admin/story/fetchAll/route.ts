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
          $lookup: {
            from: "users",
            localField: "publisher_id",
            foreignField: "_id",
            as: "publisher",
          },
        },
        {
          $unwind: "$publisher", // assume each story has exactly one publisher
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
            publisher_name: "$publisher.name", // include only the name from the user
            createdAt: 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json({ data: stories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
