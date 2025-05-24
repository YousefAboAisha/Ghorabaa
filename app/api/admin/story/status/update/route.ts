// /api/admin/story/status/update/route.ts

import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { StoryStatus, NotificationTypes } from "@/app/enums";
import { NotificationModel } from "@/app/models/notification";

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

    const { storyId, action } = await originalReq.json();

    if (!storyId || !["APPROVED", "REJECTED"].includes(action)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const story = await storiesCollection.findOne({
      _id: new ObjectId(storyId),
    });

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // Update the story status
    await storiesCollection.updateOne(
      { _id: new ObjectId(storyId) },
      {
        $set: {
          status: StoryStatus[action as StoryStatus],
          updatedAt: new Date(),
        },
      }
    );

    // Create notification for the user
    await NotificationModel.create({
      user_id: story.publisher_id,
      story_id: story._id,
      title:
        action === "APPROVED"
          ? "تمت الموافقة على قصتك."
          : "تم رفض قصتك من قبل الإدارة.",
      notification_type:
        action === "APPROVED"
          ? NotificationTypes.ACCEPT
          : NotificationTypes.REJECT,
    });

    return NextResponse.json(
      { message: `Story ${action.toLowerCase()}` },
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
