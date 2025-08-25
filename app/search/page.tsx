import SearchSection from "@/containers/search/searchSection";
import { SearchMetadata } from "../lib/metadata";
import Hero from "@/components/layout/hero";
import { getServerSession } from "next-auth";

export const generateMetadata = async () => SearchMetadata;

const Page = async () => {
  const session = await getServerSession();

  return (
    <div className="container min-h-screen mt-24">
      <Hero />

      <div className="mt-16">
        <SearchSection session={session} />
      </div>
    </div>
  );
};

export default Page;
