import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

// Component Imports
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import IdentityStack from "./components/IdentityStack";
import OperatingMethod from "./components/OperatingMethod";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Register GSAP ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    // 2. Synchronize Lenis scrolling with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Sync Lenis with GSAP ticker
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // 4. Disable GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    // 5. Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white selection:bg-[#facc15]/30 selection:text-white">
      {/* Cinematic noise film grain overlay */}
      <div className="noise-bg" aria-hidden="true"></div>

      {/* Top Fixed Responsive Navbar */}
      <Navbar />

      {/* Fullscreen Fixed Background Section */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <Portfolio />
      </div>

      {/* Content wrapper that scrolls over portfolio with overlap effect */}
      <div className="relative z-10 w-full pointer-events-none">
        {/* Spacer to show the fixed fullscreen portfolio background on first load */}
        <div className="h-screen w-full pointer-events-none" />

        {/* Scrollable solid content area */}
        <div className="bg-zinc-950 w-full pointer-events-auto">
          <Hero />
          <Welcome />
          <IdentityStack />
          <OperatingMethod />
          <Projects />
          <Services />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
}
