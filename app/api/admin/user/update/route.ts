import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { _id, name, phone_number, id_number, role } = body;

    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json(
        { error: "معرف المستخدم غير صالح" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...(name && { name }),
          ...(phone_number && { phone_number }),
          ...(id_number && { id_number }),
          ...(role && { role }),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "لم يتم تعديل المستخدم" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "تم تعديل المستخدم بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json(
      { error: "فشل في تحديث بيانات المستخدم" },
      { status: 500 }
    );
  }
}
