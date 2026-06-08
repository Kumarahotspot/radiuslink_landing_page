import React from "react";
import Header from "../components/site/Header";
import Hero from "../components/site/Hero";
import Marquee from "../components/site/Marquee";
import Packages from "../components/site/Packages";
import Coverage from "../components/site/Coverage";
import Features from "../components/site/Features";
import About from "../components/site/About";
import Testimonials from "../components/site/Testimonials";
import FAQ from "../components/site/FAQ";
import Subscribe from "../components/site/Subscribe";
import Contact from "../components/site/Contact";
import Footer from "../components/site/Footer";
import FloatingWhatsapp from "../components/site/FloatingWhatsapp";

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="relative">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Packages />
        <Coverage />
        <Features />
        <About />
        <Testimonials />
        <FAQ />
        <Subscribe />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
