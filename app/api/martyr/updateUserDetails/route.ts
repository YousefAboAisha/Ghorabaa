import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB
import { getSession } from "@/app/lib/session";

export async function PUT(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const { name, phoneNumber, profession } = body;

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

    // Convert userId to ObjectId
    const userIdObject = new ObjectId(userId);

    // Check if the customer exists
    const existingUser = await collection.findOne({ _id: userIdObject });

    if (!existingUser) {
      // If the user does not exist, return an error response
      return NextResponse.json(
        {
          error: "المستخدم غير موجود",
        },
        { status: 404 }
      );
    }

    // Prepare the update object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (profession) updateFields.profession = profession;

    // Update the user details
    const result = await collection.updateOne(
      { _id: userIdObject },
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      // If no fields were updated, return a message
      return NextResponse.json(
        { message: "لا يوجد تغييرات لتحديثها" },
        { status: 200 }
      );
    }

    // Return the response
    return NextResponse.json(
      { message: "تم تحديث بيانات المستخدم بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while updating customer:", error);
    return NextResponse.json({ error: "خطاً في الخادم" }, { status: 500 });
  }
}
