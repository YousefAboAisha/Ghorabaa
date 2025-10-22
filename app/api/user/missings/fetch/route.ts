import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { MissingStatus } from "@/app/enums";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");

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
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
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
                effectiveDate: 1,
              },
            },
            { $sort: { effectiveDate: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      },
      {
        $project: {
          data: 1,
          pagination: {
            total: { $arrayElemAt: ["$metadata.total", 0] },
            page: { $literal: page },
            limit: { $literal: limit },
            totalPages: {
              $ceil: {
                $divide: [{ $arrayElemAt: ["$metadata.total", 0] }, limit],
              },
            },
          },
        },
      },
    ];

    const result = await db.collection("missings").aggregate(pipeline).next();

    const total = result?.pagination?.total || 0;

    return NextResponse.json(
      {
        data: result?.data || [],
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
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
