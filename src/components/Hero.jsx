import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeContent from "./FadeContent";

const GENESIS_VIDEO = `${import.meta.env.BASE_URL}assets/videos/genesis.mp4`;

export default function Hero() {
  const videoRef = useRef(null);

  const [isSessionRevealed, setIsSessionRevealed] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("hero-revealed");
    }
    return false;
  });

  const [showCurtains, setShowCurtains] = useState(!isSessionRevealed);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented, trying again on interaction:", err);
      });
    }
  }, []);

  useEffect(() => {
    if (!isSessionRevealed) {
      const timer = setTimeout(() => {
        setShowCurtains(false);
        sessionStorage.setItem("hero-revealed", "true");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isSessionRevealed]);

  return (
    <>
      <AnimatePresence>
        {showCurtains && (
          <div className="fixed inset-0 z-[100] flex pointer-events-none">
            {/* Left Curtain */}
            <motion.div
              key="left-curtain"
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "50vw",
                height: "100vh",
                background: "linear-gradient(to right, #020202, #070707, #111111)",
                boxShadow: "inset -25px 0 50px rgba(255,255,255,0.03), inset 25px 0 50px rgba(0,0,0,0.35)",
                zIndex: 100,
                pointerEvents: "auto"
              }}
            >
              {/* Edge highlight */}
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100%",
                  background: "linear-gradient(to left, rgba(255, 255, 255, 0.05), transparent)",
                  pointerEvents: "none"
                }}
              />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
              key="right-curtain"
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "50vw",
                height: "100vh",
                background: "linear-gradient(to left, #020202, #070707, #111111)",
                boxShadow: "inset 25px 0 50px rgba(255,255,255,0.03), inset -25px 0 50px rgba(0,0,0,0.35)",
                zIndex: 100,
                pointerEvents: "auto"
              }}
            >
              {/* Edge highlight */}
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100px",
                  height: "100%",
                  background: "linear-gradient(to right, rgba(255, 255, 255, 0.05), transparent)",
                  pointerEvents: "none"
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section
        id="hero"
        className="relative w-full h-screen text-white bg-[#060608] flex items-center justify-center overflow-hidden select-none"
      >
        {/* Soft Ambient LED strips in the background (Luxury train coach feel) */}
        <div className="absolute left-[3vw] top-[15vh] bottom-[15vh] w-[2px] bg-gradient-to-b from-transparent via-[#facc15]/15 to-transparent blur-[1px] opacity-60 z-0" />
        <div className="absolute right-[3vw] top-[15vh] bottom-[15vh] w-[2px] bg-gradient-to-b from-transparent via-[#facc15]/15 to-transparent blur-[1px] opacity-60 z-0" />

        {/* Ambient background glow */}
        <motion.div
          initial={isSessionRevealed ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={isSessionRevealed ? { duration: 0 } : { delay: 0.9, duration: 1.2, ease: "easeOut" }}
          className="absolute w-[60vw] h-[60vw] bg-[#facc15]/5 rounded-full blur-[130px] pointer-events-none z-0"
        />

        {/* Outer Coach Frame Bezel */}
        <motion.div
          initial={isSessionRevealed ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={isSessionRevealed ? { duration: 0 } : { delay: 0.4, duration: 1.0, ease: "easeInOut" }}
          className="relative p-[6px] rounded-[3.2rem] bg-gradient-to-b from-[#1b1c20] via-[#090a0c] to-[#030304] shadow-[0_30px_100px_rgba(0,0,0,0.85)] border border-white/5 z-10 flex items-center justify-center"
        >
          {/* Top Label */}
          <FadeContent
            blur={!isSessionRevealed}
            duration={isSessionRevealed ? 0 : 900}
            ease="power2.out"
            initialOpacity={0}
            className="absolute -top-[2.2rem] left-[1.5rem] select-none pointer-events-none"
          >
            <div className="font-mono text-[9px] tracking-[0.35em] text-white/35 uppercase">
              COACH 01 // BUILDER CLASS
            </div>
          </FadeContent>

          {/* Top Right HUD Markings */}
          <FadeContent
            blur={!isSessionRevealed}
            duration={isSessionRevealed ? 0 : 900}
            ease="power2.out"
            delay={isSessionRevealed ? 0 : 100}
            initialOpacity={0}
            className="absolute -top-[2.2rem] right-[1.5rem] select-none pointer-events-none"
          >
            <div className="font-mono text-[9px] tracking-[0.35em] text-white/35 uppercase flex gap-6">
              <span>SYS // ACTIVE</span>
            </div>
          </FadeContent>

          {/* The Panoramic Window */}
          <div className="relative w-[82vw] h-[78vh] md:w-[80vw] md:h-[75vh] rounded-[2.8rem] overflow-hidden bg-[#030303] flex items-center justify-center shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]">
            
            {/* Landscape Layer 1: Far background (slow video horizontal movement) */}
            <motion.div
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
            <motion.div
              animate={{ x: [0, -60] }}
              transition={{
                duration: 12,
                ease: "linear",
                repeat: Infinity
              }}
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
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 28 }}>
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
            <FadeContent
              blur={!isSessionRevealed}
              duration={isSessionRevealed ? 0 : 1000}
              ease="power2.out"
              delay={isSessionRevealed ? 0 : 350}
              initialOpacity={0}
              className="absolute bottom-6 right-8 z-30 select-none pointer-events-none"
            >
              <div className="font-mono text-[9px] tracking-[0.25em] text-white/35 uppercase flex flex-col items-end gap-1">
                <div>DEPART // POTENTIAL</div>
                <div>ARRIVE // PROOF</div>
              </div>
            </FadeContent>

            {/* Layer 5: Hero Text Content & Readability Gradient Overlay */}
            <div 
              className="absolute inset-y-0 left-0 w-[60%] flex items-center justify-start pl-12 md:pl-20 pr-8 z-30 pointer-events-none"
            >
              {/* Dark gradient backdrop for text readability */}
              <div 
                className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/85 via-black/35 to-transparent pointer-events-none"
              />

              <div className="relative max-w-md text-left flex flex-col items-start pointer-events-auto">
                <FadeContent
                  blur={!isSessionRevealed}
                  duration={isSessionRevealed ? 0 : 1100}
                  ease="power3.out"
                  delay={isSessionRevealed ? 0 : 150}
                  initialOpacity={0}
                >
                  <h1 className="font-instrument text-[clamp(2.8rem,5.5vw,5rem)] tracking-[0.08em] text-white font-normal uppercase leading-none mb-6">
                    Hemanth Sai
                  </h1>
                </FadeContent>

                <FadeContent
                  blur={!isSessionRevealed}
                  duration={isSessionRevealed ? 0 : 1000}
                  ease="power2.out"
                  delay={isSessionRevealed ? 0 : 300}
                  initialOpacity={0}
                >
                  <p className="font-instrument italic text-xl sm:text-2xl md:text-3xl text-stone-300/90 leading-tight mb-8">
                    Learning by building.
                  </p>
                </FadeContent>

                <FadeContent
                  blur={!isSessionRevealed}
                  duration={isSessionRevealed ? 0 : 1000}
                  ease="power2.out"
                  delay={isSessionRevealed ? 0 : 380}
                  initialOpacity={0}
                >
                  <div className="flex flex-col gap-1.5 font-outfit text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 leading-relaxed mb-8">
                    <p>CSE Student</p>
                    <p>GITAM University, Visakhapatnam</p>
                  </div>
                </FadeContent>

                <FadeContent
                  blur={!isSessionRevealed}
                  duration={isSessionRevealed ? 0 : 900}
                  ease="power2.out"
                  delay={isSessionRevealed ? 0 : 450}
                  initialOpacity={0}
                >
                  <div className="flex flex-wrap items-center gap-4 mt-2">
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
                </FadeContent>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2 z-20">
          <FadeContent
            blur={!isSessionRevealed}
            duration={isSessionRevealed ? 0 : 1000}
            ease="power2.out"
            delay={isSessionRevealed ? 0 : 500}
            initialOpacity={0}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/45">Scroll to enter</span>
              <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
            </div>
          </FadeContent>
        </div>
      </section>
    </>
  );
}




