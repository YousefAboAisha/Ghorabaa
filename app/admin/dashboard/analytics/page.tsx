import Heading from "@/components/UI/typography/heading";
import StoriesAnalytics from "@/containers/analytics/storiesAnalytics";
import TrendingStories from "@/containers/analytics/trendingStories";
import UsersCount from "@/containers/analytics/usersCount";
import VisitsAnalytics from "@/containers/analytics/visitsAnalytics";

const Analytics = () => {
  return (
    <div className="relative">
      {/* this is user analytics section */}
      <div>
        <Heading highLightText="مستخدمو المنصة" title="" />
        <UsersCount />
      </div>

      {/* this is visits analytics section */}
      <div className="section">
        <Heading highLightText="زوار المنصة" title="" />
        <VisitsAnalytics />
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
