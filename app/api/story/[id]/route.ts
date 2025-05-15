import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { StoryStatus } from "@/app/enums";

type Params = { id: string };

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");

    const result = await storiesCollection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            status: StoryStatus.APPROVED,
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
            preserveNullAndEmptyArrays: true, // In case publisher is missing
          },
        },
        {
          $project: {
            _id: 1,
            image:1,
            name: 1,
            birth_date: 1,
            death_date: 1,
            city:1,
            neighborhood:1,
            bio: 1,
            status: 1,
            createdAt: 1,
            // Include all fields you want from the story
            publisherName: "$publisher.name", // Map publisher name
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

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in aggregation:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب البيانات" },
      { status: 500 }
    );
  }
}
