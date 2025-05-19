import BannedContent from "@/containers/profile/bannedContent";
import ProfileDetails from "@/containers/profile/profileDetails";
import RecentComments from "@/containers/profile/recentComments";
import SubmittedStories from "@/containers/profile/submittedStories";

const page = () => {
  return (
    <div className="container min-h-screen mt-24">
      <ProfileDetails />

      <SubmittedStories />

      <RecentComments />

      <BannedContent />
    </div>
  );
};

export default page;
