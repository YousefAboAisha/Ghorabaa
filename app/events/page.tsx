import PageTitles from "@/components/UI/typography/pageTitles";
import EventsCards from "@/containers/events/eventsCards";
import Hero from "@/containers/events/hero";

const page = () => {
  return (
    <div className="relative container">
      <div className="mt-24">
        <PageTitles />
      </div>

      <Hero />
      <EventsCards />
    </div>
  );
};

export default page;
