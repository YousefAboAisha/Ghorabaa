import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId, UpdateFilter } from "mongodb";
import { ContentType, NotificationTypes, ReportStatus } from "@/app/enums";
import { User } from "next-auth";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });
  const user_id = token?.id;

  if (!token) {
    return NextResponse.json(
      { error: "غير مصرح. الرجاء تسجيل الدخول." },
      { status: 401 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const reportsCollection = db.collection("reports");
    const commentsCollection = db.collection("comments");
    const usersCollection = db.collection<User>("users");
    const notificationsCollection = db.collection("notifications");

    const body = await req.json();
    const { comment_id, rejectReason, rejectDetails } = body;

    if (!comment_id || !rejectReason || !rejectDetails) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة!" },
        { status: 400 }
      );
    }

    const existingComment = await commentsCollection.findOne({
      _id: new ObjectId(comment_id),
    });

    if (!existingComment) {
      return NextResponse.json(
        { error: "لم يتم العثور على التعليق." },
        { status: 404 }
      );
    }

    // ✅ Get reporter info from token
    const reporter = await usersCollection.findOne(
      { _id: new ObjectId(user_id) },
      { projection: { name: 1 } }
    );

    const newReport = {
      reason: rejectReason,
      details: rejectDetails,
      status: ReportStatus.PENDING,
      content: existingComment,
      content_type: ContentType.COMMENT,
      content_id: existingComment.story_id, // 👈 Important: reference to reported content
      user_id: new ObjectId(token.id), // 👈 Correct field for reporter
      user_name: reporter?.name || "مجهول", // 👈 Correct reporter name
      createdAt: new Date(),
    };

    const insertResult = await reportsCollection.insertOne(newReport);

    if (insertResult) {
      // Create notification
      const storyNotificationPayload = {
        user_id: newReport.user_id,
        message: `تم إرسال الإبلاغ بنجاح! وستتم مراجعته في أقرب وقت.`,
        href: `#`,
        notification_type: NotificationTypes.REQUEST,
        createdAt: new Date(),
        is_read: false,
      };

      await notificationsCollection.insertOne(storyNotificationPayload);

      // Push notification to user's array (max 7)
      const update: UpdateFilter<User> = {
        $push: {
          notifications: {
            $each: [storyNotificationPayload],
            $position: 0,
            $slice: 7,
          },
        },
      };

      await usersCollection.updateOne(
        { _id: new ObjectId(newReport.user_id) },
        update
      );
    }

    return NextResponse.json(
      { message: "تم إنشاء الإبلاغ بنجاح", data: insertResult },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
