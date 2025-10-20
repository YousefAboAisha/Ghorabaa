import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { MissingStatus, Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token || token.role === Role.USER) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, description, ...updateData } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid Missing ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const missingsCollection = db.collection("missings");

    // Fetch existing Missing
    const existingMissing = await missingsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingMissing) {
      return NextResponse.json(
        { error: "معلومات المفقود غير موجودة" },
        { status: 404 }
      );
    }

    const updateResult = await missingsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          status: MissingStatus.PENDING,
          updatedAt: new Date(),
        },
      } // ✅ include tags here
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "لم يتم القيام بأي تغييرات" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Missing updated successfully" });
  } catch (error) {
    console.error("Error updating Missing:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
