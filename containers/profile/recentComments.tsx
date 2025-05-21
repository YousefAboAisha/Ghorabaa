import { getSessionAction } from "@/app/actions/registerActions";
import { CommentInterface } from "@/app/interfaces";
import CommentCard from "@/components/UI/cards/commentCard";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";

const RecentComments = async () => {
  const session = await getSessionAction(); // Fetch the session on the server
  const id = session?.user.id;

  const userFetchedComments = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/userComments/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch data");
    }

    return res.json();
  };
  const { data } = await userFetchedComments();

  const commentsData: CommentInterface[] = data;

  console.log("User comments data", data);
  return (
    <div className="section">
      <Heading title="" highLightText="التعليقات الأخيرة" className="" />
      {commentsData?.length > 0 ? (
        <div className="cards-grid-3 mt-8">
          {commentsData?.map((comment: CommentInterface) => {
            return (
              <Link
                key={comment._id as string}
                href={`/stories/${comment.story_id}`}
              >
                <CommentCard data={comment} />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="relative h-[20vh] mt-4">
          <p className="abs-center text-[13px]">لا يوجد تعليقات!</p>
        </div>
      )}
    </div>
  );
};

export default RecentComments;
