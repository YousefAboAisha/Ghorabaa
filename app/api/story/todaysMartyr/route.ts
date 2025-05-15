// import { StoryStatus } from "@/app/enums";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("stories");

    // Use aggregation to sample a single random user
    const [randomStory] = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    console.log("Random User:", randomStory);

    if (!randomStory) {
      return NextResponse.json(
        { error: "لم يتم العثور على مستخدمين" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "تم جلب قصة عشوائية بنجاح", data: randomStory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching random user story:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب البيانات" },
      { status: 500 }
    );
  }
}
