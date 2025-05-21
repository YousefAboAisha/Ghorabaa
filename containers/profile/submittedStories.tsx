import StoryTabs from "./storyTabs";
import { getSessionAction } from "@/app/actions/registerActions";

const SubmittedStories = async () => {
  const session = await getSessionAction();

  return (
    <div className="relative">
      <StoryTabs session={session} />
    </div>
  );
};

export default SubmittedStories;
