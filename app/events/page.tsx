import Hero from "@/components/layout/hero";
import EventsCards from "@/containers/events/eventsCards";
import { Metadata } from "next";
import { EventsMetadata } from "../lib/metadata";

export const metadata: Metadata = EventsMetadata;

const page = () => {
  return (
    <div className="relative container mt-24">
      <Hero />
      <EventsCards />
    </div>
  );
};

export default page;
