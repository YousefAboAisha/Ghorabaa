import Heading from "@/components/UI/typography/heading";
import ActiveUsers from "@/containers/dashboard/analytics/activeUsers";
import StoriesAnalytics from "@/containers/dashboard/analytics/storiesAnalytics";
import TrendingStories from "@/containers/dashboard/analytics/trendingStories";
import UsersCount from "@/containers/dashboard/analytics/usersCount";
import VisitsAnalytics from "@/containers/dashboard/analytics/visitsAnalytics";

const Analytics = () => {
  return (
    <div className="relative">
      {/* this is visits analytics section */}
      <div>
        <Heading highLightText="زوار المنصة" title="" />
        <VisitsAnalytics />
      </div>

      {/* this is user analytics section */}
      <div className="section">
        <Heading highLightText="مستخدمو المنصة" title="" />
        <UsersCount />
      </div>

      <div className="section">
        <Heading highLightText="المستخدمون الأكثر تفاعلاً" title="" />
        <ActiveUsers />
      </div>

      {/* this is story analytics section */}
      <div className="section">
        <Heading
          highLightText="تحليلات القصص"
          title=""
          highlightColor="before:bg-blueColor"
        />

        <StoriesAnalytics />
      </div>

      {/* this is trending stories section */}
      <div className="section">
        <Heading
          highLightText="القصص الأكثر تفاعلاً"
          title=""
          highlightColor="before:bg-blueColor"
        />

        <TrendingStories />
      </div>
    </div>
  );
};

export default Analytics;
