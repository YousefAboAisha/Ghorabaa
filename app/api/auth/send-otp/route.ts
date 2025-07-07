import clientPromise from "@/app/lib/mongodb";
import { sendEmailOTP } from "@/utils/email";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "البريد الإلكتروني مطلوب" }), {
      status: 400,
    });
  }

  const client = await clientPromise;
  const db = client.db("ghorabaa");

  const users = db.collection("users");
  const otps = db.collection("email_otps");

  const existingUser = await users.findOne({ email });

  // If user already exists and is verified, block sending OTP
  if (existingUser && existingUser.isVerified) {
    return new Response(
      JSON.stringify({ error: "البريد الإلكتروني مستخدم بالفعل" }),
      { status: 409 }
    );
  }

  // Optional: clear any previous unexpired OTPs for this email
  await otps.deleteMany({ email });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await otps.insertOne({ email, otp, expiresAt });

  await sendEmailOTP(email, otp);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
