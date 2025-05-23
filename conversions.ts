import { Role } from "./app/enums";

export const dateConversion = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // for صباحًا/مساءً
  };

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("EN", options);

  return formattedDate;
};

export const arabicDateConversion = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("ar-EG", options);

  return formattedDate;
};

export function getRoleInArabic(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return "مشرف";
    case Role.EDITOR:
      return "محرر";
    case Role.USER:
      return "مستخدم عادي";
    default:
      return "غير معروف"; // Unknown
  }
}

export function normalizeArabic(text: string) {
  return text
    .replace(/[\u064B-\u0652]/g, "") // Remove diacritics
    .replace(/[إأآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\w\s]/gi, "") // Remove punctuation
    .trim();
}
