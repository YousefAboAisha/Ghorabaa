import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { StoryStatus } from "@/app/enums";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const stories = db.collection("stories");
    const comments = db.collection("comments");

    // Aggregate comment counts per story
    const commentCounts = await comments
      .aggregate([
        {
          $group: {
            _id: "$story_id", // Assumes your comment has a `story_id` field
            commentsCount: { $sum: 1 },
          },
        },
      ])
      .toArray();

    // Convert to map for faster lookup
    const commentMap = new Map<string, number>();
    for (const item of commentCounts) {
      commentMap.set(item._id.toString(), item.commentsCount);
    }

    // Fetch all stories (or limit if needed)
    const allStories = await stories
      .find(
        {
          status: StoryStatus.APPROVED, // Only approved stories
        },
        { projection: { name: 1, visits: 1, image: 1, age: 1 } }
      )
      .toArray();

    // Enrich with comment count and compute total
    const enriched = allStories.map((story) => {
      const id = story._id.toString();
      const visits = story.visits || 0;
      const comments = commentMap.get(id) || 0;
      const image = story.image || null;
      const age = story.age || "غير معروف"; // Default to "غير معروف" if age is not set
      return {
        story_id: story._id,
        name: story.name,
        age,
        visits,
        image,
        comments,
        total: visits + comments,
      };
    });

    // Sort by total descending and get top 5
    const top5 = enriched.sort((a, b) => b.total - a.total).slice(0, 10);

    return NextResponse.json({ data: top5 }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trending stories:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
