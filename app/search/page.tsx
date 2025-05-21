import PageTitles from "@/components/UI/typography/pageTitles";
import SearchSection from "@/containers/search/searchSection";
import { SearchMetadata } from "../lib/metadata";
import { getSessionAction } from "../actions/registerActions";

export const generateMetadata = async () => SearchMetadata;

const Page = async () => {
  const session = await getSessionAction();

  return (
    <div className="container min-h-screen mt-24">
      <PageTitles />
      <SearchSection session={session} />
    </div>
  );
};

export default Page;
