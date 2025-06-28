import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const collection = db.collection("stories");
  const usersCollection = db.collection("users");

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  console.log("Search Query", query);

  if (!query || query.length < 2) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    // ✅ Get session token
    const token = await getToken({ req, secret });

    let favoritesArray: string[] = [];

    if (token?.email) {
      const user = await usersCollection.findOne({ email: token.email });
      favoritesArray = (user?.favoritesArray || []).map((id: ObjectId) =>
        id.toString()
      );
    }

    // ✅ Fetch search results
    const data = await collection
      .aggregate([
        {
          $search: {
            index: "default",
            compound: {
              should: [
                {
                  text: {
                    query,
                    path: ["name", "nickname"], // <-- add "nickname" here
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 3,
                    },
                    score: { boost: { value: 3 } },
                  },
                },
              ],
            },
            highlight: { path: ["name", "nickname"] },
          },
        },
        {
          $match: {
            status: StoryStatus.APPROVED,
          },
        },
        {
          $addFields: {
            score: { $meta: "searchScore" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            nickname: 1,
            image: 1,
            bio: 1,
            highlight: { $meta: "searchHighlights" },
            birth_date: 1,
            death_date: 1,
          },
        },
        {
          $sort: {
            score: -1,
          },
        },
      ])
      .toArray();

    // ✅ Add "favorite" field
    const serialized = data.map((story) => ({
      ...story,
      _id: story._id.toString(),
      favorite: favoritesArray.includes(story._id.toString()),
    }));

    return NextResponse.json({ data: serialized }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
