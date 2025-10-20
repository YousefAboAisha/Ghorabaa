"use client";
import Hero from "@/components/layout/hero";
import MissingsSection from "@/containers/missings/missingsSection";

const Page = () => {
  return (
    <div className="container min-h-screen mt-24">
      <Hero pattern="bg-statistics-pattern" className="bg-top" />

      <MissingsSection />
    </div>
  );
};

export default Page;
