import { SessionProps } from "@/app/interfaces";
import StoryTabs from "./storyTabs";
import { getSessionAction } from "@/app/actions/registerActions";

const SubmittedStories = async () => {
  const session: SessionProps | undefined =
    (await getSessionAction()) ?? undefined;

  return (
    <div className="relative">
      <StoryTabs session={session} />
    </div>
  );
};

export default SubmittedStories;
