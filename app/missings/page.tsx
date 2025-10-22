import Hero from "@/components/layout/hero";
import MissingsSection from "@/containers/missings/missingsSection";
import { MissingsMetadata } from "../lib/metadata";

export const generateMetadata = async () => MissingsMetadata;

const Page = () => {
  return (
    <div className="container min-h-screen mt-24">
      <Hero pattern="bg-missing-banner" className="bg-bottom" />

      <MissingsSection />
    </div>
  );
};

export default Page;
