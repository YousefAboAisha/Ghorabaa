import { Role } from "@/app/enums";
import { CiEdit } from "react-icons/ci";
import { PiUser, PiUserGear } from "react-icons/pi";

export const RoleCardsData = [
  {
    role: Role.ADMIN,
    Icon: PiUserGear,
    color: "#5B913B",
  },
  {
    role: Role.EDITOR,
    Icon: CiEdit,
    color: "#2980b9",
  },
  {
    role: Role.USER,
    Icon: PiUser,
    color: "#1e272e",
  },
];
