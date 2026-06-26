import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import heroPortrait from "../assets/hero-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const welcomeSectionRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const introContainerRef = useRef(null);
  const testimonialHeaderRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const transitionImageContainerRef = useRef(null);
  const transitionImageRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample Testimonials with profile photos from Unsplash
  const row1Testimonials = [
    {
      name: "Sarah Jenkins",
      username: "@sarah_jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      role: "Product Lead at Velo Studio",
      message: "Hemanth has a rare ability to translate high-fidelity designs into code without losing any detail. The UI animations he crafted feel tactile and incredibly smooth."
    },
    {
      name: "Marcus Chen",
      username: "@marcus_chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      role: "Founder of Arca Media",
      message: "The visual storytelling on our landing page completely changed how clients see us. He brought our brand to life with stunning GSAP motion design."
    },
    {
      name: "Elena Rostova",
      username: "@elena_rostova",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
      role: "Co-Founder at Nexa Tech",
      message: "An absolute master of creative frontend. His product thinking goes way beyond standard coding—he suggested UX revisions that doubled our user engagement."
    },
    {
      name: "David Kovic",
      username: "@david_kovic",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
      role: "Technical Director at Apex Corp",
      message: "Clean, performant React structure. Our page load time decreased, and the Lenis smooth scrolling has made the user experience feel incredibly premium."
    }
  ];

  const row2Testimonials = [
    {
      name: "Aisha Vance",
      username: "@aisha_vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
      role: "Design Partner at Bold Ventures",
      message: "The cinematic transitions he implemented for our showcase are award-winning quality. He works like an editor, polishing micro-animations to perfection."
    },
    {
      name: "Liam O'Connor",
      username: "@liam_oconnor",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
      role: "Founder of Studio Bloom",
      message: "Outstanding attention to detail. Hemanth didn't just build our site; he built a memorable digital experience. Our clients keep praising the smooth interactions."
    },
    {
      name: "Sofia Rossi",
      username: "@sofia_rossi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
      role: "Brand Manager at Aura Luxury",
      message: "He understood the aesthetic direction immediately. The minimal, high-contrast layouts and soft scroll animations perfectly reflect our luxury brand value."
    },
    {
      name: "Jordan Miller",
      username: "@jordan_miller",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
      role: "Head of Product at Horizon",
      message: "Combining WebGL feel with React + Tailwind v4, he proved that creative development is a true art form. A vital asset to any ambitious project."
    }
  ];

  // GSAP + ScrollTrigger Timeline Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Image scroll morph / transition continuation
      // Scales up and top aligns, fading into a soft background watermark in the welcome scene
      gsap.fromTo(
        transitionImageContainerRef.current,
        {
          opacity: 0,
          scale: 0.7,
          y: -120,
        },
        {
          opacity: 0.08,
          scale: window.innerWidth < 640 ? 2.8 : 3.8,
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: welcomeSectionRef.current,
            start: "top bottom", // triggers as soon as Welcome enters the viewport
            end: "top top", // ends when Welcome is active full screen
            scrub: true,
          }
        }
      );

      // 2. Parallax zoom scroll reveal for the massive background "WELCOME" text
      gsap.fromTo(
        welcomeTextRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 80,
        },
        {
          scale: 1.05,
          opacity: 0.15,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: welcomeSectionRef.current,
            start: "top 80%",
            end: "center top",
            scrub: true,
          }
        }
      );

      // 3. Welcome title & text slide up entrance
      if (introContainerRef.current) {
        gsap.fromTo(
          introContainerRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // 4. Testimonials title & subtitle scroll reveal
      if (testimonialHeaderRef.current) {
        gsap.fromTo(
          testimonialHeaderRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialHeaderRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // 5. Scroll-based floating/parallax shift on the marquee row containers
      // Moves Row 1 Left and Row 2 Right to create cinematic depth overlay
      gsap.fromTo(
        ".marquee-row-1-container",
        { x: 100 },
        {
          x: -100,
          ease: "none",
          scrollTrigger: {
            trigger: marqueeContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        ".marquee-row-2-container",
        { x: -100 },
        {
          x: 100,
          ease: "none",
          scrollTrigger: {
            trigger: marqueeContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, welcomeSectionRef);

    return () => {
      ctx.revert();
    };
  }, [dimensions]);

  return (
    <section
      ref={welcomeSectionRef}
      id="welcome"
      className="relative min-h-[200vh] w-full bg-gradient-to-b from-white via-zinc-50 to-white text-black flex flex-col justify-start overflow-hidden py-32 selection:bg-black selection:text-[#facc15]"
    >
      {/* Self-contained styling for infinite marquee loop, speed setup, and custom masking */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row-1 {
          display: flex;
          width: max-content;
          gap: 1.5rem;
          animation: marquee-left 25s linear infinite;
        }
        .marquee-row-2 {
          display: flex;
          width: max-content;
          gap: 1.5rem;
          animation: marquee-right 25s linear infinite;
        }
        .marquee-row-1:hover, .marquee-row-2:hover {
          animation-play-state: paused;
        }
        .marquee-mask {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        @media (max-width: 640px) {
          .marquee-row-1 {
            animation-duration: 10s;
          }
          .marquee-row-2 {
            animation-duration: 10s;
          }
        }
      `}} />

      {/* Hero Image Morph Transition (Watermark backdrop behind typography) */}
      <div
        ref={transitionImageContainerRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[380px] aspect-[3/4] z-0 pointer-events-none select-none overflow-hidden rounded-[2.5rem]"
        style={{ transformOrigin: "top center" }}
      >
        <img
          ref={transitionImageRef}
          src={heroPortrait}
          alt="Hero Portrait Morph"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Screen 1: Welcome Typography Reveal (Fullscreen 100vh area) */}
      <div className="min-h-[85vh] w-full flex flex-col items-center justify-center relative px-6 md:px-12 z-10">
        
        {/* Massive Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <h2
            ref={welcomeTextRef}
            className="font-syne font-black text-[26vw] leading-none tracking-tighter text-black uppercase"
            style={{ opacity: 0.15 }}
          >
            WELCOME
          </h2>
        </div>

        {/* Foreground Content */}
        <div
          ref={introContainerRef}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        >
          <p className="font-outfit text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#facc15] mb-4">
            To my creative space
          </p>
          <h3 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-black uppercase leading-tight max-w-2xl select-none">
            Where Design & <br />Code Merge
          </h3>
          <p className="font-outfit text-base sm:text-lg md:text-xl text-zinc-500 font-light tracking-wide max-w-xl mt-6 leading-relaxed">
            A place where design, code, motion and curiosity become visible digital work.
          </p>
        </div>
      </div>

      {/* Screen 2: Testimonials Marquee (Fullscreen 100vh area) */}
      <div className="min-h-screen w-full flex flex-col justify-center relative pt-24 pb-12 overflow-hidden z-10">
        
        {/* Title and Subtitle */}
        <div
          ref={testimonialHeaderRef}
          className="text-center px-6 mb-16 relative z-10"
        >
          <p className="font-outfit text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-zinc-400 mb-3">
            What people are saying
          </p>
          <h3 className="font-syne font-black text-4xl sm:text-6xl tracking-tight text-black uppercase select-none">
            Client Love
          </h3>
        </div>

        {/* Testimonials Marquee Section */}
        <div
          ref={marqueeContainerRef}
          className="marquee-mask relative z-10 flex flex-col gap-6 w-full overflow-hidden py-4 pointer-events-auto"
        >
          {/* Row 1: Moves Left */}
          <div className="marquee-row-1-container w-full overflow-hidden">
            <div className="marquee-row-1">
              {[...row1Testimonials, ...row1Testimonials].map((item, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="w-[300px] sm:w-[380px] flex-shrink-0 p-6 sm:p-8 rounded-[2rem] bg-white/70 border border-zinc-200 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border border-zinc-100"
                    />
                    <div>
                      <h4 className="font-syne font-bold text-sm text-black flex items-center gap-1.5 leading-none">
                        <span>{item.name}</span>
                        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white shadow-sm" title="Verified Client">
                          <Check className="w-2.5 h-2.5 stroke-[4]" />
                        </span>
                      </h4>
                      <p className="font-outfit text-[11px] text-zinc-400 font-medium mt-1 leading-none">
                        {item.username}
                      </p>
                    </div>
                  </div>
                  
                  <p className="font-outfit text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-light">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100 text-[10px] text-zinc-400 font-outfit uppercase tracking-wider font-semibold">
                    <span>{item.role}</span>
                    <span className="text-[#facc15] font-black">★★★★★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moves Right */}
          <div className="marquee-row-2-container w-full overflow-hidden">
            <div className="marquee-row-2">
              {[...row2Testimonials, ...row2Testimonials].map((item, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="w-[300px] sm:w-[380px] flex-shrink-0 p-6 sm:p-8 rounded-[2rem] bg-white/70 border border-zinc-200 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border border-zinc-100"
                    />
                    <div>
                      <h4 className="font-syne font-bold text-sm text-black flex items-center gap-1.5 leading-none">
                        <span>{item.name}</span>
                        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white shadow-sm" title="Verified Client">
                          <Check className="w-2.5 h-2.5 stroke-[4]" />
                        </span>
                      </h4>
                      <p className="font-outfit text-[11px] text-zinc-400 font-medium mt-1 leading-none">
                        {item.username}
                      </p>
                    </div>
                  </div>
                  
                  <p className="font-outfit text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-light">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100 text-[10px] text-zinc-400 font-outfit uppercase tracking-wider font-semibold">
                    <span>{item.role}</span>
                    <span className="text-[#facc15] font-black">★★★★★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
