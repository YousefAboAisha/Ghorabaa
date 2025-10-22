// /app/api/missing/delete/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token || token.role === Role.USER) {
      return NextResponse.json(
        { error: "غير مصرح لك. يرجى تسجيل الدخول." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "معرّف المفقودة غير صالح." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const missingsCollection = db.collection("missings");

    const existingmissing = await missingsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (!existingmissing) {
      return NextResponse.json(
        { error: "المفقودة غير موجودة." },
        { status: 404 }
      );
    }

    if (existingmissing.deletedCount === 0) {
      return NextResponse.json(
        { error: "فشل في حذف المفقودة." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "تم حذف قصة المفقود بشكل كلي." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting missing:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
