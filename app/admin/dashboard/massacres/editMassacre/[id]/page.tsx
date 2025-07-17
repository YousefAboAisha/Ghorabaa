import EditMassacreForm from "@/components/UI/forms/editMassacreForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  console.log("massacre ID", id);

  return (
    <div className="relative w-full lg:w-[70%]">
      <EditMassacreForm id={id} />
    </div>
  );
}
