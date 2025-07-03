import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/app/lib/mongodb";
import { Role } from "@/app/enums";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phoneNumber, password } = await req.json();

    if (!name || !email || !password || !phoneNumber) {
      return NextResponse.json(
        { error: "بعض الحقول مفقودة!" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await users.insertOne({
      name,
      email,
      phone_number: phoneNumber,
      password: hashedPassword,
      provider: "credentials",
      role: Role.USER,
      image: "",
      favorites: [],
      createdAt: new Date(),
    });

    // Fetch inserted user
    const insertedUser = await users.findOne({ _id: result.insertedId });

    if (!insertedUser) {
      return NextResponse.json(
        { error: "تعذر العثور على المستخدم بعد الإنشاء" },
        { status: 500 }
      );
    }

    // Return minimal data (safe for frontend)
    return NextResponse.json({
      message: "تم إنشاء الحساب بنجاح",
      user: {
        id: insertedUser._id.toString(),
        name: insertedUser.name,
        email: insertedUser.email,
        role: insertedUser.role,
        image: insertedUser.image,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الحساب" },
      { status: 500 }
    );
  }
}
