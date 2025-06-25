import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role, StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const storiesCollection = db.collection("stories");

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  console.log("Search Query", query);

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  const token = await getToken({ req, secret });

  if (!token || token.role !== Role.ADMIN) {
    return NextResponse.json(
      { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
      { status: 403 }
    );
  }

  try {
    // ✅ Fetch search results
    const data = await storiesCollection
      .aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: query,
              path: ["name", "bio"],
            },
          },
        },
        {
          $match: { status: StoryStatus.APPROVED }, // ✅ Only pending stories
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
