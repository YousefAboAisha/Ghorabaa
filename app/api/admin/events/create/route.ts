import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { EventStatus, Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  const req = originalReq.clone();
  const nextReq = new NextRequest(req);
  const token = await getToken({ req: nextReq, secret });

  if (!token || token.role === Role.USER) {
    return NextResponse.json(
      { error: "أنت غير مصرح لك، الرجاء تسجيل الدخول!" },
      { status: 401 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const eventsCollection = db.collection("events");

    const body = await originalReq.json();

    const { title, start_date, details, image, ...rest } = body;

    if (!title || !start_date || !details || !image) {
      return NextResponse.json(
        { error: "بعض الحقول المطلوبة مفقودة" },
        { status: 400 }
      );
    }

    const massacreDoc = {
      ...rest,
      _id: new ObjectId(),
      title,
      start_date,
      details,
      image,
      createdAt: new Date(),
      publisher_id: new ObjectId(token.id),
      visits: 0,
      status: EventStatus.PENDING,
    };

    await eventsCollection.insertOne(massacreDoc);

    return NextResponse.json(
      { message: "تمت إضافة المجزرة بنجاح", data: massacreDoc },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating massacre:", error);
    return NextResponse.json(
      { error: "حدث خطأ في السيرفر أثناء إضافة المجزرة" },
      { status: 500 }
    );
  }
}
