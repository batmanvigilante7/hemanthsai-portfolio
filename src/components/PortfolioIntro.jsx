import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import heroPortrait from "../assets/hero-portrait.jpg";

export default function PortfolioIntro() {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const imageCardRef = useRef(null);
  const imageAreaRef = useRef(null);
  const selectorRef = useRef(null);

  const xTo = useRef(null);
  const yTo = useRef(null);

  // Background Colors selector list
  const colors = [
    { name: "red", hex: "#7f1d1d", bgClass: "bg-red-800" }, // luxury crimson/burgundy
    { name: "yellow", hex: "#f4c400", bgClass: "bg-[#f4c400]" }, // default yellow
    { name: "green", hex: "#064e3b", bgClass: "bg-emerald-900" }, // deep forest/emerald
    { name: "purple", hex: "#3b0764", bgClass: "bg-purple-950" }, // deep royal purple
    { name: "rose", hex: "#4c0519", bgClass: "bg-rose-950" }, // deep premium rose
    { name: "orange", hex: "#7c2d12", bgClass: "bg-orange-950" }, // rich terracotta orange
  ];

  const [activeColor, setActiveColor] = useState("#f4c400");
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection for mobile simplification
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP Intro Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Reset initial values
      gsap.set(bgTextRef.current, { scale: 0.85, opacity: 0 });
      gsap.set(imageCardRef.current, { y: 60, scale: 0.95, opacity: 0 });
      gsap.set(selectorRef.current, { y: 20, opacity: 0 });

      // Run intro animations
      tl.to(bgTextRef.current, { scale: 1, opacity: 1, duration: 1.6, ease: "power4.out" }, 0.1);
      tl.to(imageCardRef.current, { y: 0, scale: 1, opacity: 1, duration: 1.4 }, 0.3);
      tl.to(selectorRef.current, { y: 0, opacity: 1, duration: 1.0 }, 0.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP quickTo tracker initialization for smooth delayed mouse reveal
  useEffect(() => {
    if (isMobile || !imageAreaRef.current) return;

    const rect = imageAreaRef.current.getBoundingClientRect();
    const mousePos = { x: rect.width / 2, y: rect.height / 2 };

    // Set initial custom property values
    imageAreaRef.current.style.setProperty("--reveal-x", mousePos.x);
    imageAreaRef.current.style.setProperty("--reveal-y", mousePos.y);

    xTo.current = gsap.quickTo(mousePos, "x", {
      duration: 0.45,
      ease: "power3.out",
      onUpdate: () => {
        if (imageAreaRef.current) {
          imageAreaRef.current.style.setProperty("--reveal-x", mousePos.x);
        }
      },
    });

    yTo.current = gsap.quickTo(mousePos, "y", {
      duration: 0.45,
      ease: "power3.out",
      onUpdate: () => {
        if (imageAreaRef.current) {
          imageAreaRef.current.style.setProperty("--reveal-y", mousePos.y);
        }
      },
    });
  }, [isMobile]);

  // Track mouse coordinates on hover/move
  const handleMouseMove = (e) => {
    if (isMobile || !imageAreaRef.current) return;
    const rect = imageAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (xTo.current && yTo.current) {
      xTo.current(x);
      yTo.current(y);
    }
  };

  // Animate scanner back to center when mouse leaves
  const handleMouseLeave = () => {
    if (isMobile || !imageAreaRef.current) return;
    const rect = imageAreaRef.current.getBoundingClientRect();
    if (xTo.current && yTo.current) {
      xTo.current(rect.width / 2);
      yTo.current(rect.height / 2);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio-intro"
      style={{ backgroundColor: activeColor }}
      className="w-full min-h-screen relative flex flex-col justify-center items-center overflow-hidden py-24 transition-colors duration-1000 ease-out cursor-crosshair selection:bg-zinc-950 selection:text-white"
    >
      {/* Huge Background Typography text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <h2 className="font-syne font-black text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] xl:text-[17rem] tracking-tighter leading-none text-center flex flex-wrap justify-center gap-x-6">
          <span className="text-zinc-950/85">P</span>
          <span
            className="text-transparent font-light"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}
          >
            O
          </span>
          <span className="text-zinc-950/85">R</span>
          <span className="text-zinc-950/85">T</span>
          <span
            className="text-transparent font-light"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}
          >
            F
          </span>
          <span className="text-zinc-950/85">O</span>
          <span className="text-zinc-950/85">L</span>
          <span
            className="text-transparent font-light"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}
          >
            I
          </span>
          <span className="text-zinc-950/85">O</span>
        </h2>
      </div>

      {/* Centered Image Showcase Area */}
      <div
        ref={imageCardRef}
        className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] aspect-[3/4] p-2 hover:scale-[1.02] transition-transform duration-500 ease-out"
      >
        {/* Soft Ambient Shadow Card Wrapper */}
        <div
          ref={imageAreaRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-[0_45px_100px_rgba(0,0,0,0.35)] border border-white/10 cursor-none"
          style={{
            "--reveal-x": "210",
            "--reveal-y": "280",
          }}
        >
          {/* Layer 1: Dimmed and blurred version in background */}
          <img
            src={heroPortrait}
            alt="Hemanth Sai Portfolio Blurred"
            className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] select-none z-10 opacity-30 blur-md scale-[1.03]"
          />
          {/* Visual Dim Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] z-15 pointer-events-none"></div>

          {/* Layer 2: Sharp foreground image that is clipped around the cursor */}
          <img
            src={heroPortrait}
            alt="Hemanth Sai Portfolio"
            className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] select-none z-20 pointer-events-none scale-100"
            style={{
              clipPath: isMobile
                ? "none"
                : "inset(calc(var(--reveal-y) * 1px - 140px) calc(100% - (var(--reveal-x) * 1px + 140px)) calc(100% - (var(--reveal-y) * 1px + 140px)) calc(var(--reveal-x) * 1px - 140px))",
              opacity: isMobile ? 0.95 : 1,
            }}
          />

          {/* Layer 3: Interactive crop selection frame */}
          <div
            className="absolute border border-white/50 z-30 pointer-events-none rounded-2xl"
            style={{
              width: "280px",
              height: "280px",
              left: "0",
              top: "0",
              transform:
                "translate3d(calc(var(--reveal-x) * 1px - 140px), calc(var(--reveal-y) * 1px - 140px), 0)",
              display: isMobile ? "none" : "block",
            }}
          >
            {/* L-shaped corner selection handles */}
            <div className="absolute top-[-2px] left-[-2px] w-5 h-5 border-t-2 border-l-2 border-[#facc15] rounded-tl-md"></div>
            <div className="absolute top-[-2px] right-[-2px] w-5 h-5 border-t-2 border-r-2 border-[#facc15] rounded-tr-md"></div>
            <div className="absolute bottom-[-2px] left-[-2px] w-5 h-5 border-b-2 border-l-2 border-[#facc15] rounded-bl-md"></div>
            <div className="absolute bottom-[-2px] right-[-2px] w-5 h-5 border-b-2 border-r-2 border-[#facc15] rounded-br-md"></div>

            {/* Micro Camera crosshair center detail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]/80"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Dots selector near bottom center */}
      <div
        ref={selectorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 bg-zinc-950/80 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md shadow-xl"
      >
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setActiveColor(color.hex)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              color.bgClass
            } ${
              activeColor === color.hex
                ? "scale-130 ring-2 ring-white ring-offset-2 ring-offset-zinc-900"
                : "hover:scale-110 opacity-70 hover:opacity-100"
            }`}
            aria-label={`Change background theme color to ${color.name}`}
          />
        ))}
      </div>
    </section>
  );
}
