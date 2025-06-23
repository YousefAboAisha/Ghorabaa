import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { CommentNotificationInterface } from "@/app/interfaces";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const usersCollection = db.collection("users");

    const user = await usersCollection
      .aggregate([
        { $match: { _id: new ObjectId(token.id) } },
        {
          $project: {
            notifications: {
              $sortArray: {
                input: "$notifications",
                sortBy: { createdAt: -1 },
              },
            },
          },
        },
      ])
      .toArray();

    const notifications = user[0]?.notifications ?? [];
    const hasUnread = notifications.some(
      (n: CommentNotificationInterface) => !n.is_read
    );

    return NextResponse.json(
      { data: notifications, hasUnread },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "تعذر الوصول إلى السيرفر" }, { status: 500 });
  }
}
