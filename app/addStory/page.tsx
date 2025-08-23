import React from "react";
import { Metadata } from "next";
import { AddStoryMetadata } from "../lib/metadata";
import StoryForm from "@/components/UI/forms/storyForm";

export const metadata: Metadata = AddStoryMetadata;

const Page = () => {
  return (
    <div className="container md:w-1/2 mx-auto flex flex-col items-center justify-center min-h-screen mt-28">
      <StoryForm />
    </div>
  );
};

export default Page;
