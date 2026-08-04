import React from "react";
import PromoBanner from "../components/site/PromoBanner";
import Header from "../components/site/Header";
import Hero from "../components/site/Hero";
import Marquee from "../components/site/Marquee";
import Trust from "../components/site/Trust";
import Slideshow from "../components/site/Slideshow";
import Packages from "../components/site/Packages";
import Recommender from "../components/site/Recommender";
import Clients from "../components/site/Clients";
import Payment from "../components/site/Payment";
import Features from "../components/site/Features";
import Comparison from "../components/site/Comparison";
import About from "../components/site/About";
import Testimonials from "../components/site/Testimonials";
import Blog from "../components/site/Blog";
import FAQ from "../components/site/FAQ";
import Subscribe from "../components/site/Subscribe";
import Contact from "../components/site/Contact";
import Footer from "../components/site/Footer";
import FloatingWhatsapp from "../components/site/FloatingWhatsapp";

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="relative">
      <div className="sticky top-0 z-50">
        <PromoBanner />
        <Header />
      </div>
      <main>
        <Hero />
        <Marquee />
        <Slideshow />
        <Trust />
        <Packages />
        <Recommender />
        <Clients />
        <Features />
        <Comparison />
        <About />
        <Testimonials />
        <Blog />
        <FAQ />
        <Subscribe />
        <Payment />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
