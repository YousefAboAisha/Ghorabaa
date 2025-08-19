import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { NotificationTypes, StoryStatus } from "@/app/enums";
import { getFullName } from "@/utils/text";

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
    const { id_number, keywords, bio, birth_date, death_date, title, ...rest } =
      body;

    // Validate required fields
    if (!id_number) {
      return NextResponse.json({ error: "رقم الهوية مطلوب" }, { status: 400 });
    }

    // Check if story with this ID already exists
    const existingStory = await collection.findOne({ id_number });

    if (existingStory) {
      return NextResponse.json(
        { error: "قصة برقم الهوية المُدخل موجودة بالفعل" },
        { status: 409 }
      );
    }

    const age = birth_date
      ? new Date(death_date).getFullYear() - new Date(birth_date).getFullYear()
      : null;

    // Create new story document
    const newStory = {
      ...rest,
      id_number,
      title,
      bio,
      keywords,
      age,
      birth_date,
      death_date,
      publisher_id: new ObjectId(token.id),
      status: StoryStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Add any other default fields you need
    };

    // Insert new story
    const result = await collection.insertOne(newStory);

    const fullName = getFullName(title);

    // Create notification
    if (result.insertedId) {
      const storyNotificationPayload = {
        user_id: new ObjectId(token.id),
        message: `تمت إضافة طلبك لإضافة قصة عن الشهيد ${fullName} بنجاح، وستتم مراجعة الطلب في أسرع وقت!`,
        href: `/stories/${result.insertedId}`,
        notification_type: NotificationTypes.REQUEST,
        createdAt: new Date(),
        is_read: false,
      };

      await notificationsCollection.insertOne(storyNotificationPayload);
    }

    return NextResponse.json(
      {
        message: "تم إرسال طلب نشر القصة بنجاح",
        data: {
          ...newStory,
          _id: result.insertedId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء محاولة إضافة القصة" },
      { status: 500 }
    );
  }
}
