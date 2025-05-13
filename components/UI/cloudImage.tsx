"use client";
import { CldOgImage } from "next-cloudinary";

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function CloudImage() {
  return (
    <CldOgImage
      src="https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/sample.jpg" // Use this sample image or upload your own via the Media Explorer
      width="500" // Transform the image: auto-crop to square aspect_ratio
      height="500"
      crop={{
        type: "auto",
        source: true,
      }}
      alt="A sample image from Cloudinary" // Provide an alt text for accessibility
      className="mx-auto rounded-2xl shadow-xl z-[10] bg-[red]"
    />
  );
}
