import HeroSection from "@/components/sections/HeroSection";
import QuickSearch from "@/components/booking/QuickSearch";
import FleetSection from "@/components/sections/FleetSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import RentalConditionsSection from "@/components/sections/RentalConditionsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactAndLocation from "@/components/sections/ContactAndLocation";
import CtaSection from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      {/* Full-viewport hero */}
      <HeroSection />

      {/*
       * QuickSearch floats at the hero / content boundary.
       * -mt-14 pulls the card 56 px UP into the hero's bottom,
       * creating the visual "anchored between sections" overlap.
       * z-20 keeps it above adjacent sections.
       */}
      <div className="relative z-20 mx-auto -mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
        <QuickSearch />
      </div>

      {/* pt-14 compensates so FleetSection starts below the QuickSearch card */}
      <div className="pt-14">
        <FleetSection />
      </div>

      <HowItWorksSection />
      <RentalConditionsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactAndLocation />
      <CtaSection />
    </>
  );
}
