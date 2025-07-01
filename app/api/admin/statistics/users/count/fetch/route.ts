import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { Role } from "@/app/enums";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");

    const users = db.collection("users");

    // Aggregate counts by role
    const roleCounts = await users
      .aggregate([
        {
          $group: {
            _id: "$role",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    // Prepare result object with default values
    const result = {
      total: 0,
      user: 0,
      editor: 0,
      admin: 0,
    };

    // Fill in counts
    for (const role of roleCounts) {
      const r = role._id;
      const count = role.count;
      result.total += count;

      if (r === Role.USER) result.user = count;
      else if (r === Role.EDITOR) result.editor = count;
      else if (r === Role.ADMIN) result.admin = count;
    }

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user counts:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
