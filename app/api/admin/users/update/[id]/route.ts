import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { Role, NotificationTypes } from "@/app/enums";
import { User } from "next-auth";
import { getRoleInArabic } from "@/utils/text";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function POST(req: NextRequest, { params }: { params: Params }) {
  // This is user ID
  const { id } = await params;

  try {
    const token = await getToken({ req, secret });

    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, phone_number, id_number, role } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "معرف المستخدم غير صالح" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const usersCollection = db.collection<User>("users");
    const notificationsCollection = db.collection("notifications");

    // Fetch existing user
    const existingUser = await usersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
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

    // 🔔 Notify user if role has changed
    if (role && role !== existingUser.role) {
      const notificationPayload = {
        user_id: new ObjectId(id),
        href: `/profile`,
        message: `تم تحديث صلاحية حسابك في المنصة إلى: ${getRoleInArabic(
          role
        )}`,
        notification_type: NotificationTypes.UPDATE,
        is_read: false,
        createdAt: new Date(),
      };

      await notificationsCollection.insertOne(notificationPayload);
    }

    return NextResponse.json(
      { message: "تم تعديل المستخدم بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
