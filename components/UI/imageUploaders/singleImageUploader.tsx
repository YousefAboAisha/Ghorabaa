"use client";
import React, { useEffect } from "react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { CiImageOn } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { compressImage, validateImage } from "@/utils/image";

interface Props {
  images: ImageListType;
  setImages: (images: ImageListType) => void;
  setFieldValue: (field: string, value: string | null) => void;
  uploadError: string | null;
  setUploadError: (error: string | null) => void;
  isSubmitting?: boolean;
  existingImageUrl?: string;
}

const SingleImageUploader = ({
  images,
  setImages,
  setFieldValue,
  uploadError,
  setUploadError,
  isSubmitting = false,
  existingImageUrl,
}: Props) => {
  useEffect(() => {
    if (existingImageUrl && !images.length) {
      setImages([{ data_url: existingImageUrl }]);
      setFieldValue("image", existingImageUrl);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingImageUrl]);

  return (
    <fieldset
      disabled={isSubmitting}
      className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ReactImageUploading
        multiple={false}
        value={images}
        onChange={async (imageList) => {
          setUploadError(null);
          try {
            if (imageList.length > 0) {
              const image = imageList[0];
              validateImage(image);
              const compressedFile = await compressImage(image.file!);
              const compressedImage = {
                ...image,
                file: compressedFile,
                data_url: await new Promise<string>((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result as string);
                  reader.readAsDataURL(compressedFile);
                }),
              };
              setImages([compressedImage]);
              setFieldValue("image", compressedImage.data_url);
            } else {
              setImages([]);
              setFieldValue("image", null);
            }
          } catch (error) {
            setUploadError(
              error instanceof Error ? error.message : "حدث خطأ غير متوقع"
            );
            setImages([]);
            setFieldValue("image", null);
          }
        }}
        maxNumber={1}
        dataURLKey="data_url"
        acceptType={["jpg", "jpeg", "png", "webp"]}
      >
        {({ onImageUpload, onImageRemove, isDragging, dragProps }) => (
          <div className="flex flex-col gap-4">
            {/* Upload Trigger */}
            <div
              className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 rounded-xl ${
                images.length > 0
                  ? "border-gray-300"
                  : "border-secondary/50 hover:border-secondary"
              } cursor-pointer transition-colors`}
              style={isDragging ? { borderColor: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <div className="relative w-16 h-16">
                <CiImageOn
                  size={64}
                  className="text-gray-300 absolute inset-0"
                />
              </div>
              <span className="text-sm text-theme text-center">
                اسحب وأفلت الصورة هنا أو انقر للاختيار
              </span>
              <div className="text-xs text-gray-500 mt-2">
                <p>✓ الصور المدعومة: JPEG, PNG, JPG, WebP</p>
                <p>✓ الحد الأقصى للحجم: 5MB</p>
                <p>✓ قم بإرفاق صورة واحدة فقط </p>
                {uploadError && <p className="text-red-500">✗ {uploadError}</p>}
              </div>
            </div>

            {/* Image Preview */}
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-32 h-32 aspect-square rounded-xl overflow-hidden border"
              >
                <Image
                  src={image.data_url}
                  alt="صورة الشهيد"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => {
                    onImageRemove(index);
                    setFieldValue("image", null);
                  }}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition-colors"
                  aria-label="حذف الصورة"
                  title="حذف الصورة"
                  disabled={isSubmitting}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </ReactImageUploading>
    </fieldset>
  );
};

export default SingleImageUploader;
