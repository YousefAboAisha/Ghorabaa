import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Martyr from "@/app/models/martyr";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const collection = db.collection("martyrs");

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const {
      id_number,
      first_name,
      father_name,
      grandfather_name,
      last_name,
      birth_date,
      death_date,
      city,
      neighborhood,
      bio,
    } = body;

    // Check if the user already exists
    const existingUser = await collection.findOne({ id_number });

    if (existingUser) {
      // If the user already exists, return an error response - Email is already exist
      return NextResponse.json(
        {
          error: "الشهيد الذي تريد إضافته موجود بالفعل!",
        },
        { status: 400 }
      );
    }

    // Create a new user using Mongoose
    const martyr = new Martyr({
      first_name,
      father_name,
      grandfather_name,
      last_name,
      birth_date,
      death_date,
      city,
      neighborhood,
      bio,
      comments: [],
    });

    await collection.insertOne(martyr);

    // Return the response
    return NextResponse.json(
      { message: "Martyr created", martyr },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating martyr:", error);
    return NextResponse.json({ error: "خطاً في الخادم " }, { status: 500 });
  }
}
