import Hero from "@/components/layout/hero";
import MassacreCard from "@/components/UI/cards/massacreCard";
import Heading from "@/components/UI/typography/heading";
import React from "react";

const Page = () => {
  return (
    <div className="container mt-24 min-h-screen">
      <Hero />

      <div className="flex flex-col gap-2 mt-16">
        <Heading title="المجازر الصهيونية" />

        <div className="cards-grid-3 mt-4">
          <MassacreCard />
          <MassacreCard />
          <MassacreCard />
          <MassacreCard />
          <MassacreCard />
          <MassacreCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
