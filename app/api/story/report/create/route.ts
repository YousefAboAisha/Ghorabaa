import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { ContentType, ReportStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json(
      { error: "غير مصرح. الرجاء تسجيل الدخول." },
      { status: 401 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const reportsCollection = db.collection("reports");
    const storiesCollection = db.collection("stories");

    const body = await req.json();
    const { story_id, rejectReason, rejectDetails } = body;

    if (!story_id || !rejectReason || !rejectDetails) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة!" },
        { status: 400 }
      );
    }

    const existingStory = await storiesCollection.findOne({
      _id: new ObjectId(story_id),
    });

    if (!existingStory) {
      return NextResponse.json(
        { error: "لم يتم العثور على القصة." },
        { status: 404 }
      );
    }

    const newReport = {
      reason: rejectReason,
      details: rejectDetails,
      status: ReportStatus.PENDING,
      content_id: existingStory._id,
      content_type: ContentType.STORY,
      user_id: new ObjectId(token.id),
      createdAt: new Date(),
    };

    const insertResult = await reportsCollection.insertOne(newReport);

    return NextResponse.json(
      { message: "تم إنشاء البلاغ بنجاح", data: insertResult },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء البلاغ." },
      { status: 500 }
    );
  }
}
