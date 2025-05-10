import clientPromise from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";
import { Role } from "@/app/enums";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const { name, email, password, phoneNumber, profession, leasingType } =
      body;

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // If the user already exists, return an error response - Email is already exist
      return NextResponse.json(
        {
          error:
            "البريد الالكتروني مستخدم بالفعل، قم بتسجيل الدخول بدلاً من الانضمام",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using Mongoose
    const userRole = Role.USER;
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      profession,
      leasingType,
      role: userRole,
    });

    console.log("New User has been created:", user);

    await collection.insertOne(user);
    await createSession(user._id.toString(), name, email, userRole);

    // Return the response
    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating customer:", error);
    return NextResponse.json({ error: "خطاً في الخادم " }, { status: 500 });
  }
}
