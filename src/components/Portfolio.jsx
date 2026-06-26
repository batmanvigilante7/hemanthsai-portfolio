import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import heroPortrait from "../assets/hero-portrait.jpg";

export default function Portfolio() {
  const containerRef = useRef(null);
  const cropFrameRef = useRef(null);
  
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [boxSize, setBoxSize] = useState(280);
  const [bgColor, setBgColor] = useState("#f4c400"); // default background color from theme
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    { name: "red", hex: "#dc2626" },
    { name: "yellow", hex: "#f4c400" },
    { name: "green", hex: "#16a34a" },
    { name: "purple", hex: "#7c3aed" },
    { name: "rose", hex: "#e11d48" },
    { name: "orange", hex: "#ea580c" },
  ];

  // Dynamic box size based on screen size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDimensions({ width: w, height: h });
      
      if (w < 640) {
        setBoxSize(200);
      } else {
        setBoxSize(280);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Mouse Tracking & Interactive Tilt / Parallax Effects
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial position of mask/crop frame to the center of the screen
    gsap.set(container, {
      "--mouse-x": dimensions.width / 2,
      "--mouse-y": dimensions.height / 2,
    });

    // Create GSAP quickTo functions for smooth, buttery-smooth mouse tracking
    const xTo = gsap.quickTo(container, "--mouse-x", { duration: 0.7, ease: "power2.out" });
    const yTo = gsap.quickTo(container, "--mouse-y", { duration: 0.7, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update custom properties using quickTo
      xTo(x);
      yTo(y);

      // 3D Parallax Tilt effect on the center image showcase
      const relX = (x / rect.width) - 0.5;
      const relY = (y / rect.height) - 0.5;
      
      // Scoped GSAP animation for 3D tilt on both layers of image showcase simultaneously
      gsap.to(".portfolio-image-showcase", {
        rotateY: relX * 16,
        rotateX: -relY * 16,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.6,
      });

      // Background text slides slightly in the opposite direction (3D depth)
      gsap.to(".portfolio-bg-text", {
        x: -relX * 35,
        y: -relY * 35,
        ease: "power2.out",
        duration: 0.6,
      });

      // Proximity detection to trigger hover scale on the showcase image
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const imgW = window.innerWidth < 640 ? 320 : 384;
      const imgH = window.innerWidth < 640 ? 384 : 520;

      const isInside = (
        x >= centerX - imgW / 2 &&
        x <= centerX + imgW / 2 &&
        y >= centerY - imgH / 2 &&
        y <= centerY + imgH / 2
      );
      
      setIsHovered(isInside);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dimensions, boxSize]);

  // GSAP Intro Entrance Animation (Fade & Scale)
  useEffect(() => {
    const q = gsap.utils.selector(containerRef);
    
    // Set initial states for intro stagger/reveal
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(q(".portfolio-bg-text span"), { y: 120, opacity: 0 });
    gsap.set(q(".portfolio-image-showcase"), { scale: 0.85, opacity: 0 });
    gsap.set(cropFrameRef.current, { scale: 1.4, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(containerRef.current, { opacity: 1, duration: 0.8 })
      .to(
        q(".portfolio-bg-text span"),
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 1.2,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      )
      .to(
        q(".portfolio-image-showcase"),
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
        },
        "-=0.9"
      )
      .to(
        cropFrameRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.1"
      );
  }, []);

  // Handle smooth background color switching
  const handleColorChange = (hex) => {
    setBgColor(hex);
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundColor: hex,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  const halfSize = boxSize / 2;

  // Render content function to keep Layer A (Sharp) and Layer B (Blurred) 100% identical
  const renderContent = (isSharp) => {
    const letters = [
      { char: "P", isStroke: false },
      { char: "O", isStroke: true },
      { char: "R", isStroke: true },
      { char: "T", isStroke: false },
      { char: "F", isStroke: false },
      { char: "O", isStroke: true },
      { char: "L", isStroke: false },
      { char: "I", isStroke: false },
      { char: "O", isStroke: true },
    ];

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        {/* Large Typography Background Text */}
        <div className="portfolio-bg-text absolute inset-0 flex items-center justify-center text-[18vw] font-black uppercase tracking-tighter font-syne leading-none text-center select-none z-0">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {letters.map((item, idx) => (
              <span
                key={idx}
                className={item.isStroke ? "stroke-text inline-block" : "text-white/10 inline-block"}
              >
                {item.char}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Image Center Showcase */}
        <div
          className="portfolio-image-showcase relative w-80 h-96 md:w-96 md:h-[520px] rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.35)] border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md transition-transform duration-700 ease-out z-10"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          {/* Subtle gradient overlays inside image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 pointer-events-none" />
          
          {/* Showcase Image */}
          <img
            src={heroPortrait}
            alt="Hemanth Sai Portfolio Showcase"
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="eager"
          />

          {/* Premium Glassmorphic Project Info Label overlay */}
          <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 z-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#3b82f6] font-outfit font-bold">Featured Works</span>
            <h3 className="text-lg font-extrabold uppercase tracking-wider text-white font-syne mt-0.5">Cinematic Art</h3>
            <p className="text-white/60 text-xs font-outfit mt-1">Interactive design & frontend engineering</p>
          </div>
        </div>

        {/* Extra minimal typography inside center showcase area */}
        <div className="absolute bottom-28 md:bottom-20 text-center text-white/40 pointer-events-none z-10 font-outfit text-[10px] uppercase tracking-[0.4em]">
          Interactive Art Direction &mdash; 2026
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      id="portfolio"
      className="relative w-full h-full min-h-screen overflow-hidden cursor-crosshair transition-colors duration-500"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {/* Self-contained styling for text outline stroke and marching ants keyframe animations */}
      <style>{`
        .stroke-text {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.15);
        }
        
        @keyframes marching-ants-anim {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 18;
          }
        }
        
        .marching-ants-rect {
          animation: marching-ants-anim 0.8s linear infinite;
        }
      `}</style>

      {/* Layer B: Blurred Overlay Layer */}
      <div className="absolute inset-0 filter blur-[6px] brightness-[0.85] pointer-events-none select-none z-0">
        {renderContent(false)}
      </div>

      {/* Layer A: Sharp Overlay Layer (Revealed via SVG Mask) */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-10"
        style={{
          maskImage: "url(#portfolio-reveal-mask)",
          WebkitMaskImage: "url(#portfolio-reveal-mask)",
        }}
      >
        {renderContent(true)}
      </div>

      {/* Animated Viewfinder / Crop Frame Overlay */}
      <div
        ref={cropFrameRef}
        className="absolute pointer-events-none select-none z-20 transition-all duration-300 ease-out"
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          left: 0,
          top: 0,
          transform: `translate(calc(var(--mouse-x) * 1px - ${halfSize}px), calc(var(--mouse-y) * 1px - ${halfSize}px))`,
          borderRadius: "24px",
          boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)",
        }}
      >
        {/* Glow Blue Corner Handles */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#3b82f6] rounded-tl-lg -translate-x-1 -translate-y-1 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#3b82f6] rounded-tr-lg translate-x-1 -translate-y-1 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#3b82f6] rounded-bl-lg -translate-x-1 translate-y-1 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#3b82f6] rounded-br-lg translate-x-1 translate-y-1 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
        
        {/* Marching ants SVG border overlay */}
        <svg className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden pointer-events-none">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="12 6"
            rx="24"
            ry="24"
            className="marching-ants-rect"
          />
        </svg>
      </div>

      {/* SVG Definitions for Gaussian Masking */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <filter id="mask-blur">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          
          <mask id="portfolio-reveal-mask" maskUnits="userSpaceOnUse">
            {/* Base cover: everything black (hidden) */}
            <rect width="100%" height="100%" fill="black" />
            
            {/* Scanner window: white (revealed) with rounded corners and gaussian blur edges */}
            <rect
              width={boxSize}
              height={boxSize}
              rx="24"
              ry="24"
              fill="white"
              filter="url(#mask-blur)"
              style={{
                transform: `translate(calc(var(--mouse-x) * 1px - ${halfSize}px), calc(var(--mouse-y) * 1px - ${halfSize}px))`,
              }}
            />
          </mask>
        </defs>
      </svg>

      {/* Background Color Selector */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/45 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 pointer-events-auto">
        <span className="text-white/40 text-[9px] font-semibold uppercase tracking-[0.25em] font-outfit mr-1 select-none">Theme</span>
        {colors.map((item) => (
          <button
            key={item.name}
            onClick={() => handleColorChange(item.hex)}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer ${
              bgColor === item.hex ? "border-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.4)]" : "border-transparent scale-100 hover:scale-110"
            }`}
            style={{ backgroundColor: item.hex }}
            title={`Switch theme background to ${item.name}`}
            aria-label={`Switch theme background to ${item.name}`}
          />
        ))}
      </div>
    </div>
  );
}
