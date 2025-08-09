import Hero from "@/components/layout/hero";
import AboutCards from "@/containers/about/aboutCards";
import ContactForm from "@/containers/about/contactForm";
import PlatformDescription from "@/containers/about/platformDescription";
import { Metadata } from "next";
import MartyrBanner from "@/containers/about/martyrBanner";
import { AboutMetadata } from "../lib/metadata";

export const metadata: Metadata = AboutMetadata;

const SupportUs = () => {
  return (
    <div className="container min-h-screen mt-24">
      {/* Hero section */}
      <Hero pattern="bg-about-pattern" />

      {/* About us grid Cards */}
      <AboutCards />

      <MartyrBanner />

      <PlatformDescription />

      <ContactForm />
    </div>
  );
};

export default SupportUs;
