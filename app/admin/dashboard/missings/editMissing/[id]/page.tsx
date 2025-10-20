import MissingForm from "@/components/UI/forms/missingForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="relative w-full lg:w-[70%]">
      <MissingForm id={id} />
    </div>
  );
}
