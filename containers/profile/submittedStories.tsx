import StoryTabs from "./storyTabs";

type SubmittedStoriesProps = {
  user_id: string;
};

const SubmittedStories = ({ user_id }: SubmittedStoriesProps) => {
  return (
    <div className="relative">
      <StoryTabs user_id={user_id} />
    </div>
  );
};

export default SubmittedStories;
