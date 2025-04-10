import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";


// deleted testimonials Component
import Testimonials from "@/components/Testimonials";



export const metadata: Metadata = {
  title: "Diascan",
  description: "This is a healthcare platform designed to help individuals detect, monitor, and manage diabetes effortlessly.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Contact />
    </>
  );
}
