// app/api/upload/route.ts (for App Router)
import cloudinary from "@/app/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image, folder } = await req.json(); // base64 string or remote URL

    const extractedFolder = folder || "stories";

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: extractedFolder,
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    });

    console.log("Upload Response:", uploadResponse);

    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
