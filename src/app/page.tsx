import { Nav } from "@/components/Nav";
import { CinematicEntry } from "@/components/CinematicEntry";
import { Hero } from "@/components/Hero";
import { FeaturedVehicles } from "@/components/FeaturedVehicles";
import { Brands } from "@/components/Brands";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { VehicleCollection } from "@/components/VehicleCollection";
import { Lifestyle } from "@/components/Lifestyle";
import { Services } from "@/components/Services";
import { TestDriveCTA } from "@/components/TestDriveCTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#site"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-graphite"
      >
        Skip cinematic intro
      </a>
      <Nav />
      <CinematicEntry />
      <main className="flex-1">
        <Hero />
        <FeaturedVehicles />
        <Brands />
        <WhyChooseUs />
        <VehicleCollection />
        <Lifestyle />
        <Services />
        <TestDriveCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
