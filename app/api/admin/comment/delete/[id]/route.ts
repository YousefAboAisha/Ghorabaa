import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { NotificationTypes, Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "معرف التعليق غير صالح" },
        { status: 400 }
      );
    }

    const token = await getToken({ req, secret });
    if (!token || !token.id) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const commentsCollection = db.collection("comments");
    const notificationsCollection = db.collection("notifications");
    const storiesCollection = db.collection("stories");

    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });

    if (!comment) {
      return NextResponse.json(
        { error: "لم يتم العثور على التعليق" },
        { status: 404 }
      );
    }

    const isOwner = comment.author_id?.toString() === token.id;
    const isAdmin = token.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "غير مصرح لك بحذف هذا التعليق" },
        { status: 403 }
      );
    }

    const result = await commentsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // ✅ Fetch story name via projection
    const story = await storiesCollection.findOne(
      { _id: comment.story_id },
      { projection: { name: 1 } }
    );

    // 🔔 Add notification if admin deleted another user's comment
    if (isAdmin && !isOwner && comment.author_id) {
      await notificationsCollection.insertOne({
        user_id: comment.author_id,
        type: NotificationTypes.DELETE,
        message: `تم حذف تعليقك من قصة "${
          story?.name ?? "غير معروفة"
        }" بواسطة المشرف.`,
        story_id: comment.story_id,
        story_name: story?.name,
        is_read: false,
        created_at: new Date(),
      });
    }

    return NextResponse.json(
      { message: "تم حذف التعليق", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف التعليق" },
      { status: 500 }
    );
  }
}
