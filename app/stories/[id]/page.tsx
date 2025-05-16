import PageTitles from "@/components/UI/typography/pageTitles";
import CommentsSection from "@/containers/storyDetails/commentsSection";
import StoryDetailsSkeletonLoader from "@/components/UI/loaders/storyDetailsSkeletonLoader";
import { getSessionAction } from "@/app/actions/registerActions";
import StoryDetailsSection from "@/containers/storyDetails/storyDetailsSection";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const session = await getSessionAction();
  console.log("Session values", session);

  return (
    <div className="container lg:w-6/12 mt-[70px] min-h-screen">
      <div className="flex flex-col gap-2 mt-24">
        <PageTitles />
      </div>

      <Suspense fallback={<StoryDetailsSkeletonLoader />}>
        <StoryDetailsSection id={id} />
      </Suspense>

      <CommentsSection session={{ session }} id={id} />
    </div>
  );
}
