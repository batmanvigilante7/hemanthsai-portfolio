import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function LetterTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef(null);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const testimonials = [
    {
      num: "01",
      name: "Sarah Jenkins",
      username: "@sarah_jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Product Lead at Velo Studio",
      message: "Hemanth has a rare ability to translate high-fidelity designs into code without losing any detail. The UI animations he crafted feel tactile and incredibly smooth.",
      verified: true,
      rating: 5,
    },
    {
      num: "02",
      name: "Marcus Chen",
      username: "@marcus_chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Founder of Arca Media",
      message: "The visual storytelling on our landing page completely changed how clients see us. He brought our brand to life with stunning GSAP motion design.",
      verified: true,
      rating: 5,
    },
    {
      num: "03",
      name: "Elena Rostova",
      username: "@elena_rostova",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Co-Founder at Nexa Tech",
      message: "An absolute master of creative frontend. His product thinking goes way beyond standard coding—he suggested UX revisions that doubled our user engagement.",
      verified: true,
      rating: 5,
    },
    {
      num: "04",
      name: "David Kovic",
      username: "@david_kovic",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Technical Director at Apex Corp",
      message: "Clean, performant React structure. Our page load time decreased, and the Lenis smooth scrolling has made the user experience feel incredibly premium.",
      verified: true,
      rating: 5,
    },
    {
      num: "05",
      name: "Aisha Vance",
      username: "@aisha_vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Design Partner at Bold Ventures",
      message: "The cinematic transitions he implemented for our showcase are award-winning quality. He works like an editor, polishing micro-animations to perfection.",
      verified: true,
      rating: 5,
    },
  ];

  const nextCard = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevCard = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play timer logic
  useEffect(() => {
    if (isHovered) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }
    autoPlayTimer.current = setInterval(nextCard, 3500); // 3.5 seconds loop
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered]);

  // Touch handlers for mobile swipe guestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX; // initialize
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    if (diffX > 60) {
      nextCard(); // swiped left -> show next
    } else if (diffX < -60) {
      prevCard(); // swiped right -> show prev
    }
  };

  // Circular 3D positioning styles for layers
  const getCardStyle = (idx) => {
    const numCards = testimonials.length;
    let diff = idx - activeIdx;

    // Wrap circular list
    if (diff < -numCards / 2) diff += numCards;
    if (diff > numCards / 2) diff -= numCards;

    const isActive = diff === 0;
    const isPrevious = diff === -1 || (diff === numCards - 1 && numCards === 2);

    let opacity = 0;
    let transform = "";
    let zIndex = 0;
    let pointerEvents = "none";

    if (isActive) {
      opacity = 1;
      transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
      zIndex = 30;
      pointerEvents = "auto";
    } else if (diff === 1) {
      opacity = 0.85;
      transform = "translate3d(20px, 15px, -70px) scale(0.94) rotate(4deg)";
      zIndex = 20;
    } else if (diff === 2) {
      opacity = 0.5;
      transform = "translate3d(-20px, 30px, -140px) scale(0.88) rotate(-4deg)";
      zIndex = 10;
    } else if (isPrevious) {
      // Swiped card exit transition
      opacity = 0;
      transform = "translate3d(-180px, -10px, 60px) scale(0.95) rotate(-10deg)";
      zIndex = 40;
    } else {
      opacity = 0;
      transform = "translate3d(0, 50px, -200px) scale(0.8) rotate(0deg)";
      zIndex = 0;
    }

    return {
      opacity,
      transform,
      zIndex,
      pointerEvents,
      transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  return (
    <div
      className="relative w-full max-w-lg mx-auto flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Stack container */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full px-6 flex justify-center items-center h-[340px] perspective-[1000px] transform-style-3d"
      >
        {testimonials.map((item, idx) => {
          const style = getCardStyle(idx);
          return (
            <div
              key={idx}
              style={style}
              className="absolute w-full max-w-[340px] sm:max-w-[460px] h-[280px] origin-center"
            >
              {/* Folded paper letter card style */}
              <div 
                className="relative w-full h-full bg-[#FAF9F5] border border-zinc-200/80 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.06)] overflow-hidden"
                style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.01) 1px, transparent 1px)" }}
              >
                {/* Dog-eared page corner fold effect */}
                <div 
                  className="absolute top-0 right-0 w-8 h-8 bg-zinc-100/90 border-l border-b border-zinc-200/70 rounded-bl-lg pointer-events-none z-10"
                  style={{
                    clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                    boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.03)"
                  }}
                />
                {/* Cutout area behind the fold */}
                <div 
                  className="absolute top-0 right-0 w-8 h-8 bg-[#f7f6f2] pointer-events-none z-0"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%)"
                  }}
                />

                {/* Profile header */}
                <div className="flex items-center gap-3.5 z-10">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-zinc-200/40 select-none pointer-events-none"
                    loading="eager"
                  />
                  <div>
                    <h4 className="font-syne font-bold text-sm text-zinc-900 flex items-center gap-1.5 leading-none">
                      <span>{item.name}</span>
                      {item.verified && (
                        <span 
                          className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white shadow-sm"
                          title="Verified Client"
                        >
                          <Check className="w-2 h-2 stroke-[4]" />
                        </span>
                      )}
                    </h4>
                    <p className="font-outfit text-[11px] text-zinc-400 font-medium mt-1 leading-none">
                      {item.username}
                    </p>
                  </div>
                </div>

                {/* Message block */}
                <p className="font-outfit text-zinc-600 text-xs sm:text-[13px] leading-relaxed font-light mt-4 mb-3 italic">
                  "{item.message}"
                </p>

                {/* Card footer details */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-200/40 text-[10px] text-zinc-400 font-outfit uppercase tracking-wider font-semibold z-10">
                  <span>{item.role}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#facc15] stroke-none" />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Control Actions (dots & arrows) */}
      <div className="flex items-center gap-6 mt-4 z-25 relative">
        {/* Left Arrow */}
        <button
          onClick={prevCard}
          className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-black hover:border-black transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Indicators Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIdx ? "w-6 bg-[#facc15]" : "w-1.5 bg-zinc-300"
              }`}
              aria-label={`Go to Testimonial ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextCard}
          className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-black hover:border-black transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Touch swipe hint for mobile */}
      <span className="text-[9px] uppercase tracking-widest text-zinc-300 mt-6 sm:hidden pointer-events-none">
        Swipe or tap arrows to navigate
      </span>
    </div>
  );
}
