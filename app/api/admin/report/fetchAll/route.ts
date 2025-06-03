import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { Role } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const reportsCollection = db.collection("reports");
    const token = await getToken({ req, secret });

    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const reports = await reportsCollection
      .aggregate([
        // First, lookup the reporter info
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "reporter",
          },
        },
        {
          $unwind: {
            path: "$reporter",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Second, lookup the reported user via content.author_id
        {
          $lookup: {
            from: "users",
            let: { authorId: "$content.author_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$authorId"] } } },
              { $project: { name: 1, image: 1, role: 1 } },
            ],
            as: "reported_user",
          },
        },
        {
          $unwind: {
            path: "$reported_user",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Final projection
        {
          $project: {
            _id: 1,
            reason: 1,
            details: 1,
            status: 1,
            content: 1,
            content_type: 1,
            createdAt: 1,
            user_id: 1,
            content_id: 1,

            // Reporter
            reporter_name: "$reporter.name",
            reporter_image: "$reporter.image",
            reporter_role: "$reporter.role",

            // Reported user (author of comment)
            reported_user_id: "$content.author_id",
            reported_user_name: "$reported_user.name",
            reported_user_image: "$reported_user.image",
            reported_user_role: "$reported_user.role",
          },
        },
      ])
      .toArray();

    return NextResponse.json({ data: reports }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
