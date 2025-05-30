import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "معرف التعليق غير صالح" },
        { status: 400 }
      );
    }

    const token = await getToken({ req, secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const commentsCollection = db.collection("comments");

    // Get the comment to verify its author
    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });

    if (!comment) {
      return NextResponse.json(
        { error: "لم يتم العثور على التعليق" },
        { status: 404 }
      );
    }

    // Only allow deletion if the requester is the comment's author or an admin
    const isOwner = comment.author_id?.toString() === token.id;
    const isAdmin = token.role === Role.ADMIN; // Adjust if your roles differ

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "غير مصرح لك بحذف هذا التعليق" },
        { status: 403 }
      );
    }

    // Proceed to delete
    const result = await commentsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json(
      { message: "تم حذف التعليق", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف التعليق" },
      { status: 500 }
    );
  }
}
