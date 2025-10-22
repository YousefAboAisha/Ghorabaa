// app/api/user/missings/check-id-validity/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id_numberParam = searchParams.get("id_number");

    if (!id_numberParam) {
      return NextResponse.json(
        { error: "id_number is required" },
        { status: 400 }
      );
    }

    // Validate ID number format
    if (id_numberParam.length !== 9) {
      return NextResponse.json(
        { error: "id_number must be exactly 9 digits" },
        { status: 400 }
      );
    }

    const id_number = Number(id_numberParam);

    if (isNaN(id_number)) {
      return NextResponse.json(
        { error: "id_number must be a number" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const missingsCollection = db.collection("missings");

    // Add proper query with string comparison if needed
    const missing = await missingsCollection.findOne({
      id_number: id_numberParam, // Try as string first
    });

    // If not found as string, try as number
    if (!missing) {
      await missingsCollection.findOne({
        id_number: id_number,
      });
    }

    if (missing) {
      return NextResponse.json({
        _id: missing._id.toString(), // Ensure _id is string
        exists: true,
      });
    }

    return NextResponse.json({
      exists: false,
    });
  } catch (err) {
    console.error("Error checking id_number:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
