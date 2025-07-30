// app/api/admin/users/fetch/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const usersCollection = db.collection("users");

    const token = await getToken({ req, secret });

    if (!token || token.role === Role.USER) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Validate role if provided
    const validRoles = Object.values(Role);
    const matchStage: Record<string, unknown> = {};

    if (role && validRoles.includes(role as Role)) {
      matchStage.role = role;
    }

    // Get paginated users
    const users = await usersCollection
      .find(matchStage)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    // Count total users for pagination metadata
    const totalDocs = await usersCollection.countDocuments(matchStage);

    return NextResponse.json(
      {
        data: users,
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
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
