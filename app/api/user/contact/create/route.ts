import ContactMessageModel from "@/app/models/contactMessage";
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { title, details } = await request.json();

    if (!title || !details) {
      return NextResponse.json(
        { error: "العنوان والتفاصيل مطلوبان" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const contactMessagesCollection = db.collection("contact");

    // Create the message in database
    const newMessage = new ContactMessageModel({
      title,
      details,
    });

    await contactMessagesCollection.insertOne(newMessage);

    return NextResponse.json(
      {
        message: "تم إرسال رسالتك بنجاح",
        data: newMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إرسال الرسالة" },
      { status: 500 }
    );
  }
}
