import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { MassacreStatus, Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function PUT(
  originalReq: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  const token = await getToken({ req: nextReq, secret });

  if (!token || token.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const massacreCollection = db.collection("massacres");

    // Validate required inputs
    if (!id) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const story = await massacreCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!story) {
      return NextResponse.json(
        { error: "المجزرة غير موجودة!" },
        { status: 404 }
      );
    }

    if (!story.publisher_id) {
      return NextResponse.json(
        { error: "يجب إضافة معرف ناشر المجزرة" },
        { status: 500 }
      );
    }

    // Update the story
    await massacreCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: MassacreStatus.ARCHIVED,
          approvedBy: new ObjectId(token.id),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: `Story ${MassacreStatus.ARCHIVED.toLowerCase()}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
