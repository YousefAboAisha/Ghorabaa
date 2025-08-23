"use client";
import { CommentInterface } from "@/app/interfaces";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import CommentCard from "@/components/UI/cards/commentCard";
import CommentSkeletonLoader from "@/components/UI/loaders/commentSkeletonLoader";
import Heading from "@/components/UI/typography/heading";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type RecentCommentsProps = {
  user_id: string;
};

const RecentComments = ({ user_id }: RecentCommentsProps) => {
  const { data: session } = useSession();
  const [data, setData] = useState<CommentInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const fetchComments = async (initialLoad = true) => {
    try {
      if (!initialLoad) setLoadingMore(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/comments/userComments/fetch/${user_id}`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        const { error } = await res.json();
        setError(error);
        throw new Error(error as string);
      }

      const { data: comments } = await res.json();

      if (comments) {
        if (initialLoad) {
          setData(comments);
        } else {
          setData((prev) => [...prev, ...comments]);
        }
        setTotalComments(comments.length);
        setHasMore(data.length + comments.length < data.length);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("فشل تحميل التعليقات");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  console.log("User comments: ", data);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  const renderContent = () => {
    if (error) return <ErrorMessage error={error} className="mt-4" />;

    if (loading) return <CommentSkeletonLoader length={3} className="mt-8" />;

    if (data.length === 0) return <NoDataMessage className="mt-8" />;

    return (
      <div className="cards-grid-3 mt-8">
        {data.map((comment: CommentInterface) => (
          <CommentCard
            key={comment._id as string}
            data={comment}
            session={session}
            isProfileCommentCard={true}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="section">
      <Heading
        title=""
        highLightText={`التعليقات الأخيرة (${totalComments || 0})`}
        className=""
      />

      {renderContent()}

      {/* Optional Load More button */}
      {hasMore && !loadingMore && (
        <div className="mt-4 text-center">
          <button
            onClick={() => fetchComments(false)}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            تحميل المزيد
          </button>
        </div>
      )}
      {loadingMore && <p className="mt-2 text-center">جاري تحميل المزيد...</p>}
    </div>
  );
};

export default RecentComments;
