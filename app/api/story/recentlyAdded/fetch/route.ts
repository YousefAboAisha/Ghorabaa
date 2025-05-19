import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const usersCollection = db.collection("users");

    // ✅ Get session token
    const token = await getToken({ req, secret });

    console.log("Recenlty added [token]", token);

    let favoritesArray: string[] = [];

    if (token?.email) {
      const user = await usersCollection.findOne({ email: token.email });
      favoritesArray = (user?.favoritesArray || []).map((id: ObjectId) =>
        id.toString()
      );
    }

    // ✅ Fetch stories with status APPROVED (10 recent)
    const stories = await storiesCollection
      .find({ status: StoryStatus.APPROVED })
      .sort({ createdAt: -1, _id: -1 })
      .limit(10)
      .toArray();

    // ✅ Add "favorite" boolean
    const serializedStories = stories.map((s) => {
      const isFavorite = favoritesArray.includes(s._id.toString());
      // Debug log: compare story id and favoritesArray
      console.log(
        `Story ID: ${s._id.toString()}, Is Favorite: ${isFavorite}, Favorites: ${JSON.stringify(
          favoritesArray
        )}`
      );
      return {
        ...s,
        _id: s._id.toString(),
        favorite: isFavorite,
      };
    });

    return NextResponse.json(
      {
        message: "تم جلب البيانات بنجاح",
        data: serializedStories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب البيانات" },
      { status: 500 }
    );
  }
}
