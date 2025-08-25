"use client";
import { CommentInterface } from "@/app/interfaces";
import CommentCard from "@/components/UI/cards/commentCard";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import CommentSkeletonLoader from "@/components/UI/loaders/commentSkeletonLoader";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import CommentForm from "@/components/UI/forms/commentForm";
import Button from "@/components/UI/inputs/button";

type CommentSectionProps = {
  session: Session | null;
  id: string;
};

const CommentsSection = ({ session, id }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 5; // Number of comments per load

  const fetchComments = async (initialLoad = true) => {
    if (initialLoad) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/comments/storyComments/fetch/${id}?page=${page}&limit=${limit}`
      );

      if (!res.ok) {
        const { error } = await res.json();
        setError(error);
        throw new Error(error as string);
      }

      const { data, total } = await res.json();
      if (data) {
        if (initialLoad) {
          setComments(data);
        } else {
          setComments((prev) => [...prev, ...data]);
        }
        setTotalComments(total);
        setHasMore(comments.length + data.length < total);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreComments = () => {
    if (hasMore && !loadingMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchComments(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -300;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 1000);
      }
    }
  }, []);

  const renderContent = () => {
    if (loading) {
      return <CommentSkeletonLoader length={3} className="mt-8" />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (comments?.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          <div className="cards-grid-3 gap-4 mt-8">
            {comments.map((comment: CommentInterface) => (
              <CommentCard
                data={comment}
                key={comment._id as string}
                session={session}
                refetchData={fetchComments}
                showActionButtons={true}
              />
            ))}
          </div>

          {hasMore && (
            <>
              <div className="relative w-fit mx-auto mt-6">
                <Button
                  onClick={loadMoreComments}
                  disabled={loadingMore}
                  title={
                    loadingMore ? "جاري التحميل..." : "المزيد من التعليقات"
                  }
                  className="bg-primary px-6"
                  loading={loadingMore}
                />
              </div>
            </>
          )}
        </div>
      );
    }
  };

  return (
    <div id="COMMENT" className="flex flex-col gap-2 mb-10 mt-8">
      <h2 className="font-bold text-lg">التعليقات ({totalComments})</h2>

      <CommentForm
        session={session}
        id={id}
        refetchData={() => fetchComments(true)}
      />

      {renderContent()}
    </div>
  );
};

export default CommentsSection;
