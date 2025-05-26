import { StoryStatus } from "@/app/enums";

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
