import StoryTabs from "./storyTabs";
import { getSessionAction } from "@/app/actions/registerActions";

type SubmittedStoriesProps = {
  user_id: string;
};

const SubmittedStories = async ({ user_id }: SubmittedStoriesProps) => {
  const session = await getSessionAction();

  return (
    <div className="relative">
      <StoryTabs session={session} user_id={user_id} />
    </div>
  );
};

export default SubmittedStories;
