import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    // Validate id first:
    if (!ObjectId.isValid(id)) {
      // If id is invalid format, immediately return 404
      return NextResponse.json(
        { error: "معرف المفقود غير صالح" },
        { status: 404 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const missingsCollection = db.collection("missings");

    // Find the missing person directly
    const data = await missingsCollection.findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          _id: 1,
          id_number: 1,
          image: 1,
          title: 1,
          age: 1,
          gender: 1,
          profession: 1,
          nickname: 1,
          birth_date: 1,
          missing_date: 1,
          location: 1,
          details: 1,
          status: 1,
          keywords: 1,
          createdAt: 1,
          updatedAt: 1,
          publisher_id: 1,
          visits: 1,
          reporter_name: 1,
          reporter_phone_number: 1,
          reporter_location: 1,
        },
      }
    );

    if (!data) {
      return NextResponse.json(
        { error: "لم يتم العثور على المفقود" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching missing person:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
