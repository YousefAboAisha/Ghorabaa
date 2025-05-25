import { CommentInterface } from "@/app/interfaces";
import NoDataMessage from "@/components/errorMessages/noDataMessage";
import CommentCard from "@/components/UI/cards/commentCard";
import Heading from "@/components/UI/typography/heading";
import { cookies } from "next/headers";
import Link from "next/link";

const RecentComments = async () => {
  const cookieStore = await cookies(); // Access current cookies

  const userFetchedComments = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/userComments/fetch`,
      {
        headers: {
          Cookie: cookieStore.toString(), // ⬅️ Forward cookies
        },
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
        <NoDataMessage className="mt-8" />
      )}
    </div>
  );
};

export default RecentComments;
