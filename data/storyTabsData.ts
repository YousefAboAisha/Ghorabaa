import { StoryStatus } from "@/app/enums";

export const StoryTabsData = [
  {
    label: "الطلبات المقبولة",
    status: StoryStatus.APPROVED,
    color: "approved",
  },
  {
    label: "قيد المراجعة",
    status: StoryStatus.PENDING,
    color: "pending",
  },
  {
    label: "الطلبات المرفوضة",
    status: StoryStatus.REJECTED,
    color: "rejected",
  },
];
