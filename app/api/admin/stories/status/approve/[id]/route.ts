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
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid story ID format" },
        { status: 400 }
      );
    }

    const req = originalReq.clone();
    const nextReq = new NextRequest(req);

    const token = await getToken({ req: nextReq, secret });

    // ✅ Allow only ADMINs
    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const notificationsCollection = db.collection("notifications");

    // Fetch story
    const story = await storiesCollection.findOne({ _id: new ObjectId(id) });

    if (!story) {
      return NextResponse.json({ error: "القصة غير موجودة!" }, { status: 404 });
    }

    if (!story.publisher_id) {
      return NextResponse.json(
        { error: "لا يوجد ناشر مرتبط بهذه القصة" },
        { status: 500 }
      );
    }

    // ✅ Prevent re-approving already approved stories
    if (story.status === StoryStatus.APPROVED) {
      return NextResponse.json(
        { error: "القصة تمت الموافقة عليها مسبقًا" },
        { status: 400 }
      );
    }

    // Update story
    const updateResult = await storiesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: StoryStatus.APPROVED,
          approvedBy: new ObjectId(token.id),
          updatedAt: new Date(),
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "لم يتم تعديل أي بيانات للقصة" },
        { status: 400 }
      );
    }

    // ✅ Notify publisher if not the approving admin
    if (story.publisher_id.toString() !== token.id) {
      const fullName = getFullName(story.title);

      const storyNotificationPayload = {
        user_id: story.publisher_id,
        message: `تمت الموافقة على إضافة قصة الشهيد ${fullName} من قِبَل المشرف`,
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
