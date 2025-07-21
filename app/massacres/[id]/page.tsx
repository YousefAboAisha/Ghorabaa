import MassacreDetailsSkeletonLoader from "@/components/UI/loaders/massacreDetailsSkeletonLoader";
import MassacreDetails from "@/containers/masscares/massacreDetails";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  console.log("massacre ID", id);

  return (
    <div className="mt-[70px] min-h-screen">
      <div className="container lg:w-6/12 mt-24">
        <Suspense fallback={<MassacreDetailsSkeletonLoader />}>
          <MassacreDetails id={id} />
        </Suspense>
      </div>
    </div>
  );
}
