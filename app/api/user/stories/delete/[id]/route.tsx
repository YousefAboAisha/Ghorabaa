// /app/api/story/delete/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { NotificationTypes, Role, StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json(
        { error: "غير مصرح. يرجى تسجيل الدخول." },
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

    if (existingStory) {
      // Create notification
      const storyNotificationPayload = {
        user_id: existingStory.publisher_id,
        message: `تم حذف قصة الشهيد ${existingStory.name} بنجاح!`,
        href: `/stories/${existingStory._id}`,
        notification_type: NotificationTypes.DELETE,
        createdAt: new Date(),
        is_read: false,
      };

      await notificationsCollection.insertOne(storyNotificationPayload);
    }

    const isOwner = existingStory.publisher_id?.toString() === token.id;
    const isAdmin = token.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "غير مصرح لك بحذف هذه القصة." },
        { status: 403 }
      );
    }

    await commentsCollection.deleteMany({ story_id: new ObjectId(id) });
    await reportsCollection.deleteMany({ content_id: new ObjectId(id) });

    // Instead of deleting, we nullify specific fields and reset profile status
    const updateFields = {
      publisher_id: null,
      nickname: null,
      city: null,
      neighborhood: null,
      bio: null,
      image: null,
      hasCompleteProfile: false,
      status: StoryStatus.IMPORTED,
      updatedAt: new Date(),
    };

    const result = await storiesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "فشل في تحديث بيانات القصة." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "تم حذف القصة بنجاح." },
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
