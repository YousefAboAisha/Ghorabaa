import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId, UpdateFilter } from "mongodb";
import { StoryStatus, NotificationTypes, Role } from "@/app/enums";
import { User } from "next-auth";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function PUT(
  originalReq: NextRequest,
  { params }: { params: Params }
) {
  // This is story ID
  const { id } = await params;

  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  const token = await getToken({ req: nextReq, secret });

  if (!token || token.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const notificationsCollection = db.collection("notifications");
    const usersCollection = db.collection<User>("users");

    const body = await originalReq.json();
    const { rejectReason } = body;

    console.log("Received body [Reject Story]:", body);

    // Validate required inputs
    if (!id) {
      return NextResponse.json({ error: "بعض الحقول مفقودة" }, { status: 400 });
    }

    const story = await storiesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!story) {
      return NextResponse.json({ error: "القصة غير موجودة" }, { status: 404 });
    }

    // Update the story
    await storiesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: StoryStatus.REJECTED,
          rejectReason: rejectReason,
          updatedAt: new Date(),
        },
      }
    );

    //  && story.publisher_id?.toString() !== author_id
    if (story) {
      // Create notification
      const storyNotificationPayload = {
        user_id: story.publisher_id,
        message: `تم رفض طلبك لإضافة قصة عن الشهيد ${story?.name} من قبل المشرفين!`,
        href: `/profile?activeTap=${StoryStatus.REJECTED}#storyContainer`,
        notification_type: NotificationTypes.REJECT,
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

      await usersCollection.updateOne({ _id: story.publisher_id }, update);
    }

    return NextResponse.json(
      { message: `Story ${StoryStatus.REJECTED.toLowerCase()}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
