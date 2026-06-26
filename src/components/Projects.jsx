import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const folderFrontRef = useRef(null);
  const carouselRef = useRef(null);
  
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const projects = [
    { num: "01", title: "Business Website", tag: "Corporate", description: "Corporate websites optimized for conversion and premium branding." },
    { num: "02", title: "Admin Dashboard", tag: "SaaS", description: "Advanced dashboards with analytics and data visualization." },
    { num: "03", title: "E-Commerce Store", tag: "Retail", description: "Luxury online shopping experiences with seamless checkout." },
    { num: "04", title: "Full Stack Web App", tag: "App", description: "Scalable web applications with powerful backend systems." },
    { num: "05", title: "Portfolio Website", tag: "Creative", description: "High-end portfolio experiences for creators and agencies." },
    { num: "06", title: "Website Redesign", tag: "Design", description: "Modern redesigns with immersive animations and premium UI." },
  ];

  // Mobile scroll handler to determine active focus card
  const handleMobileScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 320 + 24; // card width + gap (matches flex gap-6)
    const centerIdx = Math.round(scrollLeft / cardWidth);
    
    if (centerIdx >= 0 && centerIdx < projects.length) {
      setActiveMobileIdx(centerIdx);
    }
  };

  // GSAP 3D Folder Explosion Scroll Animation for Desktop
  useEffect(() => {
    // ScrollTrigger applies only to desktop (screens >= 1024px)
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);

      // Initial positioning of cards stacked deep inside the folder
      gsap.set(q(".project-card-desktop"), {
        x: 0,
        y: 10,
        z: -40,
        scale: 0.12,
        opacity: 0,
        rotationY: 0,
        rotationX: 0,
      });

      // Reset folder flap rotation to vertical front
      gsap.set(folderFrontRef.current, {
        rotateX: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500", // pin scroll length for explosion sequence
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Step 1: Open the folder front cover flap (hinged at bottom)
      tl.to(folderFrontRef.current, {
        rotateX: -130,
        ease: "power2.inOut",
        duration: 1.2,
      });

      // Step 2: Explosive Grid Expansion (Cards rise and spread surrounding the folder)
      const cardPositions = [
        { x: -390, y: -230, z: 80, rotationY: -10, rotationX: 5 },  // Top Left
        { x: 390, y: -230, z: 80, rotationY: 10, rotationX: 5 },   // Top Right
        { x: -450, y: 0, z: 50, rotationY: -15, rotationX: 0 },     // Center Left
        { x: 450, y: 0, z: 50, rotationY: 15, rotationX: 0 },      // Center Right
        { x: -390, y: 230, z: 80, rotationY: -10, rotationX: -5 }, // Bottom Left
        { x: 390, y: 230, z: 80, rotationY: 10, rotationX: -5 },  // Bottom Right
      ];

      cardPositions.forEach((pos, idx) => {
        tl.to(
          q(`.project-card-desktop-${idx}`),
          {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            scale: 1,
            opacity: 1,
            rotationY: pos.rotationY,
            rotationX: pos.rotationX,
            ease: "power3.out",
            duration: 1.5,
          },
          "-=1.1" // Staggered explosive overlap
        );
      });

      // Step 3: Gentle parallax movement at the end of the scroll trigger
      tl.to(
        q(".project-card-desktop"),
        {
          y: (i) => (i % 2 === 0 ? "+=20" : "-=20"),
          duration: 1,
          ease: "sine.inOut",
        },
        "+=0.2"
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Shared Project Card Renderer
  const renderCard = (project) => {
    return (
      <div className="relative w-80 h-48 rounded-[28px] bg-white/95 border border-zinc-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-6 flex flex-col justify-between group overflow-hidden transition-all duration-500 hover:border-[#f4c400]/40 hover:-translate-y-2 select-none cursor-pointer">
        {/* Soft yellow radial highlight blur inside the card on hover */}
        <div className="absolute -right-12 -top-12 w-24 h-24 bg-[#f4c400]/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold text-[#f4c400] bg-[#f4c400]/10 px-3 py-1 rounded-full uppercase tracking-widest font-outfit">
            {project.tag}
          </span>
          <span className="text-zinc-400 group-hover:text-[#f4c400] text-xs font-semibold uppercase tracking-wider font-outfit transition-colors duration-300">
            View Project &rarr;
          </span>
        </div>

        {/* Content Body */}
        <div className="mt-3">
          <h4 className="font-syne font-black text-lg text-zinc-900 uppercase tracking-tight leading-none group-hover:text-black transition-colors duration-300">
            {project.title}
          </h4>
          <p className="font-outfit text-xs text-zinc-500 font-light mt-2 leading-relaxed max-w-[260px]">
            {project.description}
          </p>
        </div>

        {/* Subtle numbering mark */}
        <div className="absolute bottom-6 right-6 text-[10px] font-bold text-zinc-200 font-outfit uppercase tracking-widest group-hover:text-[#f4c400]/25 transition-colors duration-300">
          // {project.num}
        </div>

        {/* Cinematic Explore Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-[#f4c400] text-black font-syne font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
            Explore Detail
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen w-full bg-[#f7f6f2] text-zinc-900 overflow-hidden flex flex-col items-center justify-center selection:bg-black selection:text-[#facc15]"
    >
      {/* Self-contained styling for slow infinite paper-float physics */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-physics {
          0%, 100% { transform: translateY(0px) rotate(0.2deg); }
          50% { transform: translateY(-8px) rotate(-0.3deg); }
        }
        .floating-card-inner {
          animation: float-physics 6s ease-in-out infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (min-width: 1024px) and (max-width: 1280px) {
          .desktop-folder-explosion-container {
            transform: scale(0.85);
          }
        }
      `}} />

      {/* Background Large Typography Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h3 className="font-syne font-black text-[22vw] leading-none tracking-tighter text-zinc-800/5 uppercase select-none">
          My Work
        </h3>
      </div>

      {/* Ambient Yellow Soft Glow Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f4c400]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Desktop 3D Folder Explosion Grid View */}
      <div className="desktop-folder-explosion-container hidden lg:flex relative w-full h-screen items-center justify-center z-10 perspective-[2000px] transform-style-3d">
        
        {/* Central Archive 3D Folder */}
        <div className="relative w-80 h-56 flex items-center justify-center transform-style-3d">
          
          {/* Folder Back Panel (Yellow Rice-Paper Theme) */}
          <div 
            className="absolute inset-0 bg-[#f4c400] rounded-r-2xl rounded-bl-2xl shadow-[0_25px_60px_rgba(0,0,0,0.22)] border border-[#e0b400]/30 flex flex-col justify-between p-6 z-0"
            style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px)" }}
          >
            {/* Top Index tab */}
            <div className="absolute -top-4 left-0 w-28 h-4 bg-[#f4c400] rounded-t-lg border-t border-x border-[#e0b400]/30" />
            <div className="text-black/30 font-outfit text-xs font-semibold uppercase tracking-[0.2em] mt-2 select-none">
              Archive 06-26 // Works
            </div>
            <div className="font-syne font-black text-black/25 text-3xl uppercase tracking-tighter leading-none select-none">
              Project Folder
            </div>
          </div>

          {/* Staggered Flying Project Cards (3D Spread) */}
          {projects.map((project, idx) => (
            <div
              key={`desktop-${idx}`}
              className={`project-card-desktop project-card-desktop-${idx} absolute z-10 pointer-events-auto`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Inner floating container staggered by CSS animation delay */}
              <div className="floating-card-inner" style={{ animationDelay: `${idx * 0.55}s` }}>
                {renderCard(project)}
              </div>
            </div>
          ))}

          {/* Folder Front Cover Flap (Rotates on Scroll hinge) */}
          <div
            ref={folderFrontRef}
            className="absolute inset-0 bg-[#e5b700] rounded-r-2xl rounded-bl-2xl shadow-[0_15px_35px_rgba(0,0,0,0.18)] border-t border-[#f4c400] origin-bottom z-20 flex flex-col justify-between p-6 overflow-hidden cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-12 h-1.5 bg-black/10 rounded-full select-none" />
            
            {/* Folder Sticker Label */}
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg border border-black/5 shadow-sm max-w-[200px] select-none">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block font-outfit">Hemanth Sai</span>
              <span className="text-xs font-extrabold text-zinc-800 uppercase tracking-wider block font-syne mt-0.5">Selected Works</span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-semibold text-black/35 uppercase tracking-wider font-outfit select-none">
              <span>Confidential</span>
              <span>Vol. 01</span>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Horizontal Snap-Swipe Carousel View */}
      <div className="block lg:hidden w-full relative z-10 px-4 py-16">
        
        {/* Mobile Header */}
        <div className="flex flex-col items-center mb-10 text-center select-none">
          <span className="text-[10px] font-bold text-[#f4c400] uppercase tracking-[0.3em] font-outfit">Gallery</span>
          <h3 className="text-3xl font-black text-zinc-900 uppercase font-syne mt-1">My Work</h3>
        </div>

        {/* Snap Swipe Container */}
        <div
          ref={carouselRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 py-6 px-4 scrollbar-none w-full scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeMobileIdx;
            return (
              <div
                key={`mobile-${idx}`}
                className={`snap-center shrink-0 first:ml-[10%] last:mr-[10%] transition-all duration-300 ${
                  isActive ? "scale-105 opacity-100" : "scale-95 opacity-50"
                }`}
              >
                {renderCard(project)}
              </div>
            );
          })}
        </div>

        {/* Swipe cue indicator */}
        <div className="text-center font-outfit text-[10px] uppercase tracking-widest text-zinc-400 mt-6 select-none animate-pulse">
          &larr; Swipe to Explore &rarr;
        </div>
      </div>
    </section>
  );
}
