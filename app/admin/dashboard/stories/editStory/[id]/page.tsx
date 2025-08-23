import StoryForm from "@/components/UI/forms/storyForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="relative w-full lg:w-[70%]">
      <StoryForm id={id} />
    </div>
  );
}
