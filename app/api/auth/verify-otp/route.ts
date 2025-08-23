// /app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { Role } from "@/app/enums";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "البريد أو الرمز مفقود" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const otpCollection = db.collection("email_otps");
    const usersCollection = db.collection("users");

    const record = await otpCollection.findOne({ email, otp });

    if (!record) {
      return NextResponse.json({ error: "رمز غير صحيح" }, { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "انتهت صلاحية الرمز" },
        { status: 400 }
      );
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "تم إنشاء الحساب مسبقاً" },
        { status: 409 }
      );
    }

    const { name, phoneNumber, password } = record.tempData;

    await usersCollection.insertOne({
      name,
      email,
      phone_number: phoneNumber,
      password,
      provider: "credentials",
      isVerified: true,
      role: Role.USER,
      image: "",
      favorites: [],
      createdAt: new Date(),
    });

    await otpCollection.deleteOne({ email, otp });

    return NextResponse.json(
      { message: "تم التحقق وإنشاء الحساب" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Verify OTP error:", err);
    return NextResponse.json({ error: "فشل التحقق" }, { status: 500 });
  }
}
