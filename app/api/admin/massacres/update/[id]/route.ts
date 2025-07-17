import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;
type Params = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...updateData } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid massacre ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const massacresCollection = db.collection("massacres");

    // Fetch existing massacre
    const existingMassacre = await massacresCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingMassacre) {
      return NextResponse.json(
        { error: "معلومات المجزرة غير موجودة" },
        { status: 404 }
      );
    }

    const updateResult = await massacresCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "No changes made" }, { status: 400 });
    }

    return NextResponse.json({ message: "Massacre updated successfully" });
  } catch (error) {
    console.error("Error updating massacre:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
