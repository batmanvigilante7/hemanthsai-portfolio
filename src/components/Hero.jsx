import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const GENESIS_VIDEO = `${import.meta.env.BASE_URL}assets/videos/genesis.mp4`;

export default function Hero() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const landscapeRef = useRef(null);
  const gridRef = useRef(null);
  const reflectionsRef = useRef(null);
  
  const topLabelRef = useRef(null);
  const topStatusRef = useRef(null);
  const hudRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const detailsRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    // Initial states for scroll-driven elements
    gsap.set([leftPanelRef.current, rightPanelRef.current], { xPercent: 0 });
    gsap.set(landscapeRef.current, { opacity: 0 });
    gsap.set(gridRef.current, { opacity: 0 });
    gsap.set(reflectionsRef.current, { opacity: 0 });
    gsap.set([topLabelRef.current, topStatusRef.current, hudRef.current], { opacity: 0 });
    gsap.set(headlineRef.current, { opacity: 0, y: 30 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(detailsRef.current, { opacity: 0, y: 15 });
    gsap.set(ctaRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(scrollIndicatorRef.current, { opacity: 1, y: 0 });

    // Scroll-driven timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1.2, // Adds a heavy, buttery mechanical lag to the scroll tracking
        pin: true,
        anticipatePin: 1,
      }
    });

    // 0 -> 15%: Curtains closed. Scroll indicator fades out.
    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: -15,
      duration: 15,
      ease: "power2.out"
    }, 0);

    // 15% -> 50%: Curtains slide apart with heavy mechanical non-linear ease.
    tl.to(leftPanelRef.current, {
      xPercent: -100,
      ease: "power3.inOut",
      duration: 35
    }, 15);
    tl.to(rightPanelRef.current, {
      xPercent: 100,
      ease: "power3.inOut",
      duration: 35
    }, 15);

    // 30% -> 60%: Landscape, grid, and glass reflections fade in.
    tl.to(landscapeRef.current, {
      opacity: 0.7,
      ease: "sine.out",
      duration: 25
    }, 30);
    tl.to(gridRef.current, {
      opacity: 1,
      ease: "sine.out",
      duration: 25
    }, 30);
    tl.to(reflectionsRef.current, {
      opacity: 1,
      ease: "sine.out",
      duration: 25
    }, 30);

    // 40% -> 65%: Bezel UI and Main Text fade in.
    tl.to([topLabelRef.current, topStatusRef.current, hudRef.current], {
      opacity: 1,
      ease: "sine.out",
      duration: 20
    }, 40);
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 20
    }, 45);
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 20
    }, 52);
    tl.to(detailsRef.current, {
      opacity: 0.5,
      y: 0,
      ease: "power2.out",
      duration: 20
    }, 58);

    // 65% -> 85%: CTA buttons fade in.
    tl.to(ctaRef.current, {
      opacity: 1,
      scale: 1,
      ease: "power2.out",
      duration: 20
    }, 65);

    // 85% -> 100%: Pinned hold at fully open state
    tl.to({}, { duration: 15 }, 85);

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen text-white bg-[#060608] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Soft Ambient LED strips in the background (Luxury train coach feel) */}
      <div className="absolute left-[3vw] top-[15vh] bottom-[15vh] w-[2px] bg-gradient-to-b from-transparent via-[#facc15]/15 to-transparent blur-[1px] opacity-60 z-0" />
      <div className="absolute right-[3vw] top-[15vh] bottom-[15vh] w-[2px] bg-gradient-to-b from-transparent via-[#facc15]/15 to-transparent blur-[1px] opacity-60 z-0" />

      {/* Ambient background glow */}
      <div className="absolute w-[60vw] h-[60vw] bg-[#facc15]/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Outer Coach Frame Bezel */}
      <div className="relative p-[6px] rounded-[3.2rem] bg-gradient-to-b from-[#1b1c20] via-[#090a0c] to-[#030304] shadow-[0_30px_100px_rgba(0,0,0,0.85)] border border-white/5 z-10 flex items-center justify-center">
        
        {/* Top Label */}
        <div
          ref={topLabelRef}
          className="absolute -top-[2.2rem] left-[1.5rem] select-none pointer-events-none font-mono text-[9px] tracking-[0.35em] text-white/35 uppercase"
        >
          COACH 01 // BUILDER CLASS
        </div>

        {/* Top Right HUD Markings */}
        <div
          ref={topStatusRef}
          className="absolute -top-[2.2rem] right-[1.5rem] select-none pointer-events-none font-mono text-[9px] tracking-[0.35em] text-white/35 uppercase flex gap-6"
        >
          <span>SYS // ACTIVE</span>
        </div>

        {/* The Panoramic Window */}
        <div className="relative w-[82vw] h-[78vh] md:w-[80vw] md:h-[75vh] rounded-[2.8rem] overflow-hidden bg-[#030303] flex items-center justify-center shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]">
          
          {/* Landscape Layer 1: Far background (slow video horizontal movement) */}
          <motion.div
            ref={landscapeRef}
            animate={{ x: ["0%", "-10%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ filter: "brightness(0.7) contrast(1.1)", zIndex: 10 }}
            className="absolute inset-y-0 left-0 w-[120%] h-full pointer-events-none"
          >
            <video
              ref={videoRef}
              src={GENESIS_VIDEO}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </motion.div>

          {/* Landscape Layer 2: Mid digital tech grid */}
          <div
            ref={gridRef}
            style={{
              zIndex: 15,
              backgroundImage: `
                linear-gradient(rgba(250,202,21,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(250,202,21,0.02) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
            className="absolute inset-y-0 -left-[60px] right-0 pointer-events-none"
          />

          {/* Landscape Layer 3: Foreground moving light streaks (speed illusion) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
            {/* Streak 1 */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-150%", opacity: [0, 0.4, 0.4, 0] }}
              transition={{
                duration: 4.0,
                ease: "linear",
                repeat: Infinity,
                delay: 0.5
              }}
              className="absolute top-1/4 h-[1px] w-[180px] bg-gradient-to-r from-transparent via-[#facc15]/30 to-transparent"
            />
            {/* Streak 2 */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-150%", opacity: [0, 0.2, 0.2, 0] }}
              transition={{
                duration: 5.5,
                ease: "linear",
                repeat: Infinity,
                delay: 2.5
              }}
              className="absolute top-1/2 h-[2px] w-[120px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            {/* Streak 3 */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-150%", opacity: [0, 0.3, 0.3, 0] }}
              transition={{
                duration: 6.8,
                ease: "linear",
                repeat: Infinity,
                delay: 1.2
              }}
              className="absolute top-2/3 h-[1px] w-[250px] bg-gradient-to-r from-transparent via-[#facc15]/15 to-transparent"
            />
          </div>

          {/* Glass Reflections & Glare Bezel Layer */}
          <div ref={reflectionsRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 28 }}>
            {/* Diagonal reflection streaks */}
            <div 
              className="absolute inset-0 opacity-[0.05]"
              style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.4) 43%, transparent 44%, transparent 50%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0.3) 57%, transparent 58%)",
                backgroundSize: "200% 200%"
              }}
            />

            {/* Soft glare near top-left */}
            <div 
              className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl"
            />

            {/* Faint dust/noise texture */}
            <div 
              className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
              }}
            />

            {/* Inset shadow for glass/bezel depth */}
            <div 
              className="absolute inset-0 rounded-[inherit] shadow-[inset_0_4px_30px_rgba(255,255,255,0.08),inset_0_-4px_30px_rgba(0,0,0,0.85)] border border-white/10"
            />
          </div>

          {/* HUD text details */}
          <div
            ref={hudRef}
            className="absolute bottom-6 right-8 font-mono text-[9px] tracking-[0.25em] text-white/35 uppercase z-30 flex flex-col items-end gap-1 select-none pointer-events-none"
          >
            <div>DEPART // POTENTIAL</div>
            <div>ARRIVE // PROOF</div>
          </div>

          {/* Layer 5: Hero Text Content & Readability Gradient Overlay */}
          <div 
            className="absolute inset-y-0 left-0 w-[60%] flex items-center justify-start pl-12 md:pl-20 pr-8 z-30 pointer-events-none"
          >
            {/* Dark gradient backdrop for text readability */}
            <div 
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/85 via-black/35 to-transparent pointer-events-none"
            />

            <div className="relative max-w-md text-left flex flex-col items-start pointer-events-auto">
              <h1
                ref={headlineRef}
                className="font-instrument text-[clamp(2.8rem,5.5vw,5rem)] tracking-[0.08em] text-white font-normal uppercase leading-none mb-6"
              >
                Hemanth Sai
              </h1>
              <p
                ref={subtitleRef}
                className="font-instrument italic text-xl sm:text-2xl md:text-3xl text-stone-300/90 leading-tight mb-8"
              >
                Learning by building.
              </p>
              <div
                ref={detailsRef}
                className="flex flex-col gap-1.5 font-outfit text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 leading-relaxed mb-8"
              >
                <p>CSE Student</p>
                <p>GITAM University, Visakhapatnam</p>
              </div>
              <div
                ref={ctaRef}
                className="flex flex-wrap items-center gap-4 mt-2"
              >
                {/* Glass buttons with white borders */}
                <a
                  href="#projects"
                  className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-none pointer-events-auto"
                >
                  Explore Projects
                </a>
                <a
                  href="#contact"
                  className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 bg-black/25 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 pointer-events-auto"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          {/* Sliding Cinematic Panels (Curtains) */}
          {/* Left Panel */}
          <div
            ref={leftPanelRef}
            className="absolute inset-y-0 left-0 w-1/2 z-40 border-r border-white/10 flex items-center justify-end select-none pointer-events-none"
            style={{
              background: "linear-gradient(to right, #09090b, #18181b, #111115)",
              boxShadow: "inset -15px 0 40px rgba(0,0,0,0.9), 10px 0 30px rgba(0,0,0,0.5)",
            }}
          >
            {/* Brushed metal fine lines texture */}
            <div 
              className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`,
              }}
            />
            {/* Edge lighting / amber neon seam */}
            <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-[#facc15]/40 to-transparent shadow-[0_0_15px_#facc15]" />
          </div>

          {/* Right Panel */}
          <div
            ref={rightPanelRef}
            className="absolute inset-y-0 right-0 w-1/2 z-40 border-l border-white/10 flex items-center justify-start select-none pointer-events-none"
            style={{
              background: "linear-gradient(to left, #09090b, #18181b, #111115)",
              boxShadow: "inset 15px 0 40px rgba(0,0,0,0.9), -10px 0 30px rgba(0,0,0,0.5)",
            }}
          >
            {/* Brushed metal fine lines texture */}
            <div 
              className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`,
              }}
            />
            {/* Edge lighting / amber neon seam */}
            <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-[#facc15]/40 to-transparent shadow-[0_0_15px_#facc15]" />
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/45">Scroll to enter</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
