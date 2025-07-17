// app/api/admin/massacres/fetch/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { Role, StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const massacresCollection = db.collection("massacres");

    const token = await getToken({ req, secret });

    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Validate role if provided
    const validStatus = Object.values(StoryStatus);
    const matchStage: Record<string, unknown> = {};

    if (status && validStatus.includes(status as StoryStatus)) {
      matchStage.role = status;
    }

    // Get paginated massacres
    const massacres = await massacresCollection
      .find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    // Count total massacres for pagination metadata
    const totalDocs = await massacresCollection.countDocuments(matchStage);

    return NextResponse.json(
      {
        data: massacres,
        pagination: {
          total: totalDocs,
          page,
          limit,
          totalPages: Math.ceil(totalDocs / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching massacres:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
