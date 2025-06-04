// app/api/admin/report/reject/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { Role, ReportStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json({ error: "غير مصرح لك" }, { status: 403 });
    }

    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const reportsCollection = db.collection("reports");

    // Step 1: Get the report document
    const report = await reportsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!report) {
      return NextResponse.json(
        { error: "لم يتم العثور على الإبلاغ" },
        { status: 404 }
      );
    }

    const content_id = report.content?._id;

    if (!content_id) {
      return NextResponse.json(
        { error: "المحتوى المرتبط بالإبلاغ غير موجود" },
        { status: 404 }
      );
    }

    const result = await db
      .collection("comments")
      .deleteOne({ _id: new ObjectId(content_id) });

    // Step 3: Optionally update report status
    await reportsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: ReportStatus.RESOLVED } }
    );

    return NextResponse.json({
      message: "تم حذف المحتوى المرتبط بالإبلاغ",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error accepting report:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
