// /app/api/story/update/route.ts

import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { NotificationTypes, StoryStatus } from "@/app/enums";
import { Role } from "@/app/enums"; // ✅ Import Role enum
import { extractArabicKeywords } from "@/app/lib/extractArabicKeywords";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  // This is story ID
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });
  }

  try {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });
    }

    const userId = token.id;

    const body = await req.json();
    const { bio, birth_date, death_date, ...updateFields } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing story ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");
    const notificationsCollection = db.collection("notifications");

    const existingStory = await storiesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // ✅ Authorization check: allow publisher or admin
    const isPublisher = existingStory.publisher_id?.toString() === userId;
    const isAuthenticated =
      token.role === Role.ADMIN || token.role === Role.EDITOR;

    if (!isPublisher && !isAuthenticated) {
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
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateFields,
          ...(bio && { bio }),
          publisher_id: new ObjectId(existingStory.publisher_id),
          keywords,
          status: StoryStatus.PENDING,
          death_date: new Date(death_date),
          birth_date: new Date(birth_date),
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (updatedStory) {
      // Create notification
      const storyNotificationPayload = {
        user_id: updatedStory.publisher_id,
        message: `تمت إضافة طلبك لتعديل قصة الشهيد ${updatedStory.title} بنجاح، وستتم مراجعة الطلب في أسرع وقت!`,
        href: `/stories/${updatedStory._id}`,
        notification_type: NotificationTypes.REQUEST,
        createdAt: new Date(),
        is_read: false,
      };

      await notificationsCollection.insertOne(storyNotificationPayload);
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
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
