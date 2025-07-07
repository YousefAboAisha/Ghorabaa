// /app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/app/lib/mongodb";
import { sendEmailOTP } from "@/utils/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phoneNumber, password } = await req.json();

    if (!name || !email || !phoneNumber || !password) {
      return NextResponse.json({ error: "بعض الحقول مفقودة" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const usersCollection = db.collection("users");
    const otpCollection = db.collection("email_otps");

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مستخدم بالفعل، قم بتسجيل الدخول!" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Remove any previous signup for this email
    await otpCollection.deleteMany({ email });

    await otpCollection.insertOne({
      email,
      otp,
      expiresAt,
      tempData: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
      },
    });

    await sendEmailOTP(email, otp);

    return NextResponse.json(
      { message: "تم إرسال رمز التحقق" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "فشل إنشاء الحساب المؤقت" },
      { status: 500 }
    );
  }
}
