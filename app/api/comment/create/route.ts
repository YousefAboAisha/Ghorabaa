import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { NotificationTypes } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  const reqForToken = originalReq.clone();
  const reqForBody = originalReq.clone();

  const token = await getToken({ req: new NextRequest(reqForToken), secret });

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    const body = await reqForBody.json();
    const {
      text,
      author_id,
      story_id,
      author_name,
      author_image,
      author_role,
    } = body;

    if (!text || !author_id || !story_id || !author_name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const commentsCollection = db.collection("comments");
    const storiesCollection = db.collection("stories");
    const usersCollection = db.collection("users");
    const notificationsCollection = db.collection("notifications");

    const newComment = {
      text,
      author_id: new ObjectId(author_id),
      story_id: new ObjectId(story_id),
      author_name,
      author_image,
      author_role,
      createdAt: new Date(),
    };

    // Insert the comment
    const result = await commentsCollection.insertOne(newComment);

    // 🟡 Find the story to get its owner (publisher_id)
    const story = await storiesCollection.findOne({
      _id: new ObjectId(story_id),
    });

    if (story?.publisher_id?.toString() !== author_id) {
      // Don't notify if user commented on their own story
      const notificationPayload = {
        user_id: story?.publisher_id,
        story_id: story?._id,
        title: `قام ${author_name} بإضافة تعليق جديد على قصتك.`,
        notification_type: NotificationTypes.COMMENT,
        author_name,
        author_id: new ObjectId(author_id),
        createdAt: new Date(),
      };

      await notificationsCollection.insertOne(notificationPayload);

      // Push to user.notifications array, keeping only latest 7
      await usersCollection.updateOne(
        { _id: story?.publisher_id },
        {
          $push: {
            notifications: {
              $each: [notificationPayload],
              $position: 0,
              $slice: 7,
            },
          },
        } as any // Cast to any to satisfy TypeScript
      );
    }

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
