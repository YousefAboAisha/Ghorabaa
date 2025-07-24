import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
// import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  // This user ID
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });
  }

  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json(
        { error: "غير مصرح لك، الرجاء تسجيل الدخول!" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const commentsCollection = db.collection("comments");

    const commentsWithAuthor = await commentsCollection
      .aggregate([
        { $match: { author_id: new ObjectId(id) } },
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
            author_email: "$authorInfo.email",
          },
        },
      ])
      .toArray();

    return NextResponse.json({ data: commentsWithAuthor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
