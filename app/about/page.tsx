import ContactForm from "@/containers/about/contactForm";
import Hero from "@/containers/about/hero";
import PlatformDescription from "@/containers/about/platformDescription";
import PlatformVideo from "@/containers/about/platformVideo";
import React from "react";

const SupportUs = () => {
  return (
    <div className="container min-h-screen mt-24">
      {/* Hero section */}
      <Hero />

      <PlatformVideo />

      <PlatformDescription />

      <ContactForm />
    </div>
  );
};

export default SupportUs;
