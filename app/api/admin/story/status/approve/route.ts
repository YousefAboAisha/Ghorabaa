import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId, UpdateFilter } from "mongodb";
import { StoryStatus, NotificationTypes } from "@/app/enums";
import { User } from "next-auth";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  const token = await getToken({ req: nextReq, secret });

  if (!token || token.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const notificationsCollection = db.collection("notifications");
    const usersCollection = db.collection<User>("users");

    const body = await originalReq.json();
    const { story_id, status, ...fieldsToUpdate } = body;

    // Validate required inputs
    if (!story_id || status !== StoryStatus.APPROVED) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const story = await storiesCollection.findOne({
      _id: new ObjectId(story_id),
    });

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    if (!story.publisher_id) {
      return NextResponse.json(
        { error: "Publisher ID missing." },
        { status: 500 }
      );
    }

    // Only allow specific fields to be updated
    const allowedFields = ["bio", "city", "neighborhood"];
    const sanitizedUpdate = Object.fromEntries(
      Object.entries(fieldsToUpdate).filter(([key]) =>
        allowedFields.includes(key)
      )
    );

    // Update the story
    await storiesCollection.updateOne(
      { _id: new ObjectId(story_id) },
      {
        $set: {
          ...sanitizedUpdate,
          status: StoryStatus[status as StoryStatus],
          updatedAt: new Date(),
        },
      }
    );

    // && story.publisher_id?.toString() !== author_id - TO prevent sending notifications to the same user who accepted it.
    if (story) {
      // Create notification
      const storyNotificationPayload = {
        user_id: story.publisher_id,
        story_id: story._id,
        title: "تمت الموافقة على قصتك من قِبل المشرف",
        notification_type: NotificationTypes.ACCEPT,
        story_name: story.name,
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
      { message: `Story ${status.toLowerCase()}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تحديث حالة القصة." },
      { status: 500 }
    );
  }
}
