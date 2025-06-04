import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token?.id) {
    return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const usersCollection = db.collection("users");
  const notificationsCollection = db.collection("notifications");

  // Update notifications array in the users collection
  await usersCollection.updateOne(
    { _id: new ObjectId(token.id), "notifications.is_read": false },
    { $set: { "notifications.$[].is_read": true } }
  );

  // Also update the notifications collection documents
  await notificationsCollection.updateMany(
    { user_id: new ObjectId(token.id), is_read: false },
    { $set: { is_read: true } }
  );

  return NextResponse.json({ message: "Marked as read" }, { status: 200 });
}
