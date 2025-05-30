import { NotificationTypes, Role, StoryStatus } from "@/app/enums";

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
    case Role.EXTRAORDINARY:
      return "مستخدم استثنائي";
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
      return "bg-blue";
    case Role.USER:
      return "bg-secondary";
    case Role.EXTRAORDINARY:
      return "bg-[red]";
    default:
      return "";
  }
};
