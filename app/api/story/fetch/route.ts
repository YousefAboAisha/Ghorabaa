import { StoryStatus } from "@/app/enums";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("stories");

    // Fetch all stories from the collection with the status of APPROVED
    const stories = await collection
      .find({
        status: StoryStatus.APPROVED,
      })
      .toArray();

    if (!stories) {
      // If no stories are found, return an error
      return NextResponse.json(
        { error: "لم يتم العثور على أي شهداء" }, // No stories found
        { status: 404 }
      );
    }

    // Return the list of stories
    return NextResponse.json(
      { message: "تم جلب البيانات بنجاح", data: stories }, // Data fetched successfully
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب البيانات" }, // An error occurred while fetching data
      { status: 500 }
    );
  }
}
