import EventsCards from "@/containers/events/eventsCards";
import Hero from "@/containers/events/hero";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      <Hero />
      <EventsCards />
    </div>
  );
};

export default page;
