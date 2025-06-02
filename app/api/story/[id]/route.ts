import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

type Params = Promise<{ story_id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { story_id } = await params;

    // Validate id first:
    if (!ObjectId.isValid(story_id)) {
      // If id is invalid format, immediately return 404
      return NextResponse.json(
        { error: "معرف الشهيد غير صالح" },
        { status: 404 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");

    // Check if story exists and is approved
    const result = await storiesCollection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(story_id),
            status: StoryStatus.APPROVED,
            hasCompleteProfile: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "publisher_id",
            foreignField: "_id",
            as: "publisher",
          },
        },
        {
          $unwind: {
            path: "$publisher",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            id_number: 1,
            image: 1,
            name: 1,
            nickname: 1,
            birth_date: 1,
            death_date: 1,
            city: 1,
            neighborhood: 1,
            bio: 1,
            status: 1,
            keywords: 1,
            createdAt: 1,
            publisher_id: 1,
            publisherName: "$publisher.name",
          },
        },
      ])
      .toArray();

    const data = result[0];

    if (!data) {
      return NextResponse.json(
        { error: "لم يتم العثور على الشهيد" },
        { status: 404 }
      );
    }

    if (data.status !== StoryStatus.APPROVED) {
      return NextResponse.json(
        { error: "القصة قيد المراجعة حالياً، ولم يتم نشرها بعد!" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in aggregation:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب البيانات" },
      { status: 500 }
    );
  }
}
