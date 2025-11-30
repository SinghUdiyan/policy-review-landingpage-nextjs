import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import CTA from "@/components/sections/CTA";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
      <Reviews />
      <Footer />
    </main>
  );
}
