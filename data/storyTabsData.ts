import { StoryStatus } from "@/app/enums";

export const StoryTabsData = [
  {
    label: "الطلبات المقبولة",
    status: StoryStatus.APPROVED,
    color: "primary",
  },
  {
    label: "قيد المراجعة",
    status: StoryStatus.PENDING,
    color: "orange-500",
  },
  {
    label: "الطلبات المرفوضة",
    status: StoryStatus.REJECTED,
    color: "red-600",
  },
];
