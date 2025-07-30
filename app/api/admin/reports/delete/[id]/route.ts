// app/api/admin/report/reject/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { Role, ReportStatus, NotificationTypes } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token || token.role === Role.USER) {
      return NextResponse.json({ error: "غير مصرح لك" }, { status: 403 });
    }

    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const reportsCollection = db.collection("reports");
    const notificationsCollection = db.collection("notifications");

    // Step 1: Get the report document
    const report = await reportsCollection.findOne({
      _id: new ObjectId(id),
    });

    const reported_user_id = report?.content?.author_id;

    const userData = await db.collection("users").findOne(
      { _id: new ObjectId(reported_user_id) },
      { projection: { name: 1, _id: 0 } } // explicitly exclude _id
    );

    const reported_user_name = userData?.name;

    if (!report) {
      return NextResponse.json(
        { error: "لم يتم العثور على الإبلاغ" },
        { status: 404 }
      );
    }

    const comment_id = report?.content?._id;

    if (!comment_id) {
      return NextResponse.json(
        { error: "المحتوى المرتبط بالإبلاغ غير موجود" },
        { status: 404 }
      );
    }

    const result = await db
      .collection("comments")
      .deleteOne({ _id: new ObjectId(comment_id) });

    // Step 3: Optionally update report status
    await reportsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: ReportStatus.DELETED,
          approvedBy: new ObjectId(token.id),
          updatedAt: new Date(),
        },
      }
    );

    if (report) {
      // Create notification
      const storyNotificationPayload = {
        user_id: report.user_id,
        message: `قمنا بمراجعة بلاغك! وبناءً عليه تم حذف تعليق المستخدم  [${reported_user_name}] بسبب انتهاكه معايير المنصة`,
        href: `/stories/${report.content_id}`,
        notification_type: NotificationTypes.BAN,
        createdAt: new Date(),
        is_read: false,
      };

      await notificationsCollection.insertOne(storyNotificationPayload);
    }

    return NextResponse.json({
      message: "تم حذف المحتوى المرتبط بالإبلاغ",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error accepting report:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
