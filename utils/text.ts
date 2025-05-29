import { NotificationTypes, StoryStatus } from "@/app/enums";

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
