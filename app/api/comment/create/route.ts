import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb";
import Comment from "@/app/models/comment";

export async function POST(req: Request) {
  // Get the session and userId
  const session = await getSession();
  console.log("Session", session);
  const userId = session?.id;

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
  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const customersCollection = db.collection("martyrs");

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

  // Parse the request body
  const body = await req.json();
  console.log("Raw Request Body:", body);

  // Create a new comment object

  const comment = new Comment({ ...body });

  console.log("New comment has been added successfully!", comment);

  // Insert the comment into the customer's comment array
  const result = await customersCollection.updateOne(
    { _id: userIdObject }, // Find the customer by their ID
    { $push: { comments: comment } } // Add the comment to the comment array
  );

  // Check if the update was successful
  if (result.modifiedCount === 0) {
    return NextResponse.json(
      { error: "فشل إضافة التعليق" }, // Failed to add comment
      { status: 400 }
    );
  }

  // Return the response
  return NextResponse.json(
    { message: "تم إنشاء الاشتراك بنجاح", comment }, // Comment created successfully
    { status: 200 }
  );
}
