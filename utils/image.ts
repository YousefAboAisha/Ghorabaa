import imageCompression from "browser-image-compression";
import { ImageListType } from "react-images-uploading";

export const compressImage = async (file: File): Promise<File> => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error compressing image:", error);
    return file; // Fallback to original
  }
};

// Image validation
export const validateImage = (image: ImageListType[0]) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];
  if (!image.file) {
    throw new Error("ملف الصورة غير موجود");
  }

  if (!ALLOWED_FILE_TYPES.includes(image.file.type)) {
    throw new Error(
      `نوع الملف غير مدعوم. يرجى تحميل صورة بصيغة ${ALLOWED_FILE_TYPES.join(
        " أو "
      )}`
    );
  }

  if (image.file.size > MAX_FILE_SIZE) {
    throw new Error(
      `حجم الملف كبير جدًا. الحد الأقصى للحجم هو ${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB`
    );
  }

  if (!image.data_url || !image.data_url.startsWith("data:image")) {
    throw new Error("صيغة الصورة غير صالحة");
  }

  return true;
};
