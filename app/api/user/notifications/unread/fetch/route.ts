// GET /api/user/notifications/unread
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ error: "معرف المستخدم مفقود" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const notificationsCollection = db.collection("notifications");

  const hasUnread = await notificationsCollection.findOne({
    user_id: new ObjectId(user_id),
    is_read: false,
  });

  return NextResponse.json({ hasUnread: !!hasUnread });
}
