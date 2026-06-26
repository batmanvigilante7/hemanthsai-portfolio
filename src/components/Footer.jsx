import React from "react";
import heroPortrait from "../assets/hero-portrait.jpg";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#f4c400] text-[#18181b] pt-28 pb-10 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-center justify-between overflow-hidden z-20 selection:bg-[#18181b] selection:text-[#f4c400]">
      
      {/* Self-contained styling for marquee layers and float animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right-slow {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes float-profile {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.03); }
        }
        .marquee-slow-left {
          display: flex;
          width: max-content;
          gap: 3rem;
          animation: marquee-left-slow 40s linear infinite;
        }
        .marquee-slow-right {
          display: flex;
          width: max-content;
          gap: 3rem;
          animation: marquee-right-slow 40s linear infinite;
        }
        .animate-float-profile {
          animation: float-profile 4.5s ease-in-out infinite;
        }
      `}} />

      {/* 4 Alternating Direction Background Marquee Layers */}
      <div className="absolute inset-0 overflow-hidden flex flex-col justify-around py-8 pointer-events-none select-none z-0 opacity-10">
        {/* Layer 1: Left direction */}
        <div className="w-full overflow-hidden">
          <div className="marquee-slow-left text-[9vw] font-black uppercase tracking-tighter text-[#18181b]/15 leading-none select-none">
            <span>HEMANTH SAI PORTFOLIO &bull; HEMANTH SAI PORTFOLIO &bull; </span>
            <span>HEMANTH SAI PORTFOLIO &bull; HEMANTH SAI PORTFOLIO &bull; </span>
          </div>
        </div>
        
        {/* Layer 2: Right direction */}
        <div className="w-full overflow-hidden">
          <div className="marquee-slow-right text-[9vw] font-black uppercase tracking-tighter text-[#18181b]/15 leading-none select-none">
            <span>CREATIVE DEVELOPMENT &bull; CREATIVE DEVELOPMENT &bull; </span>
            <span>CREATIVE DEVELOPMENT &bull; CREATIVE DEVELOPMENT &bull; </span>
          </div>
        </div>

        {/* Layer 3: Left direction */}
        <div className="w-full overflow-hidden">
          <div className="marquee-slow-left text-[9vw] font-black uppercase tracking-tighter text-[#18181b]/15 leading-none select-none">
            <span>MOTION & INTERACTION &bull; MOTION & INTERACTION &bull; </span>
            <span>MOTION & INTERACTION &bull; MOTION & INTERACTION &bull; </span>
          </div>
        </div>

        {/* Layer 4: Right direction */}
        <div className="w-full overflow-hidden">
          <div className="marquee-slow-right text-[9vw] font-black uppercase tracking-tighter text-[#18181b]/15 leading-none select-none">
            <span>AWARDS INSPIRED DESIGN &bull; AWARDS INSPIRED DESIGN &bull; </span>
            <span>AWARDS INSPIRED DESIGN &bull; AWARDS INSPIRED DESIGN &bull; </span>
          </div>
        </div>
      </div>

      {/* Center Layout: Profile Showcase & CTA Buttons */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Floating Profile Image */}
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-[#18181b] shadow-[0_25px_50px_rgba(0,0,0,0.35)] overflow-hidden animate-float-profile select-none">
          <img
            src={heroPortrait}
            alt="Hemanth Sai Profile"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          {/* Blue Follow Button */}
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2563eb] text-white font-syne font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] cursor-pointer select-none"
          >
            Follow
          </a>
          
          {/* White Message Button */}
          <a
            href="#contact"
            className="bg-white text-[#18181b] font-syne font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-full border border-zinc-200/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] cursor-pointer select-none"
          >
            Message
          </a>
        </div>
      </div>

      {/* Branding & Sub-links Area */}
      <div className="relative z-10 w-full flex flex-col items-center mt-20 text-center">
        
        {/* Dual-Toned Luxury Logo */}
        <div className="font-syne font-black text-4xl uppercase tracking-tighter leading-none select-none">
          <span className="text-[#18181b]">HEMANTH</span>
          <span className="text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] ml-1.5">SAI</span>
        </div>

        {/* Tagline */}
        <p className="font-outfit text-xs font-semibold uppercase tracking-[0.3em] text-[#18181b]/60 mt-3 select-none">
          Creative Developer & Interactive Art Director
        </p>

        {/* Responsive Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 font-outfit text-xs font-bold uppercase tracking-[0.25em] text-[#18181b] mt-10">
          <a href="#portfolio" className="hover:text-white transition-colors duration-300 relative group py-1">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#welcome" className="hover:text-white transition-colors duration-300 relative group py-1">
            Story
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#projects" className="hover:text-white transition-colors duration-300 relative group py-1">
            Work
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#services" className="hover:text-white transition-colors duration-300 relative group py-1">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#contact" className="hover:text-white transition-colors duration-300 relative group py-1">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
          </a>
        </nav>
      </div>

      {/* Minimal Rounded Divider */}
      <div className="w-full max-w-7xl h-[1.5px] bg-[#18181b]/10 rounded-full my-10 z-10" />

      {/* Copyright & Legal Links */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-[#18181b]/60 uppercase tracking-widest font-outfit z-10">
        <div className="select-none">
          &copy; {new Date().getFullYear()} Hemanth Sai. All Rights Reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
      
    </footer>
  );
}
