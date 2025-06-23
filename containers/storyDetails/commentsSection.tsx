"use client";
import { CommentInterface } from "@/app/interfaces";
import CommentCard from "@/components/UI/cards/commentCard";
import CommentForm from "@/components/UI/Forms/commentForm";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import CommentSkeletonLoader from "@/components/UI/loaders/commentSkeletonLoader";
import ErrorMessage from "@/components/responseMessages/errorMessage";

type CommentSectionProps = {
  session: Session | null;
  id: string;
};

const CommentsSection = ({ session, id }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchComments = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/comments/storyComments/fetch/${id}`
    );

    if (!res.ok) {
      const { error } = await res.json();
      setError(error);
      throw new Error(error as string);
    }

    const { data } = await res.json();
    if (data) {
      setComments(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -300; // 👈 scroll 100px above the element
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }, 1000); // Wait for content to be ready
      }
    }
  }, []);

  console.log("Comments", comments);

  const renderContent = () => {
    if (loading) {
      return <CommentSkeletonLoader length={4} className="mt-8" />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (comments?.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
      );
    }
  };

  return (
    <div id="COMMENT" className="flex flex-col gap-2 mb-10 mt-8">
      <h2 className="font-bold text-lg">التعليقات</h2>

      <CommentForm session={session} id={id} refetchData={fetchComments} />

      {renderContent()}
    </div>
  );
};

export default CommentsSection;
