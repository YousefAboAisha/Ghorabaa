import { NotificationTypes } from "@/app/enums";
import NotificationCard from "@/components/UI/cards/notificationCard";
import Image from "next/image";
import React from "react";
import { GrNotification } from "react-icons/gr";
// import { GrNotification } from "react-icons/gr";

const ProfileDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-8">
      {/* Profile Card Details */}
      <div className="relative flex flex-col items-center gap-2 bg-white p-4 border rounded-xl col-span-1">
        <div className="w-[100px] h-[100px] rounded-full border-2 p-[2px]">
          <Image
            src={"/me.png"}
            width={100}
            height={100}
            alt="Profile"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h2>يوسف رشاد أبو عيشة</h2>
        </div>
      </div>

      <div className="relative col-span-2">
        {/* <div className="flex items-center gap-4 ">
          <h2 className="font-bold text-lg">الإشعارات</h2>
          <GrNotification />
        </div> */}

        <div className="flex flex-col gap-2 max-h-[70vh] overflow-auto pb-4">
          <NotificationCard type={NotificationTypes.ACCEPT} />
          <NotificationCard type={NotificationTypes.BAN} />
          <NotificationCard type={NotificationTypes.COMMENT} />
          <NotificationCard type={NotificationTypes.DONATION} />
          <NotificationCard type={NotificationTypes.REJECT} />

          <div className="flex items-center gap-2 text-primary text-sm hover:underline cursor-pointer font-bold mt-4 w-fit mx-auto">
            <p> كافة الإشعارات </p>
            <GrNotification size={12} className="rotate-[30deg]"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
