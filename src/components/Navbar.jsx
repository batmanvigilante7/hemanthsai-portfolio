import React, { useState, useEffect, useRef } from "react";
import { Menu, X, MessageSquare, Send } from "lucide-react";
import { gsap } from "gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Form State for Feedback Modal
  const [formData, setFormData] = useState({ name: "", role: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navContainerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);

  // GSAP entrance animations on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      // Set initial state
      gsap.set(logoRef.current, { x: -50, opacity: 0 });
      if (linksRef.current) {
        gsap.set(linksRef.current.children, { y: 20, opacity: 0 });
      }
      gsap.set(ctaRef.current ? ctaRef.current.children : [], { y: 20, opacity: 0 });

      // Play entrance
      tl.to(logoRef.current, { x: 0, opacity: 1 }, 0.2);
      if (linksRef.current) {
        tl.to(
          linksRef.current.children,
          { y: 0, opacity: 1, stagger: 0.1, duration: 1.0 },
          0.3
        );
      }
      if (ctaRef.current) {
        tl.to(
          ctaRef.current.children,
          { y: 0, opacity: 1, stagger: 0.1, duration: 1.0 },
          "-=0.7"
        );
      }
    }, navContainerRef);

    return () => ctx.revert();
  }, []);

  // Handle scroll events (hide on scroll down, show on scroll up, glassmorphism bg)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Scrolled state triggers glassmorphism
      setScrolled(currentScrollPos > 50);

      // Show/Hide navbar based on scrolling direction
      if (currentScrollPos > 120) {
        const isScrollingUp = prevScrollPos > currentScrollPos;
        setVisible(isScrollingUp);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    if (isOpen || showFeedbackModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, showFeedbackModal]);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#welcome" },
    { name: "Portfolio", href: "#projects" },
    { name: "Service", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Name and Message are required!");
      return;
    }
    // Simulate submission
    setFormSubmitted(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFormData({ name: "", role: "", message: "" });
      setFormSubmitted(false);
    }, 2000);
  };

  return (
    <>
      {/* Top Fixed Responsive Navbar */}
      <nav
        ref={navContainerRef}
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "py-4 bg-zinc-950/80 text-white backdrop-blur-md border-b border-zinc-800/40 shadow-lg shadow-black/10"
            : "py-6 bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#hero"
            className="group flex items-center gap-2 font-syne text-lg md:text-xl font-extrabold tracking-wider uppercase"
          >
            <span className="text-white group-hover:text-[#facc15] transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
              Hemanth <span className="text-[#facc15]">Sai</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-pulse"></span>
          </a>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center gap-8" ref={linksRef}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative py-2 font-outfit text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                {/* Underline expand hover effect */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#facc15] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4" ref={ctaRef}>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Feedback
            </button>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-[#facc15] text-zinc-950 hover:scale-105 hover:shadow-[0_0_25px_rgba(250,204,21,0.55)] transition-all duration-300"
            >
              Let's Talk
            </a>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors focus:outline-none z-50 relative"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Fullscreen Mobile Overlay Menu */}
        <div
          className={`fixed inset-0 w-full h-screen bg-zinc-950/95 text-white z-40 flex flex-col justify-between p-8 md:hidden transition-all duration-700 ease-in-out ${
            isOpen ? "opacity-100 translate-y-0 backdrop-blur-3xl" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#facc15]/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="h-16"></div>

          {/* Navigation Links inside Mobile Menu */}
          <div className="flex flex-col gap-6 justify-center my-auto relative z-10">
            <p className="text-[#facc15] font-outfit text-xs uppercase tracking-[0.25em] mb-2 font-bold">
              Menu
            </p>
            <ul className="flex flex-col gap-6 font-syne text-4xl font-extrabold tracking-tight uppercase">
              {navLinks.map((link, idx) => (
                <li
                  key={link.name}
                  style={{
                    transitionDelay: isOpen ? `${idx * 70}ms` : "0ms",
                    transform: isOpen ? "translateY(0)" : "translateY(30px)",
                    opacity: isOpen ? 1 : 0,
                  }}
                  className="transition-all duration-500"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#facc15] transition-colors duration-300 flex items-center justify-between group py-1"
                  >
                    <span>{link.name}</span>
                    <span className="text-zinc-700 group-hover:text-[#facc15] transition-colors duration-300 font-light">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Footer Area */}
          <div
            style={{
              transitionDelay: isOpen ? `${navLinks.length * 70}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(25px)",
              opacity: isOpen ? 1 : 0,
            }}
            className="transition-all duration-500 border-t border-zinc-900 pt-6 relative z-10 flex flex-col gap-4"
          >
            <button
              onClick={() => {
                setIsOpen(false);
                setShowFeedbackModal(true);
              }}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-widest hover:border-[#facc15] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Leave Feedback</span>
            </button>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-6 py-4 rounded-full bg-[#facc15] text-zinc-950 font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all"
            >
              <span>Let's Talk</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Testimonial Feedback Modal (Glassmorphism card) */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setShowFeedbackModal(false)}
          ></div>

          {/* Glassmorphism Card */}
          <div
            className="relative w-full max-w-lg bg-zinc-950/75 border border-zinc-800 p-8 rounded-[30px] shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-300"
            data-aos="zoom-in"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 bg-[#facc15] text-zinc-950 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-syne mb-2 text-white">Thank You!</h3>
                <p className="text-zinc-400 text-sm">Your feedback was successfully received.</p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold font-syne mb-6 text-white tracking-wide">
                  Add Testimonial
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-bold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-bold mb-2">
                      Role / Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CEO at Acme Corp"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-bold mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows="4"
                      placeholder="Share your thoughts about working with me..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors duration-300 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs bg-[#facc15] text-zinc-950 hover:bg-[#ebd50f] hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all duration-300"
                  >
                    Submit Testimonial
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
