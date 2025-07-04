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
  const notificationsCollection = db.collection("notifications");

  // ✅ Update all notifications for this user
  await notificationsCollection.updateMany(
    { user_id: new ObjectId(token.id), is_read: false },
    { $set: { is_read: true } }
  );

  return NextResponse.json(
    { message: "تم تمييز جميع الإشعارات كمقروءة" },
    { status: 200 }
  );
}
