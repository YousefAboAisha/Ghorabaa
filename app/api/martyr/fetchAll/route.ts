import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("martyrs");

    // Fetch all martyrs from the collection
    const martyrs = await collection.find({}).toArray();

    if (!martyrs || martyrs.length === 0) {
      // If no martyrs are found, return an error
      return NextResponse.json(
        { error: "لم يتم العثور على أي شهداء" }, // No martyrs found
        { status: 404 }
      );
    }

    // Return the list of martyrs
    return NextResponse.json(
      { message: "تم جلب البيانات بنجاح", martyrs }, // Data fetched successfully
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching martyrs:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب البيانات" }, // An error occurred while fetching data
      { status: 500 }
    );
  }
}
