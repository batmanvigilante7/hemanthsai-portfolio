import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (!message.trim()) {
      alert("Message is required");
      return;
    }
    
    // Formatted portfolio inquiry message for WhatsApp
    const formattedText = `Hello Hemanth,
    
I would like to get in touch with you regarding a business inquiry.

*Name:* ${name}
*Email:* ${email || "Not provided"}
*Message:* ${message}

Sent from Hemanth Sai Portfolio.`;
    
    const encodedText = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/917695973074?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin behavior: Pinned contact section (Footer slides over it)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "bottom bottom", // Fixed to match PDF specification
        pin: true,
        pinSpacing: false,
      });

      // Staggered slide up elements transition on entering viewport
      const q = gsap.utils.selector(containerRef);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(
        q(".contact-bg-watermark"),
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 0.03, duration: 1.2, ease: "power2.out" }
      )
      .fromTo(
        q(".contact-heading"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.9"
      )
      .fromTo(
        q(".contact-form-container"),
        { y: 70, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        q(".contact-social-icons a"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power2.out" },
        "-=0.8"
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col justify-center py-24 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden rounded-t-[40px] z-0 selection:bg-white selection:text-black"
    >
      {/* Massive Background Typography */}
      <div className="contact-bg-watermark absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden leading-none">
        <h3 className="font-syne font-black text-[25vw] tracking-tighter uppercase text-white/5 opacity-60">
          CONNECT
        </h3>
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center relative z-10 text-center">
        
        {/* Main Heading */}
        <h2 className="contact-heading font-syne font-black text-[12vw] sm:text-[10vw] lg:text-[8vw] uppercase tracking-tighter leading-none text-white mb-8 select-none">
          Let’s Talk
        </h2>

        {/* Glassmorphism Dark Form Container */}
        <div className="contact-form-container w-full max-w-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-left z-10">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2 font-outfit select-none">
                Your Name *
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 font-outfit text-sm focus:border-white/50 focus:ring-0 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2 font-outfit select-none">
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 font-outfit text-sm focus:border-white/50 focus:ring-0 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2 font-outfit select-none">
                Your Message *
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                rows="4"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 font-outfit text-sm focus:border-white/50 focus:ring-0 focus:outline-none transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full bg-white text-black font-syne font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer select-none"
            >
              Send
            </button>
          </form>
        </div>

        {/* Animated Circular Social Icons */}
        <div className="contact-social-icons flex flex-wrap justify-center gap-6 mt-12 z-10">
          <a
            href="https://wa.me/917695973074"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-14 h-14 rounded-full border-2 border-white bg-transparent flex items-center justify-center text-white transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 cursor-pointer"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-14 h-14 rounded-full border-2 border-white bg-transparent flex items-center justify-center text-white transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 cursor-pointer"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-14 h-14 rounded-full border-2 border-white bg-transparent flex items-center justify-center text-white transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 cursor-pointer"
          >
            <FaLinkedinIn className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-14 h-14 rounded-full border-2 border-white bg-transparent flex items-center justify-center text-white transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 cursor-pointer"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
