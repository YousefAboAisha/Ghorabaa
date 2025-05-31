import {
  ContentType,
  NotificationTypes,
  ReportReasons,
  ReportStatus,
  Role,
  StoryStatus,
} from "@/app/enums";
import { ReportReasonsData } from "@/data/reportReasonsData";

export const convertStoryStatusToArabic = (status: StoryStatus): string => {
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
      break;

    case NotificationTypes.ACCEPT:
      return `/stories/${story_id}`;
      break;

    case NotificationTypes.REJECT:
      return `/profile#STORY`;
      break;

    default:
      return `/stories/${story_id}`;
      break;
  }
};

export const getRoleColor = (role: Role) => {
  switch (role) {
    case Role.ADMIN:
      return "bg-primary";
    case Role.EDITOR:
      return "bg-[orange] ";
    case Role.USER:
      return "bg-secondary";
    default:
      return "";
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
    case ReportStatus.APPROVED:
      return "مقبولة";
    case ReportStatus.REJECTED:
      return "مرفوضة";
    default:
      return "غير معروف";
  }
};

export const getReportColor = (status: ReportStatus): string => {
  switch (status) {
    case ReportStatus.PENDING:
      return "bg-yellow-500";
    case ReportStatus.APPROVED:
      return "bg-primary";
    case ReportStatus.REJECTED:
      return "bg-red-500";
    default:
      return "bg-gray-500"; // Default color for unknown status
  }
};

export const getContentColor = (content_type: ContentType): string => {
  switch (content_type) {
    case ContentType.COMMENT:
      return "bg-gray_dark text-white";
    case ContentType.STORY:
      return "bg-secondary text-white";
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
      return "bg-primary text-white";
    case NotificationTypes.REJECT:
      return "bg-red-500 text-white";
    case NotificationTypes.DELETE:
      return "bg-gray-500 text-white";
    case NotificationTypes.UPDATE:
      return "bg-[orange] text-white";
    case NotificationTypes.COMMENT:
      return "bg-gray_dark text-white";
    default:
      return "bg-gray-300 text-gray-800"; // Default color for unknown notification type
  }
};
