// app/api/upload/route.ts
import cloudinary from "@/app/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Handle both JSON and FormData
    const contentType = req.headers.get("content-type");

    let imageData: string;
    const folder = "missings";

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("image") as File;
      const buffer = await file.arrayBuffer();
      imageData = `data:${file.type};base64,${Buffer.from(buffer).toString(
        "base64"
      )}`;
    } else {
      const { image } = await req.json();
      imageData = image;
    }

    const uploadResponse = await cloudinary.uploader.upload(imageData, {
      folder,
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    });

    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "فشل رفع الصورة" },
      { status: 500 }
    );
  }
}
