import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const storiesCollection = db.collection("stories");
  const usersCollection = db.collection("users");

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    // Get session token
    const token = await getToken({ req, secret });
    let favoritesArray: string[] = [];

    if (token?.email) {
      const user = await usersCollection.findOne({ email: token.email });
      favoritesArray = (user?.favoritesArray || []).map((id: ObjectId) =>
        id.toString()
      );
    }

    // Build the match stage with regex search
    const matchStage: Record<string, unknown> = {
      status: StoryStatus.APPROVED,
      $or: [
        { "name.first_name": { $regex: query, $options: "i" } },
        { "name.father_name": { $regex: query, $options: "i" } },
        { "name.grandFather_name": { $regex: query, $options: "i" } },
        { "name.last_name": { $regex: query, $options: "i" } },
        { nickname: { $regex: query, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: {
                $concat: [
                  "$name.first_name",
                  " ",
                  "$name.father_name",
                  " ",
                  "$name.grandFather_name",
                  " ",
                  "$name.last_name",
                ],
              },
              regex: query,
              options: "i",
            },
          },
        },
      ],
    };

    // Create text score for sorting (simulating search relevance)
    const pipeline = [
      { $match: matchStage },
      {
        $addFields: {
          fullName: {
            $concat: [
              "$name.first_name",
              " ",
              "$name.father_name",
              " ",
              "$name.grandFather_name",
              " ",
              "$name.last_name",
            ],
          },
          // Create a simple relevance score based on field matches
          score: {
            $add: [
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$name.first_name",
                      regex: query,
                      options: "i",
                    },
                  },
                  4,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$name.last_name",
                      regex: query,
                      options: "i",
                    },
                  },
                  3,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$nickname",
                      regex: query,
                      options: "i",
                    },
                  },
                  3,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$name.father_name",
                      regex: query,
                      options: "i",
                    },
                  },
                  2,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$name.grandFather_name",
                      regex: query,
                      options: "i",
                    },
                  },
                  1,
                  0,
                ],
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          fullName: 1,
          nickname: 1,
          image: 1,
          bio: 1,
          city: 1,
          age: 1,
          neighborhood: 1,
          birth_date: 1,
          death_date: 1,
          score: 1,
        },
      },
      { $sort: { score: -1, fullName: 1 } },
      { $limit: 50 },
    ];

    const data = await storiesCollection.aggregate(pipeline).toArray();

    // Add favorite field
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
