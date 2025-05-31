"use client";
import { CommentInterface } from "@/app/interfaces";
import CommentCard from "@/components/UI/cards/commentCard";
import CommentForm from "@/components/UI/Forms/commentForm";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import CommentSkeletonLoader from "@/components/UI/loaders/commentSkeletonLoader";

type CommentSectionProps = {
  session: Session | null;
  id: string;
};

const CommentsSection = ({ session, id }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchComments = async () => {
    setLoading(true);
    const response = await fetch(`/api/comment/storyComments/${id}`);
    if (!response.ok) {
      setLoading(false);
      throw new Error("Failed to fetch comments");
    }
    const result = await response.json();
    if (result && result.data) {
      setComments(result.data);
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

  return (
    <div id="COMMENT" className="flex flex-col gap-2 mb-10 mt-8">
      <h2 className="font-bold text-lg">التعليقات</h2>

      <CommentForm session={session} id={id} updateComments={fetchComments} />

      {loading ? (
        <CommentSkeletonLoader length={4} className="mt-8" />
      ) : comments.length >= 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {comments?.map((comment: CommentInterface) => (
            <CommentCard
              data={comment}
              key={comment._id as string}
              session={session}
              refetchData={fetchComments}
              showActionButtons={true}
            />
          ))}
        </div>
      ) : (
        <div className="relative h-[20vh] mt-4">
          <p className="abs-center text-[13px]">
            لا يوجد تعليقات، قم بإضافة تعليق!
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
