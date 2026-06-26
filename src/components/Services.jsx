import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const services = [
    {
      num: "01",
      title: "Business Website",
      tag: "Corporate",
      color: "#648c11", // Forest Green
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=300&q=80",
      description: "Corporate websites optimized for conversion, business performance, and premium global branding."
    },
    {
      num: "02",
      title: "Admin Dashboard",
      tag: "SaaS",
      color: "#ff4500", // Vibrant Red-Orange
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=300&q=80",
      description: "Advanced dashboards loaded with predictive analytics, data visualization, and micro-interactions."
    },
    {
      num: "03",
      title: "E-Commerce Store",
      tag: "Retail",
      color: "#1e3a8a", // Navy Blue
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&h=300&q=80",
      description: "Luxury online shopping experiences built with seamless checkout pipelines and high conversion rates."
    },
    {
      num: "04",
      title: "Full Stack Web App",
      tag: "App",
      color: "#dc2626", // Crimson Red
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&h=300&q=80",
      description: "Scalable web applications built on high-performance frameworks with secure database architectures."
    },
    {
      num: "05",
      title: "Portfolio Website",
      tag: "Creative",
      color: "#b45309", // Premium Gold-Yellow (more readable than bright yellow)
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&h=300&q=80",
      description: "High-end bespoke portfolio experiences for designers, creators, agencies, and visual storytellers."
    },
    {
      num: "06",
      title: "Website Redesign",
      tag: "Design",
      color: "#4b5563", // Sleek Slate-Gray
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=400&h=300&q=80",
      description: "Modern redesigns breathing new life into old interfaces with custom motion and award-winning UI."
    }
  ];

  // Mobile touch scroll handler to change background color & focus active card
  const handleMobileScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    const cardWidth = width * 0.8 + 24; // Card width (80vw) + gap (6px/24px)
    const centerIdx = Math.round(scrollLeft / cardWidth);

    if (centerIdx >= 0 && centerIdx < services.length) {
      setActiveMobileIdx(centerIdx);
      
      // Animate background color dynamically to match active card
      gsap.to(containerRef.current, {
        backgroundColor: services[centerIdx].color,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  // GSAP 3D Curved Half-Circle Carousel Animation (Desktop only)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll(".service-card-desktop");
      const numCards = services.length;

      // Helper to position cards initially for layout stability
      const positionCards = (progress) => {
        const centerIndex = progress * (numCards - 1);
        
        cards.forEach((card, idx) => {
          const offset = idx - centerIndex;
          const angleStep = 30 * Math.PI / 180; // 30 degrees gap
          const angle = offset * angleStep;
          const radius = 600; // Half-circle curve radius

          // Card Motion formulas from specs:
          // x: Math.sin(angle) * radius
          // y: radius - Math.cos(angle) * radius
          // z: -Math.abs(offset) * 50
          const x = Math.sin(angle) * radius;
          const y = radius - Math.cos(angle) * radius;
          const z = -Math.abs(offset) * 50;
          
          // Card rotation: rotationZ follows curve angle
          const rotationZ = angle * 180 / Math.PI;
          
          // rotationY facing camera coordinates
          const rotationY = -offset * 15;

          // Scale formula: 1 - abs(offset) * 0.15
          const scale = 1 - Math.abs(offset) * 0.15;
          
          // Opacity formula: 1 - abs(offset) * 0.3
          const opacity = 1 - Math.abs(offset) * 0.3;

          gsap.set(card, {
            x: x,
            y: y,
            z: z,
            rotationZ: rotationZ,
            rotationY: rotationY,
            scale: Math.max(0.4, scale),
            opacity: Math.max(0, opacity),
            transformPerspective: 1000
          });
        });
      };

      // Position cards initially at progress = 0 (first card active)
      positionCards(0);

      // ScrollTrigger to pin section and animate curves
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000", // scroll duration (500% pin scroll)
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const centerIndex = progress * (numCards - 1);
          
          // Smoothly position cards along the curve based on scroll progress
          positionCards(progress);

          // Find closest active card index
          const activeIdx = Math.round(centerIndex);
          if (activeIdx >= 0 && activeIdx < services.length) {
            // Dynamic background color change transition
            gsap.to(containerRef.current, {
              backgroundColor: services[activeIdx].color,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Shared Card Renderer (Desktop & Mobile)
  const renderCardContent = (service) => {
    return (
      <div className="relative w-full h-full flex flex-col justify-between p-8 rounded-[30px] bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden group select-none select-none">
        
        {/* Glossy overlay sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none z-10" />
        
        {/* Ambient color light spot inside card */}
        <div 
          className="absolute -left-12 -top-12 w-28 h-28 rounded-full blur-2xl pointer-events-none z-0 opacity-40" 
          style={{ backgroundColor: service.color }} 
        />

        {/* Card Image Container (Hover Zoom) */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/10 z-10 shadow-inner">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Subtle gradient inside image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Card Details */}
        <div className="mt-6 z-10 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 font-outfit">
              <span>{service.tag}</span>
              <span className="opacity-75">// {service.num}</span>
            </div>
            
            <h4 className="font-syne font-black text-2xl text-white uppercase tracking-tight leading-none mt-3 select-none">
              {service.title}
            </h4>
            
            <p className="font-outfit text-xs text-white/80 font-light mt-3 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Luxury Consult Details Button */}
          <div className="mt-6 flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest font-outfit opacity-80 group-hover:opacity-100 transition-all duration-300">
            <span className="w-6 h-[1.5px] bg-white/50 group-hover:w-10 transition-all duration-300" />
            <span>Consult details</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 select-none selection:bg-white selection:text-black"
      style={{
        backgroundColor: services[0].color // Initial color match
      }}
    >
      {/* Self-contained scrollbar removal styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Massive Outlined Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h3 
          className="services-bg-watermark font-syne font-black text-[18vw] leading-none uppercase select-none pointer-events-none text-transparent mix-blend-overlay"
          style={{
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.35)"
          }}
        >
          SERVICES
        </h3>
      </div>

      {/* Desktop Curved 3D Card Carousel */}
      <div className="hidden lg:flex relative w-full h-full items-center justify-center z-10 perspective-[1000px] transform-style-3d">
        <div className="relative w-[420px] h-[550px] transform-style-3d flex items-center justify-center">
          {services.map((service, idx) => (
            <div
              key={`desktop-${idx}`}
              className="service-card-desktop absolute w-[420px] h-[550px] pointer-events-auto"
              style={{ transformStyle: "preserve-3d" }}
            >
              {renderCardContent(service)}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Swipe snap-scroll carousel */}
      <div className="block lg:hidden w-full relative z-10 px-4 py-8">
        
        {/* Mobile Title Header */}
        <div className="flex flex-col items-center mb-10 text-center select-none">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] font-outfit">Solutions</span>
          <h3 className="text-3xl font-black text-white uppercase font-syne mt-1">Services</h3>
        </div>

        {/* Touch Swipe Carousel Container */}
        <div
          ref={carouselRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 py-6 px-4 scrollbar-none w-full scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-x" }}
        >
          {services.map((service, idx) => {
            const isActive = idx === activeMobileIdx;
            return (
              <div
                key={`mobile-${idx}`}
                className={`snap-center shrink-0 first:ml-[10%] last:mr-[10%] w-[80vw] h-[450px] transition-all duration-300 ${
                  isActive ? "scale-100 opacity-100" : "scale-90 opacity-40"
                }`}
              >
                {renderCardContent(service)}
              </div>
            );
          })}
        </div>

        {/* Swipe Cue Indicator */}
        <div className="text-center font-outfit text-[10px] uppercase tracking-widest text-white/40 mt-6 select-none animate-pulse">
          &larr; Swipe to View &rarr;
        </div>
      </div>
    </section>
  );
}
