import {
  ContentType,
  Gender,
  MassacreStatus,
  NotificationTypes,
  ReportReasons,
  ReportStatus,
  Role,
  StoryStatus,
} from "@/app/enums";
import { ReportReasonsData } from "@/data/reportReasonsData";
import { AiOutlineComment } from "react-icons/ai";
import { BiBell, BiCheckCircle } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { GiTrashCan } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { PiUserGear } from "react-icons/pi";

export const getStoryStatusToArabic = (status: StoryStatus): string => {
  switch (status) {
    case StoryStatus.IMPORTED:
      return "مستوردة";
    case StoryStatus.PENDING:
      return "قيد المراجعة";
    case StoryStatus.APPROVED:
      return "مقبولة";
    case StoryStatus.REJECTED:
      return "مرفوضة";
    default:
      return "غير معروف";
  }
};

export function getRoleInArabic(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return "مشرف";
    case Role.EDITOR:
      return "محرر";
    case Role.USER:
      return "مستخدم";
    default:
      return "غير معروف"; // Unknown
  }
}

export const getNotificationHrefPath = (
  type: NotificationTypes,
  story_id: string
) => {
  switch (type) {
    case NotificationTypes.COMMENT:
      return `/stories/${story_id}#comment`;

    case NotificationTypes.ACCEPT:
      return `/stories/${story_id}`;

    case NotificationTypes.REJECT:
      return `/profile?activeTap=${StoryStatus.REJECTED}#storyContainer`;

    default:
      return `/stories/${story_id}`;
  }
};

export const getRoleColor = (role: Role) => {
  switch (role) {
    case Role.ADMIN:
      return "#5B913B";
    case Role.EDITOR:
      return "#2980b9";
    case Role.USER:
      return "#1e272e"; // Dark color for stories
    default:
      return "#828282";
  }
};

export function getReportReasonLabel(reason: ReportReasons): string {
  return (
    ReportReasonsData.find((r) => r.value === reason)?.title ?? "سبب غير معروف"
  );
}

export function getContentTypeInArabic(content_type: ContentType): string {
  switch (content_type) {
    case ContentType.COMMENT:
      return "تعليق";
    case ContentType.STORY:
      return "قصة";
    default:
      return "غير معروف";
  }
}

export const getReportStatusInArabic = (status: ReportStatus): string => {
  switch (status) {
    case ReportStatus.PENDING:
      return "قيد المراجعة";
    case ReportStatus.DELETED:
      return "تم حذف المحتوى";
    case ReportStatus.KEPT:
      return "تم الإبقاء على المحتوى";
    default:
      return "غير معروف";
  }
};

export const getReportColor = (status: ReportStatus): string => {
  switch (status) {
    case ReportStatus.PENDING:
      return "bg-pending";
    case ReportStatus.KEPT:
      return "bg-approved";
    case ReportStatus.DELETED:
      return "bg-rejected";
    default:
      return "bg-gray-500"; // Default color for unknown status
  }
};

export const getStatusBorderColor = (status: StoryStatus): string => {
  switch (status) {
    case StoryStatus.PENDING:
      return "bg-yellow-500";
    case StoryStatus.APPROVED:
      return "bg-primary";
    case StoryStatus.REJECTED:
      return "bg-red-500";
    default:
      return "bg-gray-500"; // Default color for unknown status
  }
};

export const getGenderLabel = (gender: Gender) => {
  switch (gender) {
    case Gender.MALE.toUpperCase():
      return "ذكر";
    case Gender.FEMALE.toUpperCase():
      return "أنثى";
  }
};

export const getContentColor = (content_type: ContentType): string => {
  switch (content_type.toUpperCase()) {
    case ContentType.COMMENT:
      return "#828282"; // Gray color for comments
    case ContentType.STORY:
      return "#1e272e"; // Dark color for stories
    default:
      return "bg-gray-100 text-gray-800"; // Default color for unknown content type
  }
};

export const getNotificationInArabic = (type: NotificationTypes) => {
  switch (type) {
    case NotificationTypes.ACCEPT:
      return "قبول ";
    case NotificationTypes.REJECT:
      return "رفض";
    case NotificationTypes.DELETE:
      return "حذف";
    case NotificationTypes.UPDATE:
      return "تحديث";
    case NotificationTypes.COMMENT:
      return "تعليق ";
    default:
      return "إشعار جديد"; // Default notification message
  }
};

export const getNotificationColor = (type: NotificationTypes) => {
  switch (type.toUpperCase()) {
    case NotificationTypes.ACCEPT:
      return "#111"; // Green color for accept;
    case NotificationTypes.REJECT:
      return "#e74c3c"; // Red color for reject;
    case NotificationTypes.DELETE:
      return "#1e272e";
    case NotificationTypes.UPDATE:
      return "#2980b9";
    case NotificationTypes.COMMENT:
      return "#828282";
  }
};

export const getNotificationIcon = (type: NotificationTypes) => {
  switch (type.toUpperCase()) {
    case NotificationTypes.REQUEST:
      return {
        Icon: BsSend,
        className: "text-pending",
        size: "22",
      }; // request
    case NotificationTypes.ACCEPT:
      return {
        Icon: BiCheckCircle,
        className: "text-primary",
        size: "27",
      }; // Accept
    case NotificationTypes.REJECT:
      return {
        Icon: MdOutlineClose,
        className: "text-rejected ",
        size: "27",
      }; // Reject
    case NotificationTypes.DELETE:
      return {
        Icon: GiTrashCan,
        className: "text-rejected",
        size: "25",
      }; // Delete
    case NotificationTypes.UPDATE:
      return {
        Icon: PiUserGear,
        className: "text-gray_dark",
        size: "25",
      }; // Update
    case NotificationTypes.COMMENT:
      return {
        Icon: AiOutlineComment,
        className: "text-gray_dark",
        size: "27",
      }; // Comment
    default:
      return {
        Icon: BiBell,
        className: "text-gray_dark",
        size: "27",
      }; // Default
  }
};

export const getResponseMessage = (status: number) => {
  switch (status) {
    case 302:
      return "أنت غير مصرح لك";
    case 404:
      return "لم يتم العثور على أية بيانات";
    case 500:
      return "تعذر الوصول إلى السيرفر";
    default:
      return "حدث خطأ أثناء جلب البيانات!";
  }
};

export const getMassacreStatusLabel = (status: MassacreStatus) => {
  switch (status) {
    case MassacreStatus.PENDING:
      return "قيد المراجعة";
    case MassacreStatus.APPROVED:
      return "مقبولة";
    case MassacreStatus.ARCHIVED:
      return "مؤرشفة";
  }
};

export const getAgeLabel = (age: number) => {
  if (age == 0) return "أقل من عام";
  if (age == 1) return "عام";
  if (age == 2) return "عامان";
  if (age > 2 && age < 10) return `${age} أعوام`;
  if (age > 10 && age < 100) return `${age} عاماً`;
  if (age >= 100) return `${age} عام`;
};
