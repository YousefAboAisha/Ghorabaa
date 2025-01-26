import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    const session = await getSession();
    console.log("Session", session);
    const userId = session?.userId;

    console.log("Customer user ID", userId);

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

    // Convert userId to ObjectId
    const userIdObject = new ObjectId(userId);

    // Check if the customer exists
    const customer = await collection.findOne({ _id: userIdObject });

    if (!customer) {
      // If the customer does not exist, return an error
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...customerData } = customer;

    return NextResponse.json(
      { message: "تم جلب البيانات بنجاح", customer: customerData }, // Data fetched successfully
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
