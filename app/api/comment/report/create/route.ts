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
    const commentsCollection = db.collection("comments");

    const body = await req.json();
    const { comment_id, rejectReason, rejectDetails } = body;

    if (!comment_id || !rejectReason || !rejectDetails) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة!" },
        { status: 400 }
      );
    }

    const existingComment = await commentsCollection.findOne({
      _id: new ObjectId(comment_id),
    });

    if (!existingComment) {
      return NextResponse.json(
        { error: "لم يتم العثور على التعليق." },
        { status: 404 }
      );
    }

    const newReport = {
      reason: rejectReason,
      details: rejectDetails,
      status: ReportStatus.PENDING,
      content_id: existingComment._id,
      content_type: ContentType.COMMENT,
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
