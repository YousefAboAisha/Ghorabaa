import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Subscription from "@/app/models/comment";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const customersCollection = db.collection("users");

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const { leasing_type, start_date, end_date, payment_method, notes } = body;

    // Get the session and userId
    const session = await getSession();
    console.log("Session", session);
    const userId = session?.userId;

    console.log("Customer user ID", userId);

    // Validate userId
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
    const customer = await customersCollection.findOne({ _id: userIdObject });

    if (!customer) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    // Create a new subscription object
    const subscription = new Subscription({
      leasing_type,
      start_date,
      end_date,
      payment_method,
      notes,
    });

    console.log("New subscription has been added successfully!", subscription);

    // Insert the subscription into the customer's subscriptions array
    const result = await customersCollection.updateOne(
      { _id: userIdObject }, // Find the customer by their ID
      { $push: { subscriptions: subscription } } // Add the subscription to the subscriptions array
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "فشل إضافة الاشتراك" }, // Failed to add subscription
        { status: 400 }
      );
    }

    // Return the response
    return NextResponse.json(
      { message: "تم إنشاء الاشتراك بنجاح", subscription }, // Subscription created successfully
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating subscription:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
