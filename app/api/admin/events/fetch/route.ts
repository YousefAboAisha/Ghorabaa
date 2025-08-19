// app/api/admin/events/fetch/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const eventsCollection = db.collection("events");

    const token = await getToken({ req, secret });

    if (!token || token.role === Role.USER) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const search = searchParams.get("search")?.trim();

    // Validate status if provided
    const matchStage: Record<string, unknown> = {};

    if (search) {
      matchStage.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    // Get paginated events
    const events = await eventsCollection
      .find(matchStage)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    // Count total events for pagination metadata
    const totalDocs = await eventsCollection.countDocuments(matchStage);

    return NextResponse.json(
      {
        data: events,
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
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
