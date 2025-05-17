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
