import { StoryStatus } from "@/app/enums";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("stories");

    // Filter first, then randomly sample one story
    const [randomStory] = await collection
      .aggregate([
        {
          $match: {
            status: StoryStatus.APPROVED,
          },
        },
        { $sample: { size: 1 } },
      ])
      .toArray();

    console.log("Random Approved Story:", randomStory);

    if (!randomStory) {
      return NextResponse.json(
        { error: "لم يتم العثور على قصة عشوائية" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "تم جلب قصة عشوائية بنجاح", data: randomStory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching random approved story:", error);
    return NextResponse.json({ error: "تعذر الوصول إلى السيرفر" }, { status: 500 });
  }
}
