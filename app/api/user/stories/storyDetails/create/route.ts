import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId, UpdateFilter } from "mongodb";
import { NotificationTypes, StoryStatus } from "@/app/enums";
import { StoryInterface } from "@/app/interfaces";
import { extractArabicKeywords } from "@/app/lib/extractArabicKeywords";
import { User } from "next-auth";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  const token = await getToken({ req: nextReq, secret });

  if (!token) {
    return NextResponse.json(
      { error: "أنت غير مصرح لك، الرجاء تسجيل الدخول!" },
      { status: 401 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("stories");
    const notificationsCollection = db.collection("notifications");
    const usersCollection = db.collection<User>("users");

    const body = await originalReq.json();
    const { id_number, birth_date, death_date, bio, ...rest } = body;

    if (!id_number) {
      return NextResponse.json(
        { error: "Story ID is required." },
        { status: 400 }
      );
    }

    const existingStory = await collection.findOne({
      id_number: id_number,
    });

    if (!existingStory) {
      return NextResponse.json({ error: "Story not found." }, { status: 404 });
    }

    let keywords: string[] = [];
    if (bio && typeof bio === "string") {
      try {
        keywords = await extractArabicKeywords(bio);
      } catch (err) {
        console.warn("Keyword extraction failed:", err);
      }
    }

    const updatedFields: StoryInterface = {
      ...rest,
      ...(bio && { bio }), // ensure bio is included if updated
      keywords, // <- Add extracted keywords
      publisher_id: new ObjectId(token.id),
      status: StoryStatus.PENDING,
      hasCompleteProfile: true,
      age:
        new Date(death_date).getFullYear() - new Date(birth_date).getFullYear(),
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { id_number: id_number },
      { $set: updatedFields }
    );

    const updatedStory = await collection.findOne({
      id_number: id_number,
    });

    if (updatedStory) {
      // Create notification
      const storyNotificationPayload = {
        user_id: updatedStory.publisher_id,
        message: `تمت إضافة طلبك لإضافة قصة عن الشهيد ${updatedStory.name} بنجاح، وستتم مراجعة الطلب في أسرع وقت!`,
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

    return NextResponse.json(
      { message: "Story updated", data: updatedStory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating story:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
