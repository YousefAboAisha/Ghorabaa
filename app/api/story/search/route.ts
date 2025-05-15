import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const collection = db.collection("stories");

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  console.log("Search Query", query);

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const data = await collection
      .aggregate([
        {
          $search: {
            index: "default", // 🔍 MongoDB Atlas Search index name
            text: {
              query: query,
              path: ["name", "bio"], // Fields to search
            },
          },
        },
        {
          $limit: 20,
        },
        {
          $project: {
            _id: 1,
            name: 1,
            image: 1,
            bio: 1,
            birth_date: 1,
            death_date: 1,
          },
        },
      ])
      .toArray();

    console.error("Result Data", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Error searching stories" },
      { status: 500 }
    );
  }
}
