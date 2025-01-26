import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad");
    const collection = db.collection("subscriptions");

    const session = await getSession();
    console.log("Session", session);
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    // Check if the userId is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "معرف المستخدم غير صالح" }, // Invalid user ID
        { status: 400 }
      );
    }

    // Check if the customer exists
    const subscription = await collection.findOne({ customer_id: userId });

    if (!subscription) {
      // If the customer does not exist, return an error
      return NextResponse.json(
        { error: "الاشتراك غير موجود" }, // User not found
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "تم جلب البيانات بنجاح", subscription }, // Data fetched successfully
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during fetching user details", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
