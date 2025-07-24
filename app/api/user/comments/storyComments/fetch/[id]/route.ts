import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5"); // Default to 5 comments per load

    if (!id) {
      return NextResponse.json(
        { error: "معرف القصة غير موجود!" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const commentsCollection = db.collection("comments");

    const skip = (page - 1) * limit;

    const commentsWithAuthor = await commentsCollection
      .aggregate([
        { $match: { story_id: new ObjectId(id) } },
        { $sort: { createdAt: -1 } }, // newest first
        { $skip: skip },
        { $limit: limit },
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

    // Get total count for pagination
    const totalComments = await commentsCollection.countDocuments({
      story_id: new ObjectId(id),
    });

    return NextResponse.json(
      {
        data: commentsWithAuthor,
        total: totalComments,
        page,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
