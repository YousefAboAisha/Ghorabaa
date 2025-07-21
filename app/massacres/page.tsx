import Hero from "@/components/layout/hero";
import Heading from "@/components/UI/typography/heading";
import MassacresSection from "@/containers/masscares/massacresSection";
import React from "react";

const Page = () => {
  return (
    <div className="container mt-24 min-h-screen">
      <Hero />

      <div className="flex flex-col gap-2 mt-16">
        <Heading title="المجازر الصهيونية" />

        <MassacresSection />
      </div>
    </div>
  );
};

export default Page;
