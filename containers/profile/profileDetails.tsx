import { NotificationTypes } from "@/app/enums";
import NotificationCard from "@/components/UI/cards/notificationCard";
import Image from "next/image";
import React from "react";
import { GrNotification } from "react-icons/gr";

const ProfileDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {/* Profile Card Details */}
      <div className="relative flex flex-col bg-white rounded-lg col-span">
        <div className="bg-secondary p-4 rounded-t-lg">
          <div className="w-[100px] h-[100px] rounded-full border-2 p-[2px] mx-auto">
            <Image
              src={"/me.png"}
              width={100}
              height={100}
              alt="صورة الملف الشخصي"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 h-full w-full">
          <table className="bg-white border bordser-gray-200 h-full ">
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  الاسم
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  يوسف رشاد ابو عيشة
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  رقم الهوية
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  407709260
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  البريد الالكتروني
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  yousef.aboesha@hotmail.com
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  رقم الهاتف
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  0592551405
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-b text-right text-sm border-l">
                  تاريخ الإنشاء
                </td>

                <td className="py-3 px-4 border-b text-right text-sm ">
                  25 فبراير 2025
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative w-full col-span-1 md:col-span-2 lg:col-span-2 max-h-[50vh] overflow-auto ">
        <div className="flex flex-col gap-2 pb-4">
          <NotificationCard type={NotificationTypes.ACCEPT} />
          <NotificationCard type={NotificationTypes.BAN} />
          <NotificationCard type={NotificationTypes.COMMENT} />
          <NotificationCard type={NotificationTypes.DONATION} />
          <NotificationCard type={NotificationTypes.REJECT} />

          <div className="flex items-center gap-2 text-primary text-sm hover:underline cursor-pointer font-bold mt-4 w-fit mx-auto">
            <p> كافة الإشعارات </p>
            <GrNotification size={12} className="rotate-[30deg]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
