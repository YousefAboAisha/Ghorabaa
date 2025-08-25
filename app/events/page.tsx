import Hero from "@/components/layout/hero";
import { Metadata } from "next";
import { EventsMetadata } from "../lib/metadata";
import Heading from "@/components/UI/typography/heading";
import EventsSection from "@/containers/events/eventsSection";

export const metadata: Metadata = EventsMetadata;

const page = () => {
  return (
    <div className="relative container mt-24">
      <Hero />

      <Heading
        title=""
        highLightText="الفعاليات القادمة"
        details="مشاركتك دعماً لأهالي وأسر الشهداء"
        className="min-w-fit mt-16"
      />

      <EventsSection />
    </div>
  );
};

export default page;
