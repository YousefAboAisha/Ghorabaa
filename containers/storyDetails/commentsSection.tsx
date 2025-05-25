"use client";
import { CommentInterface } from "@/app/interfaces";
import CommentCard from "@/components/UI/cards/commentCard";
import CommentForm from "@/components/UI/Forms/commentForm";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";

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

  const renderLoadingSkeletons = () => (
    <div className="cards-grid-2 mt-8">
      <div className="relative flex flex-col gap-2 border rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col gap-1">
            <h5 className="h-2 w-32 rounded-xl bg-gray-300 animate-pulse"></h5>
            <p className="h-2 w-16 rounded-xl bg-gray-300 animate-pulse"></p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="h-1 w-24 rounded-md mt-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col gap-1">
            <h5 className="h-2 w-32 rounded-xl bg-gray-300 animate-pulse"></h5>
            <p className="h-2 w-16 rounded-xl bg-gray-300 animate-pulse"></p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="h-1 w-24 rounded-md mt-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 border rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col gap-1">
            <h5 className="h-2 w-32 rounded-xl bg-gray-300 animate-pulse"></h5>
            <p className="h-2 w-16 rounded-xl bg-gray-300 animate-pulse"></p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="h-1 w-24 rounded-md mt-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>

      <div className="relative flex flex-col gap-2 border rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col gap-1">
            <h5 className="h-2 w-32 rounded-xl bg-gray-300 animate-pulse"></h5>
            <p className="h-2 w-16 rounded-xl bg-gray-300 animate-pulse"></p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="h-3 w-full rounded-xl bg-gray-300 animate-pulse"></div>
          <div className="h-1 w-24 rounded-md mt-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2 mb-10 mt-8">
      <h2 className="font-bold text-lg">التعليقات</h2>

      <CommentForm session={session} id={id} updateComments={fetchComments} />

      {loading ? (
        renderLoadingSkeletons()
      ) : comments.length >= 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {comments?.map((comment: CommentInterface) => (
            <CommentCard data={comment} key={comment._id as string} />
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
