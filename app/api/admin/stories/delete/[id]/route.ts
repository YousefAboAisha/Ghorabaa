// /app/api/story/delete/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { NotificationTypes, Role } from "@/app/enums";
import { getFullName } from "@/utils/text";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token || token.role === Role.USER) {
      return NextResponse.json(
        { error: "غير مصرح لك. يرجى تسجيل الدخول." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "معرّف القصة غير صالح." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const notificationsCollection = db.collection("notifications");
    const commentsCollection = db.collection("comments");
    const reportsCollection = db.collection("reports");

    const existingStory = await storiesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingStory) {
      return NextResponse.json({ error: "القصة غير موجودة." }, { status: 404 });
    }

    const fullName = getFullName(existingStory.title);

    // 🔔 Create notification for the publisher
    await notificationsCollection.insertOne({
      user_id: existingStory.publisher_id,
      message: `تمت إزالة قصة الشهيد ${fullName} من المنصة بواسطة المشرف`,
      href: `/stories/${existingStory._id}`,
      notification_type: NotificationTypes.DELETE,
      createdAt: new Date(),
      is_read: false,
    });

    const isOwner = existingStory.publisher_id?.toString() === token.id;
    const isAuthenticated =
      token.role === Role.ADMIN || token.role === Role.EDITOR;

    if (!isOwner && !isAuthenticated) {
      return NextResponse.json(
        { error: "غير مصرح لك بحذف هذه القصة." },
        { status: 403 }
      );
    }

    // ❌ Delete all related comments & reports (cover ObjectId or string case)
    await commentsCollection.deleteMany({
      $or: [{ story_id: new ObjectId(id) }, { story_id: id }],
    });

    await reportsCollection.deleteMany({
      $or: [{ content_id: new ObjectId(id) }, { content_id: id }],
    });

    // 🔴 Hard delete story itself
    const result = await storiesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "فشل في حذف القصة." }, { status: 500 });
    }

    return NextResponse.json(
      { message: "تم حذف القصة وجميع تعليقاتها بنجاح (حذف كلي)." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting story:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
