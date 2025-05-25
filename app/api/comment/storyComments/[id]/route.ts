import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

type Params = { id: string };

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing story ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const commentsCollection = db.collection("comments");

    const commentsWithAuthor = await commentsCollection
      .aggregate([
        { $match: { story_id: new ObjectId(id) } },
        { $sort: { createdAt: -1 } }, // newest first
        {
          $lookup: {
            from: "users",
            localField: "author_id",
            foreignField: "_id",
            as: "authorInfo",
          },
        },
        {
          $unwind: {
            path: "$authorInfo",
            preserveNullAndEmptyArrays: true, // Optional
          },
        },
        {
          $project: {
            text: 1,
            createdAt: 1,
            story_id: 1,
            author_id: 1,
            author_name: "$authorInfo.name",
            author_image: "$authorInfo.image",
            author_role: "$authorInfo.role",
          },
        },
      ])
      .toArray();

    return NextResponse.json({ data: commentsWithAuthor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
