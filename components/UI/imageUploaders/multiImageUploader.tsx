/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { CiImageOn } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";
import { getFileUniqueKey } from "@/utils/file";
import { compressImage, validateImage } from "@/utils/image";

interface ImageData {
  data_url: string;
  image_url: string;
}

interface ImagesObject {
  [key: string]: ImageData;
}

interface MultiImageUploaderProps {
  maxImages?: number;
  onImagesChange: (images: string[]) => void;
  onCoverImageChange: (coverImage: string) => void;
  initialImages?: ImagesObject;
  folderName: string;
  cover_image: string;
  uploadStatus: {
    loading: boolean;
    progress: number;
    error: string | null;
  };
  setUploadStatus: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      progress: number;
      error: string | null;
    }>
  >;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  maxImages = 5,
  onImagesChange,
  onCoverImageChange,
  initialImages = {},
  folderName,
  cover_image,
  uploadStatus,
  setUploadStatus,
}) => {
  const [images, setImages] = useState<ImagesObject>(initialImages);

  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(
    cover_image
  );

  console.log("MultiImageUploader initial images:", initialImages);

  const uploadSingleImage = async (file: File): Promise<string> => {
    let processedFile = file;

    if (file.size > 1 * 1024 * 1024) {
      processedFile = await compressImage(file);
    }

    const formData = new FormData();
    formData.append("image", processedFile);
    formData.append("folder", folderName);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/massacres`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.message || "فشل تحميل الصورة");
    }

    const data = await res.json();
    return data.url;
  };

  const handleImageUpload = async (imageList: ImageListType) => {
    if (!imageList || imageList.length === 0) return;

    try {
      // Validate all images first
      const validImages = imageList.filter((img) => {
        try {
          if (!img.file) throw new Error("صورة غير صالحة");
          validateImage(img);
          return true;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "خطأ في التحقق من الصورة";
          toast.error(`تم استبعاد صورة: ${message}`);
          return false;
        }
      });

      if (validImages.length === 0) {
        throw new Error("لا توجد صور صالحة للتحميل");
      }

      // Check remaining slots
      const remainingSlots = maxImages - Object.keys(images).length;
      if (remainingSlots <= 0) {
        throw new Error(`لقد وصلت إلى الحد الأقصى للصور (${maxImages})`);
      }

      const imagesToProcess = validImages.slice(0, remainingSlots);
      if (imagesToProcess.length < validImages.length) {
        toast.warning(
          `تم تحميل ${remainingSlots} صورة فقط (الحد الأقصى ${maxImages})`
        );
      }

      setUploadStatus({ loading: true, progress: 0, error: null });

      const uploadPromises = imagesToProcess.map(async (image, index) => {
        try {
          const imageUrl = await uploadSingleImage(image.file!);
          return {
            key: getFileUniqueKey(image.file!),
            data: {
              data_url: image.data_url!,
              image_url: imageUrl,
            },
          };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "فشل التحميل";
          toast.error(`فشل تحميل صورة ${index + 1}: ${message}`);
          return null;
        } finally {
          // Update progress after each upload
          setUploadStatus((prev) => ({
            ...prev,
            progress: Math.round(((index + 1) / imagesToProcess.length) * 100),
          }));
        }
      });

      const uploadResults = await Promise.all(uploadPromises);
      const successfulUploads = uploadResults.filter(Boolean) as Array<{
        key: string;
        data: ImageData;
      }>;

      if (successfulUploads.length === 0) {
        throw new Error("فشل تحميل جميع الصور");
      }

      const newImages = { ...images };
      successfulUploads.forEach(({ key, data }) => {
        newImages[key] = data;
      });

      setImages(newImages);
      onImagesChange(Object.values(newImages).map((img) => img.image_url));

      // Auto-select cover if needed
      if (!selectedCoverImage || !newImages[selectedCoverImage]) {
        const firstImage = successfulUploads[0].data.image_url;
        onCoverImageChange(firstImage);
        setSelectedCoverImage(firstImage);
      }

      toast.success(`تم تحميل ${successfulUploads.length} صورة بنجاح`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع";
      setUploadStatus({
        loading: false,
        progress: 0,
        error: message,
      });
      toast.error(message);
    } finally {
      setUploadStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleRemoveImage = (uniqueKey: string) => {
    if (!images[uniqueKey]) return;

    const newImages = { ...images };
    delete newImages[uniqueKey];

    setImages(newImages);
    onImagesChange(Object.values(newImages).map((img) => img.image_url));

    // Handle cover image
    if (images[uniqueKey].image_url === selectedCoverImage) {
      const newCoverImage = Object.values(newImages)[0]?.image_url || "";
      onCoverImageChange(newCoverImage);
      setSelectedCoverImage(newCoverImage || null);
    }
  };

  useEffect(() => {
    // If cover image exists in current images, keep it
    if (selectedCoverImage) {
      const coverExists = Object.values(images).some(
        (img) => img.image_url === selectedCoverImage
      );
      if (!coverExists) {
        // If cover image doesn't exist in current images, clear it
        onCoverImageChange("");
        setSelectedCoverImage(null);

        // Auto-select new cover if images exist
        if (Object.keys(images).length > 0) {
          const firstImage = Object.values(images)[0].image_url;
          onCoverImageChange(firstImage);
          setSelectedCoverImage(firstImage);
        }
      }
    } else if (Object.keys(images).length > 0) {
      // If no cover selected but images exist, auto-select first
      const firstImage = Object.values(images)[0].image_url;
      onCoverImageChange(firstImage);
      setSelectedCoverImage(firstImage);
    }
  }, [images, selectedCoverImage, onCoverImageChange]);

  useEffect(() => {
    if (initialImages) {
      setImages(initialImages);
    }
  }, [initialImages]);

  return (
    <fieldset
      disabled={uploadStatus.loading}
      className="relative group disabled:opacity-50 disabled:cursor-not-allowed mt-4"
    >
      <ReactImageUploading
        multiple
        value={[]} // We don't need to pass existing images here
        onChange={handleImageUpload}
        maxNumber={maxImages}
        dataURLKey="data_url"
        acceptType={["jpg", "jpeg", "png", "webp"]}
      >
        {({ onImageUpload, dragProps }) => (
          <div className="flex flex-col gap-4">
            {/* Upload Trigger */}
            <div
              className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 rounded-xl ${
                Object.keys(images).length > 0
                  ? "border-gray-300"
                  : "border-primary/50 hover:border-primary"
              } cursor-pointer transition-colors`}
              onClick={onImageUpload}
              {...dragProps}
            >
              <div className="relative w-16 h-16">
                <CiImageOn
                  size={64}
                  className="text-gray-300 absolute inset-0"
                />
                {Object.keys(images).length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {Object.keys(images).length}
                  </span>
                )}
              </div>

              <span className="text-sm text-theme text-center">
                اضغط هنا أو اسحب الصور لتحميلها
              </span>

              <div className="text-xs text-gray-500 mt-2">
                <p>✓ الصور المدعومة: JPEG, PNG, Jpg, WebP</p>
                <p>✓ الحجم الأقصى للصورة: 5 MB</p>
                <p>✓ أقصى عدد للصور: {maxImages} صور</p>
                {uploadStatus.error && (
                  <p className="text-red-500">✗ {uploadStatus.error}</p>
                )}
              </div>
            </div>

            {/* Upload Progress */}
            {uploadStatus.loading && (
              <div className="flex flex-col gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadStatus.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="animate-pulse">⏳</span>
                  جارٍ الرفع... ({uploadStatus.progress}%)
                </div>
              </div>
            )}

            {/* Image Preview Grid */}
            <div className="flex items-center flex-wrap gap-4 mt-4">
              {Object.entries(images).map(([uniqueKey, imageData]) => (
                <div
                  onClick={() => {
                    onCoverImageChange(imageData.image_url);
                    setSelectedCoverImage(imageData.image_url);
                  }}
                  key={uniqueKey}
                  className={`relative w-24 h-24 aspect-square rounded-2xl cursor-pointer overflow-hidden border-2 ${
                    imageData.image_url === selectedCoverImage
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={imageData.image_url || imageData.data_url}
                    alt="preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  {imageData.image_url === selectedCoverImage && (
                    <span className="absolute flex flex-col justify-center items-center gap-2 bottom-0 left-0 right-0 w-full h-full bg-[#1e272eb6] backdrop-blur-sm text-white font-semibold text-[10px] p-1 text-center">
                      <CiImageOn size={35} />
                      <span>صورة الغلاف</span>
                    </span>
                  )}

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(uniqueKey);
                    }}
                    className="absolute top-1 right-1 bg-white text-rejected p-1 rounded shadow hover:bg-gray-100 transition-colors"
                    aria-label="Remove image"
                    title="Remove image"
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </ReactImageUploading>
    </fieldset>
  );
};

export default MultiImageUploader;
