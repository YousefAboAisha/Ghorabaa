import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { MissingStatus, Role } from "@/app/enums";

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

  if (!token || token.role === Role.USER) {
    return NextResponse.json({ error: "غير مصرح لك!" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const massacreCollection = db.collection("missings");

    // Validate required inputs
    if (!id) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const missing = await massacreCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!missing) {
      return NextResponse.json(
        { error: "المفقود غير موجودة!" },
        { status: 404 }
      );
    }

    // Update the missing
    await massacreCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: MissingStatus.APPROVED,
          approvedBy: new ObjectId(token.id),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: `missing ${MissingStatus.APPROVED.toLowerCase()}` },
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
