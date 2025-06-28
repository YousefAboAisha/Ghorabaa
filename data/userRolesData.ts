import { Role } from "@/app/enums";

export const UserRolesData = [
  {
    label: "المشرفون",
    role: Role.ADMIN,
  },
  {
    label: "المحررون",
    role: Role.EDITOR,
  },
  {
    label: "المستخدمون",
    role: Role.USER,
  },
];
