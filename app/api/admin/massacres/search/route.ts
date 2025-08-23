import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const massacreCollection = db.collection("massacres");

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json([], { status: 200 });
  }

  const token = await getToken({ req, secret });

  if (!token || token.role === Role.USER) {
    return NextResponse.json(
      { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
      { status: 403 }
    );
  }

  try {
    const data = await massacreCollection
      .aggregate([
        {
          $search: {
            index: "massacre",
            compound: {
              should: [
                {
                  text: {
                    query,
                    path: "title",
                    fuzzy: { maxEdits: 1, prefixLength: 2 },
                    score: { boost: { value: 3 } },
                  },
                },
              ],
            },
            highlight: {
              path: ["title"],
            },
          },
        },
        {
          $addFields: {
            highlights: { $meta: "searchHighlights" },
            score: { $meta: "searchScore" },
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            cover_image: 1,
            location: 1,
            highlight: { $meta: "searchHighlights" },
          },
        },
        {
          $sort: {
            score: -1,
          },
        },
        { $limit: 20 },
      ])
      .toArray();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
