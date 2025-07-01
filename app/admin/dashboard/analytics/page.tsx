import Heading from "@/components/UI/typography/heading";
import UserAnalytics from "@/containers/analytics/userAnalytics";
import VisitsAnalytics from "@/containers/analytics/visitsAnalytics";

const Analytics = () => {
  return (
    <div className="relative">
      {/* this is user analytics section */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading highLightText="مستخدمو المنصة" title="" />
          <div className="relative w-full flex items-center justify-center bg-white border min-h-[40vh] rounded-md p-6">
            <UserAnalytics />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Heading highLightText="زوار المنصة" title="" />
          <div className="relative bg-white border min-h-[40vh] rounded-md p-6">
            <VisitsAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
