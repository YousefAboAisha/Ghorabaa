import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";
import { ProviderTypes } from "@/app/enums";

export async function POST(req: Request) {
  const client = await clientPromise.catch((err) => {
    console.error("MongoDB connection error:", err);
    return null;
  });

  if (!client) {
    return NextResponse.json(
      { error: "فشل في الاتصال بقاعدة البيانات" },
      { status: 500 }
    );
  }

  const db = client.db("ghorabaa");
  const collection = db.collection("users");

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { error: "تنسيق الطلب غير صالح" },
      { status: 400 }
    );
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "البريد وكلمة المرور مطلوبان" },
      { status: 400 }
    );
  }

  const user = await collection.findOne({ email }).catch((err) => {
    console.error("User lookup failed:", err);
    return null;
  });

  if (!user) {
    return NextResponse.json(
      { error: "البريد الالكتروني غير مُسجل، قم بإنشاء حساب أولاً" },
      { status: 404 }
    );
  }

  if (user.provider === ProviderTypes.GOOGLE) {
    return NextResponse.json(
      {
        error:
          "البريد الالكتروني مُسجل بحساب جوجل، قم بتسجيل الدخول باستخدام حساب جوجل",
      },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt
    .compare(password, user.password)
    .catch(() => false);

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: "الرجاء التأكد من كلمة المرور" },
      { status: 401 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, name, role, ...userData } = user;

  const sessionResult = await createSession(
    user._id.toString(),
    name,
    email,
    role
  ).catch((err) => {
    console.error("Session creation failed:", err);
    return null;
  });

  if (!sessionResult) {
    return NextResponse.json({ error: "فشل في إنشاء الجلسة" }, { status: 500 });
  }

  return NextResponse.json(
    { message: "تم تسجيل الدخول بنجاح", user: userData },
    { status: 200 }
  );
}
