import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroPortrait from "../assets/hero-portrait.jpg";
import LetterTestimonials from "./LetterTestimonials";

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const welcomeSectionRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const introContainerRef = useRef(null);
  const testimonialHeaderRef = useRef(null);
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

  // GSAP + ScrollTrigger Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Image scroll morph / transition continuation
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
            start: "top bottom",
            end: "top top",
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
    }, welcomeSectionRef);

    return () => {
      ctx.revert();
    };
  }, [dimensions]);

  return (
    <section
      ref={welcomeSectionRef}
      id="welcome"
      className="relative min-h-[200vh] w-full bg-gradient-to-b from-white via-zinc-100 to-zinc-950 text-black flex flex-col justify-start overflow-hidden pt-32 pb-0 selection:bg-black selection:text-[#facc15]"
    >
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

      {/* Screen 2: Testimonials (Fullscreen 100vh area) */}
      <div className="min-h-screen w-full bg-zinc-950 text-white flex flex-col justify-center relative py-24 md:py-32 overflow-hidden z-10">
        
        {/* Title and Subtitle */}
        <div
          ref={testimonialHeaderRef}
          className="text-center px-6 mb-16 relative z-10"
        >
          <p className="font-outfit text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#facc15] mb-3">
            What people are saying
          </p>
          <h3 className="font-syne font-black text-4xl sm:text-6xl tracking-tight text-white uppercase select-none">
            Client Love
          </h3>
        </div>

        {/* Testimonials 3D Paper Letter Flip Section */}
        <div className="relative z-10 w-full mt-4 flex items-center justify-center pointer-events-auto">
          <LetterTestimonials />
        </div>
      </div>
    </section>
  );
}
