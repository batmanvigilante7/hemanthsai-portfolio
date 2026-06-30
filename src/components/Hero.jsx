import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FadeContent from "./FadeContent";

gsap.registerPlugin(ScrollTrigger);

const GENESIS_VIDEO = `${import.meta.env.BASE_URL}assets/videos/genesis.mp4`;

export default function Hero() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const leftSeamRef = useRef(null);
  const rightSeamRef = useRef(null);
  const landscapeRef = useRef(null);
  const gridRef = useRef(null);
  const reflectionsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    // Initial states for scroll-driven elements
    gsap.set([leftPanelRef.current, rightPanelRef.current], { xPercent: 0, scaleX: 1, rotateY: 0 });
    gsap.set([leftSeamRef.current, rightSeamRef.current], { opacity: 1 });
    gsap.set(landscapeRef.current, { opacity: 0 });
    gsap.set(gridRef.current, { opacity: 0 });
    gsap.set(reflectionsRef.current, { opacity: 0 });
    gsap.set(scrollIndicatorRef.current, { opacity: 1, y: 0 });

    // Scroll-driven timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1.2, // Heavy mechanical feel
        pin: true,
        anticipatePin: 1,
      }
    });

    // 0 -> 35%: Curtains remain closed. Scroll indicator fades out.
    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: -15,
      duration: 35,
      ease: "power2.out"
    }, 0);

    // 35% -> 100%: Curtains slide apart slowly to 82% (leaving 18% framing visible)
    tl.to(leftPanelRef.current, {
      xPercent: -82,
      scaleX: 0.94,
      rotateY: -4,
      ease: "power3.inOut",
      duration: 65
    }, 35);
    tl.to(rightPanelRef.current, {
      xPercent: 82,
      scaleX: 0.94,
      rotateY: 4,
      ease: "power3.inOut",
      duration: 65
    }, 35);

    // Seam trims blend-out slightly as curtains separate
    tl.to([leftSeamRef.current, rightSeamRef.current], {
      opacity: 0.2, // Keep faint glow on separated trims
      ease: "power2.out",
      duration: 25
    }, 35);

    // 20% -> 60%: Background landscape/grid/reflections fade in from 0 to 1
    tl.to(landscapeRef.current, {
      opacity: 1,
      ease: "sine.out",
      duration: 40
    }, 20);
    tl.to(gridRef.current, {
      opacity: 1,
      ease: "sine.out",
      duration: 40
    }, 20);
    tl.to(reflectionsRef.current, {
      opacity: 1,
      ease: "sine.out",
      duration: 40
    }, 20);

    // 95% -> 100%: Hold at fully open state
    tl.to({}, { duration: 5 }, 95);

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
        <div className="absolute -top-[2.2rem] left-[1.5rem] select-none pointer-events-none z-30">
          <FadeContent blur={false} duration={900} delay={100} initialOpacity={0}>
            <div className="font-mono text-[9px] tracking-[0.35em] text-white/35 uppercase">
              COACH 01 // BUILDER CLASS
            </div>
          </FadeContent>
        </div>

        {/* Top Right HUD Markings */}
        <div className="absolute -top-[2.2rem] right-[1.5rem] select-none pointer-events-none z-30">
          <FadeContent blur={false} duration={900} delay={100} initialOpacity={0}>
            <div className="font-mono text-[9px] tracking-[0.35em] text-white/35 uppercase flex gap-6">
              <span>SYS // ACTIVE</span>
            </div>
          </FadeContent>
        </div>

        {/* The Panoramic Window */}
        <div 
          className="relative w-[82vw] h-[78vh] md:w-[80vw] md:h-[75vh] rounded-[2.8rem] overflow-hidden bg-[#030303] flex items-center justify-center shadow-[inset_0_0_120px_rgba(0,0,0,0.98)]"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          
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

          {/* Soft Vignette Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-22 rounded-[inherit] mix-blend-multiply opacity-80"
            style={{
              background: "radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.85) 100%)"
            }}
          />

          {/* Glass Reflections & Glare Bezel Layer */}
          <div ref={reflectionsRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 28 }}>
            {/* Diagonal reflection streaks */}
            <div 
              className="absolute inset-0 opacity-[0.07]"
              style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.4) 43%, transparent 44%, transparent 50%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0.3) 57%, transparent 58%)",
                backgroundSize: "200% 200%"
              }}
            />

            {/* Subtle blue/white glare */}
            <div 
              className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-cyan-500/10 via-white/10 to-transparent blur-3xl"
            />

            {/* Faint dust/noise texture */}
            <div 
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay animate-pulse"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                animationDuration: "4s"
              }}
            />

            {/* Inset shadow for glass/bezel depth */}
            <div 
              className="absolute inset-0 rounded-[2.8rem] shadow-[inset_0_4px_30px_rgba(255,255,255,0.08),inset_0_-4px_30px_rgba(0,0,0,0.85)] border border-white/10"
            />
          </div>

          {/* HUD text details */}
          <div className="absolute bottom-6 right-8 select-none pointer-events-none z-30">
            <FadeContent blur={false} duration={1000} delay={500} initialOpacity={0}>
              <div className="font-mono text-[9px] tracking-[0.25em] text-white/35 uppercase flex flex-col items-end gap-1">
                <div>DEPART // POTENTIAL</div>
                <div>ARRIVE // PROOF</div>
              </div>
            </FadeContent>
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
              <FadeContent blur={false} duration={1000} delay={200} initialOpacity={0}>
                <h1 className="font-instrument text-[clamp(2.8rem,5.5vw,5rem)] tracking-[0.08em] text-white font-normal uppercase leading-none mb-6">
                  Hemanth Sai
                </h1>
              </FadeContent>

              <FadeContent blur={false} duration={1000} delay={350} initialOpacity={0}>
                <p className="font-instrument italic text-xl sm:text-2xl md:text-3xl text-stone-300/90 leading-tight mb-8">
                  Learning by building.
                </p>
              </FadeContent>

              <FadeContent blur={false} duration={1000} delay={500} initialOpacity={0}>
                <div className="flex flex-col gap-1.5 font-outfit text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 leading-relaxed mb-8">
                  <p>CSE Student</p>
                  <p>GITAM University, Visakhapatnam</p>
                </div>
              </FadeContent>

              <FadeContent blur={false} duration={1100} delay={650} initialOpacity={0}>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  {/* Glass buttons with white borders */}
                  <a
                    href="#projects"
                    className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-none pointer-events-auto"
                  >
                    Explore Projects
                  </a>
                  <a
                    href="#contact"
                    className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 bg-black/25 border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 pointer-events-auto"
                  >
                    Contact Me
                  </a>
                </div>
              </FadeContent>
            </div>
          </div>

          {/* Sliding Symmetrical Cinematic Panels (Curtains) */}
          {/* Left Panel */}
          <div
            ref={leftPanelRef}
            className="absolute inset-y-0 left-0 w-1/2 z-40 border-r border-white/5 select-none pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  rgba(255,255,255,0.09) 0px,
                  rgba(255,255,255,0.03) 8px,
                  rgba(0,0,0,0.24) 20px,
                  rgba(255,255,255,0.04) 34px
                ),
                linear-gradient(90deg,
                  rgba(45,5,12,0.98),
                  rgba(118,12,30,0.96),
                  rgba(45,5,12,0.98)
                )
              `,
              boxShadow: "inset -15px 0 40px rgba(0,0,0,0.6), 5px 0 25px rgba(0,0,0,0.4)",
              transformOrigin: "left center",
            }}
          >
            {/* Velvet sheen overlay */}
            <div 
              className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.15) 52%, transparent 60%)`,
              }}
            />
            {/* Soft noise texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
              }}
            />
            {/* Inner gold piping (on the right edge of left panel) */}
            <div 
              ref={leftSeamRef}
              className="absolute inset-y-0 right-0 w-[2px]"
              style={{
                background: "linear-gradient(to bottom, transparent, #ffd23f, transparent)",
                boxShadow: "0 0 24px rgba(255, 210, 63, 0.55)",
              }}
            />
          </div>

          {/* Right Panel */}
          <div
            ref={rightPanelRef}
            className="absolute inset-y-0 right-0 w-1/2 z-40 border-l border-white/5 select-none pointer-events-none"
            style={{
              transformOrigin: "right center",
            }}
          >
            {/* Symmetrical Mirrored Inner Curtain Container */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                transform: "scaleX(-1)",
                backgroundImage: `
                  repeating-linear-gradient(
                    90deg,
                    rgba(255,255,255,0.09) 0px,
                    rgba(255,255,255,0.03) 8px,
                    rgba(0,0,0,0.24) 20px,
                    rgba(255,255,255,0.04) 34px
                  ),
                  linear-gradient(90deg,
                    rgba(45,5,12,0.98),
                    rgba(118,12,30,0.96),
                    rgba(45,5,12,0.98)
                  )
                `,
                boxShadow: "inset -15px 0 40px rgba(0,0,0,0.6), 5px 0 25px rgba(0,0,0,0.4)",
              }}
            >
              {/* Velvet sheen overlay */}
              <div 
                className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.15) 52%, transparent 60%)`,
                }}
              />
              {/* Soft noise texture overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
              />
            </div>
            {/* Inner gold piping (on the left edge of right panel - not mirrored so it meeting at the seam!) */}
            <div 
              ref={rightSeamRef}
              className="absolute inset-y-0 left-0 w-[2px]"
              style={{
                background: "linear-gradient(to bottom, transparent, #ffd23f, transparent)",
                boxShadow: "0 0 24px rgba(255, 210, 63, 0.55)",
              }}
            />
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
