import Hero from "@/components/layout/hero";
import AboutCards from "@/containers/about/aboutCards";
import ContactForm from "@/containers/about/contactForm";
import PlatformDescription from "@/containers/about/platformDescription";
import PlatformVideo from "@/containers/about/platformVideo";
import React from "react";

const SupportUs = () => {
  return (
    <div className="container min-h-screen mt-24">
      {/* Hero section */}
      <Hero />

      {/* About us grid Cards */}
      <AboutCards />

      <PlatformVideo />

      <PlatformDescription />

      <ContactForm />
    </div>
  );
};

export default SupportUs;
