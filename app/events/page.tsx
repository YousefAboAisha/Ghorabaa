import Hero from "@/components/layout/hero";
import EventsCards from "@/containers/events/eventsCards";

const page = () => {
  return (
    <div className="relative container mt-24">
      <Hero />

      <EventsCards />
    </div>
  );
};

export default page;
