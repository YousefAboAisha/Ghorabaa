import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // For password hashing and verification
import { createSession } from "@/app/lib/session";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Parse the request body
    const body = await req.json();
    const { email, password, rememberMe, _id } = body;

    console.log("Sign-in Request Body:", { email, password, rememberMe, _id });

    // Check if the customer exists
    const customer = await collection.findOne({ email });

    if (!customer) {
      // If the customer does not exist, return an error
      return NextResponse.json(
        { error: "البريد الالكتروني غير مُسجل، قم بالانضمام إلينا أولاً" }, // Email not registered
        { status: 404 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      // If the password is invalid, return an error
      return NextResponse.json(
        { error: "الرجاء التأكد من كلمة المرور" }, // Incorrect password
        { status: 401 }
      );
    }

    // If the email and password are valid, return the customer's object
    // Exclude sensitive data like the password before sending the response

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...customerData } = customer;

    await createSession(customer._id.toString(), email);

    return NextResponse.json(
      { message: "تم تسجيل الدخول بنجاح", customer: customerData }, // Sign-in successful
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
