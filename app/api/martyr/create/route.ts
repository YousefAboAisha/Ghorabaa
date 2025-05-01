import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Martyr from "@/app/models/story";

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("ghorabaa");
  const collection = db.collection("martyrs");

  // Parse the request body
  const body = await req.json();
  console.log("Raw Request Body:", body);

  const { id_number } = body;

  // Check if the user already exists
  const existingUser = await collection.findOne({ id_number });

  if (existingUser) {
    return NextResponse.json(
      {
        error: "الشهيد الذي تريد إضافته موجود بالفعل!",
      },
      { status: 400 }
    );
  }

  // Create a new user using Mongoose
  const martyr = new Martyr({ ...body });

  await collection.insertOne(martyr);

  // Return the response
  return NextResponse.json(
    { message: "Martyr created", martyr },
    { status: 201 }
  );
}
