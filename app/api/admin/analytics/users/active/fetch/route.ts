import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const stories = db.collection("stories");
    const comments = db.collection("comments");
    const users = db.collection("users");

    // 1. Aggregate stories per user
    const storyCounts = await stories
      .aggregate([
        {
          $group: {
            _id: "$publisher_id", // Use publisher_id for stories
            storiesCount: { $sum: 1 },
          },
        },
      ])
      .toArray();

    // 2. Aggregate comments per user
    const commentCounts = await comments
      .aggregate([
        {
          $group: {
            _id: "$author_id", // Use user_id for comments
            commentsCount: { $sum: 1 },
          },
        },
      ])
      .toArray();

    // 3. Merge both into a single map
    const activityMap = new Map<
      string,
      {
        user_id: ObjectId;
        stories: number;
        comments: number;
        total: number;
      }
    >();

    for (const story of storyCounts) {
      if (!story._id) continue; // skip null users
      const key = story._id.toString();
      activityMap.set(key, {
        user_id: story._id,
        stories: story.storiesCount,
        comments: 0,
        total: story.storiesCount,
      });
    }

    for (const comment of commentCounts) {
      if (!comment._id) continue;
      const key = comment._id.toString();
      if (activityMap.has(key)) {
        const user = activityMap.get(key)!;
        user.comments = comment.commentsCount;
        user.total += comment.commentsCount;
      } else {
        activityMap.set(key, {
          user_id: comment._id,
          stories: 0,
          comments: comment.commentsCount,
          total: comment.commentsCount,
        });
      }
    }

    // 4. Fetch user info for top 10
    const sorted = Array.from(activityMap.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    // 5. Project [name, email and image] from the user's object
    const user_ids = sorted.map((u) => u.user_id);
    const userDetails = await users
      .find({ _id: { $in: user_ids } })
      .project({
        name: 1,
        email: 1,
        image: 1,
      })
      .toArray();

    // 6. Attach user details
    const enriched = sorted.map((u) => {
      const user = userDetails.find(
        (usr) => usr._id.toString() === u.user_id.toString()
      );
      return {
        user_id: u.user_id,
        name: user?.name || "مستخدم غير معروف",
        email: user?.email || "",
        image: user?.image || null,
        stories: u.stories,
        comments: u.comments,
        total: u.total,
      };
    });

    return NextResponse.json({ data: enriched });
  } catch (error) {
    console.error("Error fetching most active users:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
