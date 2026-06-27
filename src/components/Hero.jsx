import React, { useEffect, useRef, useState } from "react";
import { Globe, ArrowRight } from "lucide-react";

// Custom inline SVG icons because brand icons are omitted in this environment's lucide-react
const Instagram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Hero() {
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const opacityRef = useRef(0);
  const requestRef = useRef(null);
  const fadingOutRef = useRef(false);

  // Video URL resolving for both local development and GitHub Pages deployment
  const VIDEO_URL = `${import.meta.env.BASE_URL}man-typing-builder.mp4`;

  // Animate opacity smoothly using JS requestAnimationFrame
  const animateOpacity = (target, duration) => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }

    const startOpacity = opacityRef.current;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startOpacity + (target - startOpacity) * progress;
      setOpacity(current);
      opacityRef.current = current;

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(step);
      } else {
        requestRef.current = null;
      }
    };

    requestRef.current = requestAnimationFrame(step);
  };

  // Fade in when the video can play
  const handleCanPlay = () => {
    if (opacityRef.current === 0 && !fadingOutRef.current) {
      animateOpacity(1, 500);
    }
  };

  // Monitor video playback time to trigger early fade-out
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const remainingTime = video.duration - video.currentTime;

    // Trigger fade-out when 0.55 seconds remain before the video ends
    if (remainingTime <= 0.55 && !fadingOutRef.current) {
      fadingOutRef.current = true;
      animateOpacity(0, 500);
    }
  };

  // Custom ended callback for loop restart and fade back in
  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    // Force opacity to 0
    setOpacity(0);
    opacityRef.current = 0;

    // Wait 100ms, then reset currentTime and play
    setTimeout(() => {
      video.currentTime = 0;
      video.play()
        .then(() => {
          fadingOutRef.current = false;
          // Fade back to opacity 1
          animateOpacity(1, 500);
        })
        .catch((err) => {
          console.error("Video loop playback failed:", err);
        });
    }, 100);
  };

  // Playback mount checking & frame cleanup
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 3) {
      animateOpacity(1, 500);
    }

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none z-10"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        style={{ opacity: opacity }}
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none transition-none"
      />

      {/* Subtle cinematic black overlay */}
      <div className="absolute inset-0 bg-black/35 z-[1] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="relative z-20 w-full px-6 py-6 shrink-0">
        <div className="liquid-glass max-w-5xl mx-auto rounded-full px-6 py-3 flex items-center justify-between">
          {/* Left Branding */}
          <div className="flex items-center gap-2 relative z-10">
            <Globe className="w-4 h-4 text-white" />
            <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-white">
              Asme
            </span>
          </div>

          {/* Center Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 relative z-10">
            <a
              href="#features"
              className="font-sans text-[11px] font-medium tracking-wider text-white/60 hover:text-white transition duration-300"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="font-sans text-[11px] font-medium tracking-wider text-white/60 hover:text-white transition duration-300"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="font-sans text-[11px] font-medium tracking-wider text-white/60 hover:text-white transition duration-300"
            >
              About
            </a>
          </div>

          {/* Right Action Links */}
          <div className="flex items-center gap-4 relative z-10">
            <a
              href="#signup"
              className="font-sans text-[11px] font-medium tracking-wider text-white/60 hover:text-white transition duration-300"
            >
              Sign Up
            </a>
            <a
              href="#login"
              className="liquid-glass rounded-full px-4 py-1.5 font-sans text-[11px] font-medium tracking-wider text-white hover:bg-white/[0.05] transition duration-300"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 relative z-10 -translate-y-[20%]">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          {/* Title */}
          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white whitespace-nowrap"
          >
            Built for the curious
          </h1>

          {/* Email input field inside rounded liquid glass pill */}
          <div className="liquid-glass rounded-full w-full max-w-md p-1.5 flex items-center justify-between gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none text-white text-sm px-4 py-2 w-full placeholder-white/40"
            />
            <button className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition duration-300 shrink-0 cursor-pointer">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Subtitle */}
          <div className="flex flex-col gap-1 max-w-md mx-auto">
            <p className="text-xs font-normal text-white/65 leading-relaxed tracking-wide">
              Stay updated with the latest news and insights.
            </p>
            <p className="text-xs font-normal text-white/65 leading-relaxed tracking-wide">
              Subscribe to our newsletter today and never miss out on exciting updates.
            </p>
          </div>

          {/* Manifesto Button */}
          <button className="liquid-glass rounded-full px-7 py-2.5 font-sans text-xs font-semibold tracking-wider text-white hover:bg-white/[0.05] transition duration-300 cursor-pointer">
            Manifesto
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 px-6 text-center shrink-0">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.05] transition duration-300"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.05] transition duration-300"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://globe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.05] transition duration-300"
          >
            <Globe className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </section>
  );
}
