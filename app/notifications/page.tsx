import NotificationCard from "@/components/UI/cards/notificationCard";
import PageTitles from "@/components/UI/typography/pageTitles";
import { NotificationTypes } from "../enums";
import { GrNotification } from "react-icons/gr";
import { BsEye } from "react-icons/bs";
import Button from "@/components/UI/inputs/button";

const Page = () => {
  return (
    <div className="container mt-24">
      <div className="w-full md:container">
        <PageTitles />
        <div className="relative w-full mt-12">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">كافة الإشعارات</h2>
            <GrNotification className="rotate-[30deg]" />
          </div>

          <div className="flex flex-col gap-2 pb-4 mt-6">
            <NotificationCard type={NotificationTypes.ACCEPT} />
            <NotificationCard type={NotificationTypes.BAN} />
            <NotificationCard type={NotificationTypes.COMMENT} />
            <NotificationCard type={NotificationTypes.DONATION} />
            <NotificationCard type={NotificationTypes.REJECT} />
          </div>

          <div className="w-fit mx-auto mt-4">
            <Button
              title="إظهار المزيد"
              icon={<BsEye />}
              className="bg-primary text-white px-4"
              hasShiningBar={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
