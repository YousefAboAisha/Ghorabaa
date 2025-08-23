import ProfileDetailsWrapper from "@/containers/wrappers/profileDetailsWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <ProfileDetailsWrapper id={id} />;
}
