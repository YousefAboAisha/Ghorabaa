import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const notificationsCollection = db.collection("notifications");

    const notifications = await notificationsCollection
      .find({ user_id: new ObjectId(token.id) })
      .sort({ createdAt: -1 }) // 👈 Sort by createdAt DESC (most recent first)
      .toArray();

    return NextResponse.json({ data: notifications ?? [] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "تعذر الوصول إلى السيرفر" }, { status: 500 });
  }
}
