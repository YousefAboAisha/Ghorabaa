import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { NotificationTypes, StoryStatus } from "@/app/enums";
import { StoryInterface } from "@/app/interfaces";
import { extractArabicKeywords } from "@/app/lib/extractArabicKeywords";

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

    const body = await originalReq.json();
    const { id_number, age, bio, ...rest } = body;

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
      age,
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
    }

    return NextResponse.json(
      { message: "Story updated", data: updatedStory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating story:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
