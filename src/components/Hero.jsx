import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import heroPortrait from "../assets/hero-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const rollWrapperRef = useRef(null);
  const rollTextRef = useRef(null);
  const descRef = useRef(null);
  const socialIconsRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const words = ["Developer", "Freelancer", "Designer", "Creator"];

  // 1. Continuous Vertical Word Roll Animation
  useEffect(() => {
    let currentIndex = 0;
    const rotateWords = () => {
      const nextIndex = (currentIndex + 1) % words.length;
      const tl = gsap.timeline();
      
      if (!rollTextRef.current) return;

      tl.to(rollTextRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => {
          if (rollTextRef.current) {
            rollTextRef.current.innerText = words[nextIndex];
            gsap.set(rollTextRef.current, { yPercent: 100, opacity: 0 });
          }
        }
      });
      
      tl.to(rollTextRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      
      currentIndex = nextIndex;
    };
    
    const interval = setInterval(rotateWords, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. GSAP Entrance Animations (Fade & Upward) & ScrollTrigger Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // A. Entrance Animation sequence
      const introTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(subtitleRef.current, { opacity: 0, y: 25 });
      gsap.set(titleLine1Ref.current, { opacity: 0, y: 40 });
      gsap.set(titleLine2Ref.current, { opacity: 0, y: 40 });
      gsap.set(rollWrapperRef.current, { opacity: 0, y: 20 });
      gsap.set(descRef.current, { opacity: 0, y: 30 });
      
      if (socialIconsRef.current) {
        gsap.set(socialIconsRef.current.children, { opacity: 0, y: 20 });
      }
      gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.95 });

      introTimeline
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(titleLine1Ref.current, { opacity: 1, y: 0, duration: 1.1 }, "-=0.7")
        .to(titleLine2Ref.current, { opacity: 1, y: 0, duration: 1.1 }, "-=0.9")
        .to(rollWrapperRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.9")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
        .to(socialIconsRef.current.children, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, "-=0.7")
        .to(imageContainerRef.current, { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }, "-=1.5");

      // B. ScrollTrigger Parallax Animation for Split Sections
      // Left Text Content: Translate upward and fade out on scroll
      gsap.to(textContainerRef.current, {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        }
      });

      // Right Image Content: Parallax vertical movement (Translate downward on scroll)
      gsap.to(imageRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full bg-white text-black flex items-center justify-center py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden select-none"
    >
      {/* Premium Minimal Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, black 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px"
      }} />

      {/* Styled text outlines for typography selection */}
      <style>{`
        .stroke-text-black {
          color: transparent;
          -webkit-text-stroke: 2px #000000;
        }
        @media (max-width: 640px) {
          .stroke-text-black {
            -webkit-text-stroke: 1px #000000;
          }
        }
      `}</style>

      {/* Main Split-Screen Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10">
        
        {/* Left Section: Text Content & Branding */}
        <div ref={textContainerRef} className="col-span-1 lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Subtitle */}
          <div
            ref={subtitleRef}
            className="flex items-center gap-3 font-outfit text-xs sm:text-sm font-bold tracking-[0.35em] text-[#facc15] uppercase mb-4 sm:mb-6"
          >
            <span className="w-8 h-[2px] bg-[#facc15]" />
            <span>Creative Developer</span>
          </div>

          {/* Main Title Heading (12vw desktop responsive styling) */}
          <h1 className="font-syne font-black text-[9.5vw] sm:text-[8vw] lg:text-[6.5vw] xl:text-[6vw] tracking-tighter leading-[0.9] uppercase mb-4 select-none">
            <span ref={titleLine1Ref} className="block text-black">
              Hello, I'm
            </span>
            <span ref={titleLine2Ref} className="block stroke-text-black">
              Hemanth Sai
            </span>
          </h1>

          {/* Animated Rolling Word Selector */}
          <div
            ref={rollWrapperRef}
            className="h-[1.4em] overflow-hidden relative mb-6 sm:mb-8 font-syne font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-wider text-[#facc15]"
          >
            <span ref={rollTextRef} className="absolute left-0 top-0 block">
              Developer
            </span>
          </div>

          {/* Intro Description */}
          <p
            ref={descRef}
            className="font-outfit text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed font-light tracking-wide max-w-xl mb-8 sm:mb-12"
          >
            Passionate Web Developer crafting modern, interactive and premium digital experiences with creative UI animations and futuristic design aesthetics.
          </p>

          {/* Social Media Rounded Premium Icon Buttons */}
          <div ref={socialIconsRef} className="flex items-center gap-4">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-12 h-12 rounded-full border border-black/10 bg-zinc-50 flex items-center justify-center text-zinc-700 transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.45)] hover:-translate-y-1 cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5 transition-colors duration-300" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-12 h-12 rounded-full border border-black/10 bg-zinc-50 flex items-center justify-center text-zinc-700 transition-all duration-300 hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.45)] hover:-translate-y-1 cursor-pointer"
            >
              <FaInstagram className="w-5 h-5 transition-colors duration-300" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 rounded-full border border-black/10 bg-zinc-50 flex items-center justify-center text-zinc-700 transition-all duration-300 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] hover:shadow-[0_0_20px_rgba(0,119,181,0.45)] hover:-translate-y-1 cursor-pointer"
            >
              <FaLinkedinIn className="w-5 h-5 transition-colors duration-300" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-12 h-12 rounded-full border border-black/10 bg-zinc-50 flex items-center justify-center text-zinc-700 transition-all duration-300 hover:bg-black hover:text-white hover:border-black hover:shadow-[0_0_20px_rgba(0,0,0,0.35)] hover:-translate-y-1 cursor-pointer"
            >
              <FaGithub className="w-5 h-5 transition-colors duration-300" />
            </a>
          </div>

        </div>

        {/* Right Section: Hero Image with Parallax & Scaling Frame */}
        <div ref={imageContainerRef} className="col-span-1 lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[380px] lg:max-w-none aspect-[3/4]">
            {/* Ambient Yellow soft glow behind image frame */}
            <div className="absolute -inset-6 bg-[#facc15]/10 rounded-[3rem] blur-3xl z-0 pointer-events-none" />
            
            {/* Premium Frame with drop-shadow-xl */}
            <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-2xl z-10">
              <img
                ref={imageRef}
                src={heroPortrait}
                alt="Hemanth Sai Portrait"
                className="w-full h-full object-cover select-none scale-105"
                loading="eager"
              />
              {/* Vertical subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
