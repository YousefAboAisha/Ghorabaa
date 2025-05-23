import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import Story from "@/app/models/story";
import { StoryStatus } from "@/app/enums";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(originalReq: Request) {
  // ✅ Clone request before passing to getToken or reading the body
  const req = originalReq.clone();
  const nextReq = new NextRequest(req);

  // ✅ Authenticate user
  const token = await getToken({ req: nextReq, secret });

  console.log("Token values [server]", token);

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  // // ✅ Optional: Role-based access control
  // if (token.role !== "ADMIN") {
  //   return NextResponse.json(
  //     { error: "You do not have permission to perform this action." },
  //     { status: 403 }
  //   );
  // }

  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("stories");

    const body = await originalReq.json(); // Now it's safe to read
    console.log("Raw Request Body:", body);

    // const { id_number } = body;

    // const existingUser = await collection.findOne({ id_number });

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: "الشهيد الذي تريد إضافته موجود بالفعل!" },
    //     { status: 400 }
    //   );
    // }

    const story = new Story({
      ...body,
      publisher_id: token.id,
      status: StoryStatus.PENDING,
      hasCompleteProfile: true,
      createdAt: new Date(),
    });

    await collection.insertOne(story);

    return NextResponse.json(
      { message: "story created", story },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إضافة الشهيد." },
      { status: 500 }
    );
  }
}
