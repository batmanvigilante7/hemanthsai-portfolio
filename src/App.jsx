import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import VideoHero from "./components/VideoHero";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import IdentityStack from "./components/IdentityStack";
import OperatingMethod from "./components/OperatingMethod";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tickerUpdate = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white selection:bg-[#facc15]/30 selection:text-white">
      <div className="noise-bg" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10 w-full">
        <VideoHero />
        <Hero />
        <Welcome />
        <IdentityStack />
        <OperatingMethod />
        <Projects />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
