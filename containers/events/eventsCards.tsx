"use client";
import EventCard from "@/components/UI/cards/eventCard";
import Heading from "@/components/UI/typography/heading";

const EventsCards = () => {
  return (
    <div className="relative flex flex-col gap-2 mt-16 ">
      <div className="flex items-center justify-between w-full gap-4">
        <Heading
          title=""
          highLightText="الفعاليات القادمة"
          details="مشاركتك دعماً لأهالي وأسر الشهداء"
          className="min-w-fit"
        />
      </div>

      <div className="cards-grid-3 mt-4">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default EventsCards;
