import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { StoryStatus, NotificationTypes, Role } from "@/app/enums";
import { getFullName } from "@/utils/text";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function PUT(
  originalReq: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  const token = await getToken({ req: nextReq, secret });

  if (!token || token.role === Role.USER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const notificationsCollection = db.collection("notifications");

    // Validate required inputs
    if (!id) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const story = await storiesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!story) {
      return NextResponse.json({ error: "القصة غير موجودة!" }, { status: 404 });
    }

    if (!story.publisher_id) {
      return NextResponse.json(
        { error: "يجب إضافة معرف ناشر القصة" },
        { status: 500 }
      );
    }

    // Update the story
    await storiesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: StoryStatus.APPROVED,
          approvedBy: new ObjectId(token.id),
          updatedAt: new Date(),
        },
      }
    );

    // && story.publisher_id?.toString() !== author_id - TO prevent sending notifications to the same user who accepted it.
    if (story) {
      const fullName = getFullName(story.title);
      // Create notification
      const storyNotificationPayload = {
        user_id: story.publisher_id,
        message: `تمت الموافقة على طلب إضافة قصة الشهيد ${fullName} من قِبِل المشرف`,
        href: `/stories/${story._id}`,
        notification_type: NotificationTypes.ACCEPT,
        createdAt: new Date(),
        is_read: false,
      };

      await notificationsCollection.insertOne(storyNotificationPayload);
    }

    return NextResponse.json(
      { message: `Story ${StoryStatus.APPROVED.toLowerCase()}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
