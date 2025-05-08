import RecentCommentCard from "@/components/UI/cards/recentCommentCard";
import Heading from "@/components/UI/typography/heading";

const RecentComments = () => {
  return (
    <div className="section">
      <Heading title="" highLightText="التعليقات الأخيرة" className="" />
      <div className="cards-grid-3 mt-8">
        <RecentCommentCard />
        <RecentCommentCard />
        <RecentCommentCard />
        <RecentCommentCard />
        <RecentCommentCard />
        <RecentCommentCard />
      </div>
      <p className="text-primary mx-auto w-fit hover:underline text-sm font-semibold mt-4 cursor-pointer">عرض المزيد</p>
    </div>
  );
};

export default RecentComments;
