import { Role } from "@/app/enums";
import { getRoleInArabic } from "@/utils/text";
import React from "react";

type RoleCardProps = {
  icon: JSX.Element;
  role: Role;
  className?: string;
} & React.ComponentProps<"div">;

const RoleCard = ({ icon, role, className = "", ...rest }: RoleCardProps) => {
  return (
    <div
      {...rest}
      className={`relative flex flex-col flex-grow w-full justify-center items-center gap-3 bg-white border p-4 rounded-lg cursor-pointer duration-150 ${className}`}
    >
      <div>{icon}</div>
      <div className="text-sm">{getRoleInArabic(role)}</div>
    </div>
  );
};

export default RoleCard;
