import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { MissingStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const missingsCollection = db.collection("missings");
    const usersCollection = db.collection("users");

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status")?.trim();
    const search = searchParams.get("query")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Base query
    const query: Record<string, unknown> = {};

    if (
      status &&
      Object.values(MissingStatus).includes(status as MissingStatus)
    ) {
      query["status"] = status;
    }

    // Search query
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { nickname: { $regex: search, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: {
                $concat: [
                  "$title.first_name",
                  " ",
                  "$title.father_name",
                  " ",
                  "$title.grandFather_name",
                  " ",
                  "$title.last_name",
                ],
              },
              regex: search,
              options: "i",
            },
          },
        },
      ];
    }

    // Get session token for favorites
    const token = await getToken({ req, secret });

    let favoritesArray: ObjectId[] = [];

    if (token?.email) {
      const user = await usersCollection.findOne({ email: token.email });
      favoritesArray = user?.favoritesArray || [];
    }

    // Fetch missings using find instead of aggregate
    const missings = await missingsCollection
      .find(query)
      .sort({ effectiveDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Serialize data and check favorites
    const serializedMissings = missings.map((m) => {
      const isFavorited = favoritesArray.some((favId) =>
        favId.equals ? favId.equals(m._id) : favId === m._id
      );

      return {
        ...m,
        _id: m._id.toString(),
        favorite: isFavorited,
      };
    });

    const total = await missingsCollection.countDocuments(query);
    const hasMore = skip + missings.length < total;

    return NextResponse.json(
      {
        message: "تم جلب البيانات بنجاح",
        data: serializedMissings,
        hasMore,
        total,
        page,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching missings:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
