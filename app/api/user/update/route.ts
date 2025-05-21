import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token || !token.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, phone_number, id_number } = await req.json();

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { email: token.email },
      {
        $set: {
          name,
          phone_number,
          id_number,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "لم تقم بأي تغييرات على البيانات!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "تم تحديث البيانات بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "خطأ أثناء تحديث البيانات" },
      { status: 500 }
    );
  }
}
