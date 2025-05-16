import PageTitles from "@/components/UI/typography/pageTitles";
import SearchSection from "@/containers/search/searchSection";
import { SearchMetadata } from "../lib/metadata";

export const generateMetadata = async () => SearchMetadata;

const Page = () => {
  return (
    <div className="container min-h-screen mt-24">
      <PageTitles />
      <SearchSection />
    </div>
  );
};

export default Page;
