import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { MassacreInterface } from "@/app/interfaces";
import { MassacreStatus } from "@/app/enums";

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
    const massacresCollection = db.collection("massacres");

    const body = await originalReq.json();

    const {
      title,
      date,
      location,
      description,
      deaths,
      injuries,
      destroyedHouses,
      cover_image,
      media,
      internationalReactions,
    }: Partial<MassacreInterface> = body;

    if (!title || !date || !location?.city || !description || !cover_image) {
      return NextResponse.json(
        { error: "بعض الحقول المطلوبة مفقودة" },
        { status: 400 }
      );
    }

    const massacreDoc = {
      _id: new ObjectId(),
      title,
      date: new Date(date),
      location,
      description,
      deaths: deaths ?? 0,
      injuries: injuries ?? 0,
      destroyedHouses: destroyedHouses ?? 0,
      cover_image,
      media,
      internationalReactions,
      createdAt: new Date(),
      publisher_id: new ObjectId(token.id),
      visits: 0,
      status: MassacreStatus.PENDING,
    };

    await massacresCollection.insertOne(massacreDoc);

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
