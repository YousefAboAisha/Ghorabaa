// /app/api/story/update/route.ts

import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId, UpdateFilter } from "mongodb";
import { NotificationTypes, StoryStatus } from "@/app/enums";
import { Role } from "@/app/enums"; // ✅ Import Role enum
import { extractArabicKeywords } from "@/app/lib/extractArabicKeywords";
import { User } from "next-auth";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token || !token.id || !token.role) {
      return NextResponse.json({ error: "غري مصرح لك" }, { status: 401 });
    }

    const userId = token.id;
    const userRole = token.role;

    const body = await req.json();
    const { _id, publisher_id, bio, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing story ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const notificationsCollection = db.collection("notifications");
    const usersCollection = db.collection<User>("users");

    const existingStory = await storiesCollection.findOne({
      _id: new ObjectId(_id),
    });

    if (!existingStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // ✅ Authorization check: allow publisher or admin
    const isPublisher = existingStory.publisher_id?.toString() === userId;
    const isAdmin = userRole === Role.ADMIN;

    if (!isPublisher && !isAdmin) {
      return NextResponse.json({ error: "Not authorized!" }, { status: 403 });
    }

    let keywords: string[] = [];
    if (bio && typeof bio === "string") {
      try {
        keywords = await extractArabicKeywords(bio);
      } catch (err) {
        console.warn("Keyword extraction failed:", err);
      }
    }

    const updatedStory = await storiesCollection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...updateFields,
          ...(bio && { bio }),
          publisher_id: new ObjectId(publisher_id),
          keywords,
          status: StoryStatus.PENDING,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (updatedStory) {
      // Create notification
      const storyNotificationPayload = {
        user_id: updatedStory.publisher_id,
        message: `تمت إضافة طلبك لتعديل قصة الشهيد ${updatedStory.name} بنجاح، وستتم مراجعة الطلب في أسرع وقت!`,
        href: `/stories/${updatedStory._id}`,
        notification_type: NotificationTypes.REQUEST,
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

      await usersCollection.updateOne(
        { _id: updatedStory.publisher_id },
        update
      );
    }

    if (!updatedStory) {
      return NextResponse.json(
        { error: "فشل في تحديث القصة" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Story updated successfully",
      data: updatedStory.value,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
