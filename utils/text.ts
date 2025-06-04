import {
  ContentType,
  NotificationTypes,
  ReportReasons,
  ReportStatus,
  Role,
  StoryStatus,
} from "@/app/enums";
import { ReportReasonsData } from "@/data/reportReasonsData";
import { BiBell, BiCheckCircle, BiComment, BiTrash } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

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

    case NotificationTypes.ACCEPT:
      return `/stories/${story_id}`;

    case NotificationTypes.REJECT:
      return `/profile#STORY`;

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
    case ReportStatus.RESOLVED:
      return "تم التحقق";
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
    case ReportStatus.RESOLVED:
      return "bg-primary";
    case ReportStatus.REJECTED:
      return "bg-red-500";
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
    case NotificationTypes.ACCEPT:
      return {
        Icon: BiCheckCircle,
        className: "text-[green]",
      }; // Accept
    case NotificationTypes.REJECT:
      return {
        Icon: MdOutlineClose,
        className: "text-[red] ",
      }; // Reject
    case NotificationTypes.DELETE:
      return {
        Icon: BiTrash,
        className: "text-[red]",
      }; // Delete
    case NotificationTypes.UPDATE:
      return {
        Icon: RxUpdate,
        className: "text-[orange]",
      }; // Update
    case NotificationTypes.COMMENT:
      return {
        Icon: BiComment,
        className: "text-blueColor",
      }; // Comment
    default:
      return {
        Icon: BiBell,
        className: "text-yellow-600",
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
      return "خطأ في السيرفر";
    default:
      return "حدث خطأ أثناء جلب البيانات!";
  }
};
