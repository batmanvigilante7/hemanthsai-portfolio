import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ArrowDown } from "lucide-react";
import heroPortrait from "../assets/hero-portrait.jpg";

export default function PortfolioHero() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingRef = useRef(null);
  const rollWrapperRef = useRef(null);
  const rollTextRef = useRef(null);
  const descRef = useRef(null);
  const socialRef = useRef(null);

  const imageWrapperRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const scrollCueRef = useRef(null);

  const words = ["Developer", "Designer", "Creator", "Builder"];

  useEffect(() => {
    // 1. Animated rolling words logic
    let currentIndex = 0;
    const rotateWords = () => {
      const nextIndex = (currentIndex + 1) % words.length;
      const tl = gsap.timeline();
      
      if (!rollTextRef.current) return;

      tl.to(rollTextRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.4,
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

    // 2. GSAP Intro Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Reset initial values
      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
      gsap.set(headingRef.current, { y: 30, opacity: 0 });
      gsap.set(rollWrapperRef.current, { opacity: 0 });
      gsap.set(descRef.current, { y: 20, opacity: 0 });
      gsap.set(socialRef.current ? socialRef.current.children : [], { y: 20, opacity: 0 });
      
      gsap.set(imageContainerRef.current, { scale: 0.9, opacity: 0 });
      gsap.set(scrollCueRef.current, { opacity: 0, y: 20 });

      // Entrance sequence
      tl.to(subtitleRef.current, { y: 0, opacity: 1, duration: 1.0 }, 0.1);
      tl.to(headingRef.current, { y: 0, opacity: 1, duration: 1.2 }, 0.2);
      tl.to(rollWrapperRef.current, { opacity: 1, duration: 0.8 }, 0.4);
      tl.to(descRef.current, { y: 0, opacity: 1, duration: 1.0 }, 0.5);
      
      if (socialRef.current) {
        tl.to(socialRef.current.children, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }, 0.6);
      }

      tl.to(imageContainerRef.current, { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" }, 0.3);

      tl.to(scrollCueRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        onComplete: () => {
          // Continuous gentle bounce for cue
          gsap.to(scrollCueRef.current, {
            y: 8,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        }
      }, "-=0.4");

      // Subtle float motion on the image card wrapper (infinite loop)
      gsap.to(imageWrapperRef.current, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // 3. ScrollTrigger Parallax Animations
      // Image moves downward on scroll
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Text moves upward and fades on scroll
      gsap.to(textContainerRef.current, {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full bg-[#FAF9F5] text-zinc-950 flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-16 overflow-hidden selection:bg-zinc-950 selection:text-[#facc15]"
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute right-[-10%] top-[-10%] w-[60vw] h-[60vw] bg-[#facc15]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute left-[-20%] bottom-[-20%] w-[50vw] h-[50vw] bg-white rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Editorial Typography & Copy */}
        <div ref={textContainerRef} className="col-span-1 lg:col-span-7 flex flex-col justify-center">
          <div className="max-w-2xl">
            {/* Small Subtitle */}
            <p
              ref={subtitleRef}
              className="font-outfit text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-zinc-400 mb-4 flex items-center gap-3"
            >
              <span className="w-6 h-[1.5px] bg-[#facc15]"></span>
              <span>Creative Developer</span>
            </p>
            
            {/* Main Heading */}
            <h1
              ref={headingRef}
              className="font-syne font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[5.8rem] xl:text-[6.8rem] tracking-tight leading-[0.95] text-zinc-950 uppercase mb-4"
            >
              Hello, I'm <br />
              <span className="text-zinc-950 hover:text-[#facc15] transition-colors duration-500">Hemanth Sai</span>
            </h1>
            
            {/* Animated rolling words */}
            <div
              ref={rollWrapperRef}
              className="h-[1.4em] overflow-hidden relative mb-8"
            >
              <span
                ref={rollTextRef}
                className="absolute left-0 top-0 font-syne font-extrabold text-[#facc15] text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase"
              >
                Developer
              </span>
            </div>
            
            {/* Description */}
            <p
              ref={descRef}
              className="font-outfit text-base sm:text-lg md:text-xl text-zinc-500 leading-relaxed font-light tracking-wide max-w-xl mb-10"
            >
              I craft modern, interactive and premium digital experiences with creative UI animations, product thinking and cinematic design.
            </p>
            
            {/* Social Icons List */}
            <div ref={socialRef} className="flex items-center gap-4">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 transition-all duration-300 hover:bg-zinc-950 hover:text-[#facc15] hover:border-zinc-950 hover:shadow-xl hover:-translate-y-1"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 transition-all duration-300 hover:bg-zinc-950 hover:text-[#facc15] hover:border-zinc-950 hover:shadow-xl hover:-translate-y-1"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 transition-all duration-300 hover:bg-zinc-950 hover:text-[#facc15] hover:border-zinc-950 hover:shadow-xl hover:-translate-y-1"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 transition-all duration-300 hover:bg-zinc-950 hover:text-[#facc15] hover:border-zinc-950 hover:shadow-xl hover:-translate-y-1"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Side: Portrait Image Frame */}
        <div className="col-span-1 lg:col-span-5 flex justify-center items-center">
          <div
            ref={imageWrapperRef}
            className="relative w-full max-w-[360px] lg:max-w-none aspect-[3/4]"
          >
            {/* Soft Yellow Radial Glow Behind Portrait */}
            <div className="absolute -inset-6 bg-[#facc15]/15 rounded-[3.5rem] blur-3xl z-0 pointer-events-none"></div>
            
            {/* Editorial Portrait Frame */}
            <div
              ref={imageContainerRef}
              className="relative w-full h-full overflow-hidden rounded-[3rem] bg-zinc-100 shadow-[0_30px_100px_rgba(0,0,0,0.12)] border border-white/50 z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20 pointer-events-none"></div>
              <img
                ref={imageRef}
                src={heroPortrait}
                alt="Hemanth Sai Portrait"
                className="w-full h-full object-cover select-none scale-105"
                loading="eager"
              />
            </div>
          </div>
        </div>

      </div>
      
      {/* Scroll Down Cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => {
          const nextSection = document.getElementById("story");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }
        }}
      >
        <span className="font-outfit text-[9px] uppercase tracking-[0.4em] text-zinc-400 group-hover:text-zinc-950 transition-colors duration-300">
          Scroll Down
        </span>
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 bg-white group-hover:border-zinc-950 group-hover:bg-zinc-950 group-hover:text-[#facc15] transition-all duration-300 shadow-sm">
          <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#facc15] transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
