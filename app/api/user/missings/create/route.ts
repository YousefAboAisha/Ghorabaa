import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { StoryStatus } from "@/app/enums";

export async function POST(originalReq: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("missings");

    const body = await originalReq.json();

    // Extract all fields from the form
    const {
      reporter_name,
      reporter_phone_number,
      reporter_location,
      id_number,
      title,
      nickname,
      gender,
      birth_date,
      missing_date,
      location,
      details,
      image,
      keywords,
      // Remove bio since we're using details instead
      ...rest
    } = body;

    // Validate required fields
    if (!id_number) {
      return NextResponse.json({ error: "رقم الهوية مطلوب" }, { status: 400 });
    }

    if (!reporter_name) {
      return NextResponse.json({ error: "اسم المُبلغ مطلوب" }, { status: 400 });
    }

    if (!reporter_phone_number) {
      return NextResponse.json(
        { error: "رقم هاتف المُبلغ مطلوب" },
        { status: 400 }
      );
    }

    if (!title?.first_name || !title?.father_name || !title?.last_name) {
      return NextResponse.json(
        { error: "الاسم الأول واسم الأب واسم العائلة مطلوبة" },
        { status: 400 }
      );
    }

    if (!gender) {
      return NextResponse.json({ error: "الجنس مطلوب" }, { status: 400 });
    }

    if (!birth_date) {
      return NextResponse.json(
        { error: "تاريخ الميلاد مطلوب" },
        { status: 400 }
      );
    }

    if (!missing_date) {
      return NextResponse.json({ error: "تاريخ الفقد مطلوب" }, { status: 400 });
    }

    if (!details) {
      return NextResponse.json(
        { error: "تفاصيل الفقد مطلوبة" },
        { status: 400 }
      );
    }

    // Check if missing person with this ID already exists
    const existingMissing = await collection.findOne({ id_number });

    if (existingMissing) {
      return NextResponse.json(
        { error: "بيانات المفقود برقم الهوية المُدخل موجودة بالفعل" },
        { status: 409 }
      );
    }

    // Calculate age
    const age =
      birth_date && missing_date
        ? new Date(missing_date).getFullYear() -
          new Date(birth_date).getFullYear()
        : null;

    // Create new missing person document
    const newMissing = {
      // Reporter information
      reporter_name,
      reporter_phone_number,
      reporter_location: reporter_location || {
        city: "",
        neighborhood: "",
      },

      // Missing person identification
      id_number,
      title: {
        first_name: title.first_name || "",
        father_name: title.father_name || "",
        grandFather_name: title.grandFather_name || "",
        last_name: title.last_name || "",
      },
      nickname: nickname || "",
      gender,

      // Dates and age
      birth_date: new Date(birth_date),
      missing_date: new Date(missing_date),
      age,

      // Location of disappearance
      location: location || {
        city: "",
        neighborhood: "",
      },

      details, // Using details instead of bio
      image: image || "",
      keywords: keywords || [],

      // System fields
      status: StoryStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      ...rest,
    };

    // Insert new missing person record
    const missing = await collection.insertOne(newMissing);

    return NextResponse.json(
      {
        data: missing,
        message: "تم إرسال طلب إضافة بيانات المفقود بنجاح",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating missing person record:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء محاولة إضافة بيانات المفقود" },
      { status: 500 }
    );
  }
}
