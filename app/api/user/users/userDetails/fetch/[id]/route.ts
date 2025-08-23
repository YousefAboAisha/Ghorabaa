import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
// import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });
  }

  try {
    const token = await getToken({ req, secret });
    // const isOwner = id === token?.id;
    // const isAdmin = token?.role == Role.ADMIN;

    // if (!(isOwner || isAdmin)) {
    //   return NextResponse.json(
    //     { error: "غير مصرح لك، الرجاء تسجيل الدخول!" },
    //     { status: 401 }
    //   );
    // }

    if (!token) {
      return NextResponse.json(
        { error: "غير مصرح لك، الرجاء تسجيل الدخول!" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("users");

    const data = await collection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
