import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LetterTestimonials({
  direction = "back", // "back" | "front"
  axis = "y",         // "y" | "x"
  autoPlay = true,
  autoPlayInterval = 3500
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const entries = [
    {
      greeting: "Hello there,",
      body: "The premium transitions and cinematic layout you implemented on our project completely redefined our digital presence. Your eye for motion design and frontend polish is unmatched.",
      closing: "With warm regards,",
      signature: "Marcus Thorne"
    },
    {
      greeting: "Dear Hemanth,",
      body: "Your ability to take a conceptual design and bring it to life with buttery smooth GSAP animations is truly impressive. The portfolio feels organic, responsive, and incredibly fast.",
      closing: "With warm regards,",
      signature: "Elena Kowalski"
    },
    {
      greeting: "Hello there,",
      body: "Working with you was a masterclass in creative development. The 3D folder system and custom carousels are exactly the kind of Awwwards-level details we wanted.",
      closing: "With warm regards,",
      signature: "Riya Mehta"
    },
    {
      greeting: "Dear Hemanth,",
      body: "The interactive hover details and dynamic background transitions are clean and performant. You understand the balance between luxury animations and loading speed.",
      closing: "With warm regards,",
      signature: "Arjun Varma"
    }
  ];

  // 3D flip animation logic
  const triggerFlip = (nextIdx) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const card = cardRef.current;
    if (!card) return;

    const rotProp = axis === "x" ? "rotateX" : "rotateY";
    
    // Calculate rotation values based on direction and axis
    let outRotVal = 90;
    let inRotVal = -90;

    if (axis === "x") {
      // For X axis, a backflip rotates the top edge away (negative angle)
      if (direction === "back") {
        outRotVal = -90;
        inRotVal = 90;
      } else {
        outRotVal = 90;
        inRotVal = -90;
      }
    } else {
      // For Y axis, page turns to the right/away (positive angle)
      if (direction === "back") {
        outRotVal = 90;
        inRotVal = -90;
      } else {
        outRotVal = -90;
        inRotVal = 90;
      }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    // Phase 1: Outgoing 3D rotation
    tl.to(card, {
      [rotProp]: outRotVal,
      opacity: 0,
      scale: 0.9,
      y: 0, // Reset hover lift
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIdx(nextIdx);
      }
    });

    // Phase 2: Instantly set incoming rotation on the other side
    tl.set(card, {
      [rotProp]: inRotVal,
      scale: 0.9,
      opacity: 0
    });

    // Phase 3: Incoming 3D rotation with spring-like ease
    tl.to(card, {
      [rotProp]: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.4)", // overshoot for organic spring-back feel
    });
  };

  // Click to cycle
  const handleClick = () => {
    if (isAnimating) return;
    const nextIdx = (currentIdx + 1) % entries.length;
    triggerFlip(nextIdx);
  };

  // Hover lift and rotate physics
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isAnimating) return;
    gsap.to(cardRef.current, {
      y: -8,
      rotation: 0.5, // straightens slightly from natural slant
      scale: 1.01,
      boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.22)", // elevated shadow
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isAnimating) return;
    gsap.to(cardRef.current, {
      y: 0,
      rotation: -1.5, // returns to natural letter slant
      scale: 1,
      boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.14)", // standard 0.8 intensity paper shadow
      duration: 0.4,
      ease: "power2.out"
    });
  };

  // Mobile Touch Swiping Gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum swipe threshold (50px)
    if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
      if (isAnimating) return;

      let nextIdx;
      if (axis === "y") {
        if (diffX > 0) {
          // Swipe right: previous entry
          nextIdx = (currentIdx - 1 + entries.length) % entries.length;
        } else {
          // Swipe left: next entry
          nextIdx = (currentIdx + 1) % entries.length;
        }
      } else {
        if (diffY > 0) {
          // Swipe down: previous entry
          nextIdx = (currentIdx - 1 + entries.length) % entries.length;
        } else {
          // Swipe up: next entry
          nextIdx = (currentIdx + 1) % entries.length;
        }
      }
      triggerFlip(nextIdx);
    }
  };

  // Autoplay timer
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(() => {
      if (!isAnimating) {
        const nextIdx = (currentIdx + 1) % entries.length;
        triggerFlip(nextIdx);
      }
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIdx, isHovered, isAnimating, autoPlay, autoPlayInterval]);

  const activeEntry = entries[currentIdx];

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 select-none">
      {/* Import Caveat signature font dynamically */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
        .font-signature {
          font-family: 'Caveat', cursive;
        }
      `}} />

      {/* 3D Viewport container */}
      <div className="w-full flex items-center justify-center perspective-[1200px] transform-style-3d">
        {/* White paper sheet card */}
        <div
          ref={cardRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-[86vw] sm:w-[460px] min-h-[350px] bg-white border border-zinc-200/50 rounded-sm p-8 sm:p-10 text-left cursor-pointer flex flex-col justify-between"
          style={{
            transform: "rotate(-1.5deg)",
            transformStyle: "preserve-3d",
            boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.14)", // slight paper shadow
          }}
        >
          {/* Subtle paper top/left border details to simulate premium paper cut */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-zinc-100/30" />
          <div className="absolute inset-y-0 left-0 w-[1.5px] bg-zinc-100/30" />

          {/* Letter Content */}
          <div className="flex-1 flex flex-col justify-start">
            {/* Greeting */}
            <span className="font-sans font-medium text-[#555555] text-sm tracking-wide mb-5 select-none">
              {activeEntry.greeting}
            </span>

            {/* Testimonial Message Body */}
            <p className="font-sans text-[#333333] text-sm sm:text-base leading-relaxed tracking-wide font-normal flex-1 pr-2 select-none">
              {activeEntry.body}
            </p>
          </div>

          {/* Closing & Signature */}
          <div className="mt-8 border-t border-zinc-100 pt-6 flex flex-col select-none">
            <span className="font-sans text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">
              {activeEntry.closing}
            </span>
            <span className="font-signature text-3xl text-[#1e293b] tracking-wide mt-1">
              {activeEntry.signature}
            </span>
          </div>

          {/* Click to Flip Prompt Indicator / Index Counter */}
          <div className="absolute bottom-4 right-6 text-[9px] font-bold text-zinc-300 font-outfit uppercase tracking-widest pointer-events-none select-none">
            Click to flip // 0{currentIdx + 1}
          </div>
        </div>
      </div>

      {/* Subtle Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-8 z-10 relative">
        {entries.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isAnimating || idx === currentIdx) return;
              triggerFlip(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIdx ? "bg-[#facc15] scale-110" : "bg-zinc-700 hover:bg-zinc-500"
            }`}
            aria-label={`Go to letter ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
