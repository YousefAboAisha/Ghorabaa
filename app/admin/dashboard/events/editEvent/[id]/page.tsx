import EventForm from "@/components/UI/forms/eventForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="relative w-full lg:w-[70%]">
      <EventForm id={id} />
    </div>
  );
}
