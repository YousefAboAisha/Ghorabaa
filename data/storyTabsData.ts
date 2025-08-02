import { StoryStatus } from "@/app/enums";

export const StoryTabsData = [
  {
    label: "الطلبات المقبولة",
    status: StoryStatus.APPROVED,
    color: "text-approved",
  },
  {
    label: "قيد المراجعة",
    status: StoryStatus.PENDING,
    color: "text-pending",
  },
  {
    label: "الطلبات المرفوضة",
    status: StoryStatus.REJECTED,
    color: "text-rejected",
  },
];
