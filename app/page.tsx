import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import CTA from "@/components/sections/CTA";
import Reviews from "@/components/sections/Reviews";
import { isWaitlistMode } from "@/lib/config/waitlist";

export default function Home() {
  const isWaitlist = isWaitlistMode();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
      {!isWaitlist && <Reviews />}
      <Footer />
    </main>
  );
}
