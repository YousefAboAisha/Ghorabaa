import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { Role, MissingStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const token = await getToken({ req, secret });

    if (!token || token.role === Role.USER) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول إلى هذه الصفحة" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("query")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Build match stage
    const matchStage: Record<string, unknown> = {};

    if (
      status &&
      Object.values(MissingStatus).includes(status as MissingStatus)
    ) {
      matchStage.status = status;
    }

    if (search) {
      matchStage.$or = [
        { title: { $regex: search, $options: "i" } },
        { nickname: { $regex: search, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: {
                $concat: [
                  "$title.first_name",
                  " ",
                  "$title.father_name",
                  " ",
                  "$title.grandFather_name",
                  " ",
                  "$title.last_name",
                ],
              },
              regex: search,
              options: "i",
            },
          },
        },
      ];
    }

    const pipeline = [
      { $match: matchStage },
      // Lookup publisher
      {
        $lookup: {
          from: "users",
          localField: "publisher_id",
          foreignField: "_id",
          as: "publisher",
        },
      },
      { $unwind: "$publisher" },
      // Lookup approvedBy
      {
        $lookup: {
          from: "users",
          localField: "approvedBy",
          foreignField: "_id",
          as: "approvedByUser",
        },
      },
      {
        $unwind: {
          path: "$approvedByUser",
          preserveNullAndEmptyArrays: true, // allow null if not approved yet
        },
      },
      {
        $addFields: {
          effectiveDate: {
            $ifNull: ["$updatedAt", "$createdAt"],
          },
        },
      },
      {
        $project: {
          _id: 1,
          id_number: 1,
          image: 1,
          title: 1,
          age: 1,
          gender: 1,
          profession: 1,
          nickname: 1,
          birth_date: 1,
          missing_date: 1,
          location: 1,
          details: 1,
          status: 1,
          keywords: 1,
          createdAt: 1,
          updatedAt: 1,
          publisher_id: 1,
          visits: 1,
          reporter_name: 1,
          reporter_phone_number: 1,
          reporter_location: 1,
          publisher_name: "$publisher.name",
          approvedBy: "$approvedByUser.name",
          effectiveDate: 1,
        },
      },
      { $sort: { effectiveDate: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];

    const totalDocs = await db
      .collection("missings")
      .countDocuments(matchStage);
    const missings = await db
      .collection("missings")
      .aggregate(pipeline)
      .toArray();

    return NextResponse.json(
      {
        data: missings,
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
    console.error("Error fetching missings:", error);
    return NextResponse.json(
      { error: "تعذر الوصول إلى السيرفر" },
      { status: 500 }
    );
  }
}
