import { getSessionAction } from "@/app/actions/registerActions";
import { CommentInterface } from "@/app/interfaces";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import CommentCard from "@/components/UI/cards/commentCard";
import Heading from "@/components/UI/typography/heading";
import { cookies } from "next/headers";
import Link from "next/link";

type RecentCommentsProps = {
  user_id: string;
};

const RecentComments = async ({ user_id }: RecentCommentsProps) => {
  const cookieStore = await cookies(); // Access current cookies
  const session = await getSessionAction();

  const userFetchedComments = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/comments/userComments/fetch/${user_id}`,
      {
        headers: {
          Cookie: cookieStore.toString(), // ⬅️ Forward cookies
        },
        cache: "no-store",
      }
    );

    return res.json();
  };

  const { data, error } = await userFetchedComments();

  const commentsData: CommentInterface[] = data;

  const renderContent = () => {
    if (error) {
      return <ErrorMessage error={error} className="mt-4" />;
    }

    if (data.length == 0) {
      return <NoDataMessage className="mt-8" />;
    }

    if (data.length > 0) {
      return (
        <div className="cards-grid-3 mt-8">
          {commentsData?.map((comment: CommentInterface) => {
            return (
              <Link
                key={comment._id as string}
                href={`/stories/${comment.story_id}#COMMENT`}
              >
                <CommentCard data={comment} session={session} />
              </Link>
            );
          })}
        </div>
      );
    }
  };

  console.log("User comments data", data);
  return (
    <div className="section">
      <Heading title="" highLightText="التعليقات الأخيرة" className="" />

      {renderContent()}
    </div>
  );
};

export default RecentComments;
