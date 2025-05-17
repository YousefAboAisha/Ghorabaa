import { StoryStatus } from "@/app/enums";

export const StoryTapsData = [
  {
    label: "الطلبات المقبولة",
    status: StoryStatus.APPROVED,
    color: "primary",
  },
  {
    label: "بانتظار الموافقة",
    status: StoryStatus.PENDING,
    color: "orange-500",
  },
  {
    label: "الطلبات المرفوضة",
    status: StoryStatus.REJECTED,
    color: "red-600",
  },
];
