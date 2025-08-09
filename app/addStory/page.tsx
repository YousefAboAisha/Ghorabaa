import React from "react";
import Heading from "@/components/UI/typography/heading";
import StorySearchSection from "@/containers/addStory/storySearchSection";
import { Metadata } from "next";
import { AddStoryMetadata } from "../lib/metadata";

export const metadata: Metadata = AddStoryMetadata;

const Page = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen mt-32">
      <Heading
        title="إضافة قصة جديدة"
        details="قم بالبحث عن الشهيد المُراد إضافة قصة عنه"
        className="text-center"
      />

      <StorySearchSection />
    </div>
  );
};

export default Page;
