import Hero from "@/components/layout/hero";
import Heading from "@/components/UI/typography/heading";
import MassacresSection from "@/containers/masscares/massacresSection";
import { Metadata } from "next";
import { MassacresMetadata } from "../lib/metadata";

export const metadata: Metadata = MassacresMetadata;

const Page = () => {
  return (
    <div className="container mt-24 min-h-screen">
      <Hero pattern="bg-massacres-pattern" className="bg-top" />

      <div className="flex flex-col gap-2 mt-16">
        <Heading title="المجازر الصهيونية" />

        <MassacresSection />
      </div>
    </div>
  );
};

export default Page;
