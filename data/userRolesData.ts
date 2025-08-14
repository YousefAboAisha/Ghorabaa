import { Role } from "@/app/enums";

export const UserRolesData = [
  {
    title: "المشرفون",
    value: Role.ADMIN,
  },
  {
    title: "المحررون",
    value: Role.EDITOR,
  },
  {
    title: "المستخدمون",
    value: Role.USER,
  },
];
