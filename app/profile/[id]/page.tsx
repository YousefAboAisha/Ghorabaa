import ProfileDetails from "@/containers/profile/profileDetails";
import RecentComments from "@/containers/profile/recentComments";
import SubmittedStories from "@/containers/profile/submittedStories";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="container min-h-screen mt-28">
      <ProfileDetails user_id={id} />
      <SubmittedStories user_id={id} />
      <RecentComments user_id={id} />
    </div>
  );
}
