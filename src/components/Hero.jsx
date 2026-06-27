import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GENESIS_VIDEO = `${import.meta.env.BASE_URL}assets/videos/genesis.mp4`;

export default function Hero() {
  const heroRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const nameRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    // Attempt to play the background video
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented, trying again on interaction:", err);
      });
    }

    // Set initial opacity of the next section to 0 so it can cross-fade beautifully
    gsap.set("#welcome", { opacity: 0 });

    // Initialize ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=200%", // Pin for two full viewports of scroll distance
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Stage 1: Scale 0.8 -> 1.0 (corresponds to frame scale 1.0 -> 1.25), blur 3px -> 0px, and fade supporting subtitle (0.0 to 0.5)
    tl.to(frameRef.current, {
      scale: 1.25,
      borderRadius: "0px",
      borderWidth: "0px",
      padding: "0px",
      boxShadow: "none",
      filter: "blur(0px)",
      ease: "power2.out",
      duration: 0.5,
    }, 0);

    tl.to(videoRef.current, {
      borderRadius: "0px",
      ease: "power2.out",
      duration: 0.5,
    }, 0);

    // Fade the supporting subtitle text block out first during the scale zoom
    tl.to(subRef.current, {
      opacity: 0,
      y: -40,
      ease: "power2.out",
      duration: 0.5,
    }, 0);

    // Fade out the dark overlay during Stage 1 so natural golden-hour colors shine in full screen
    tl.to(overlayRef.current, {
      opacity: 0,
      ease: "power2.out",
      duration: 0.5,
    }, 0);

    // Stage 2: Hold full-screen hero and HEMANTH SAI name anchor briefly (0.5 to 0.75)
    tl.to({}, { duration: 0.25 });

    // Stage 3: Fade out HEMANTH SAI name anchor, the video/frame, and fade in next section stationary (0.75 to 1.0)
    tl.to(nameRef.current, {
      opacity: 0,
      y: -30,
      ease: "power1.inOut",
      duration: 0.25,
    }, 0.75);

    tl.to(frameRef.current, {
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.25,
    }, 0.75);

    // Keep the next section (#welcome) and all its subsequent siblings stationary
    // relative to the viewport while it fades in, then release them to scroll normally.
    tl.fromTo(
      ["#welcome", "#welcome ~ *"],
      {
        y: () => -window.innerHeight * 1.5,
        opacity: 0,
      },
      {
        y: () => -window.innerHeight * 1.0,
        opacity: 1,
        ease: "none",
        duration: 0.25,
      },
      0.75
    );

    // Cleanup triggers and styles on unmount
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      gsap.set(["#welcome", "#welcome ~ *"], { clearProps: "all" });
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative w-full h-screen overflow-hidden text-white flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #242629 0%, #151618 60%, #0a0a0b 100%)"
      }}
    >
      {/* Centering Flex Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 lg:p-16 z-10 pointer-events-none">
        
        {/* Premium Apple-inspired Titanium Frame */}
        <div 
          ref={frameRef} 
          className="relative w-[80vw] h-[80vh] overflow-hidden rounded-[2.5rem] border border-white/12 bg-[#17181b] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.85)] pointer-events-auto flex items-center justify-center"
          style={{
            filter: "blur(3px)",
            transformOrigin: "center center",
            willChange: "transform, filter, opacity",
          }}
        >
          {/* Background Video */}
          <video
            ref={videoRef}
            src={GENESIS_VIDEO}
            className="w-full h-full object-cover rounded-[1.8rem]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              transformOrigin: "center center",
              willChange: "transform, border-radius",
            }}
          />

          {/* Subtle Dark Overlay */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.42), rgba(0,0,0,0.60))",
              willChange: "opacity",
            }}
          />

          {/* Text Overlay inside the frame for natural camera scaling feel */}
          <div 
            className="absolute inset-y-0 right-0 w-[50%] flex items-center justify-start px-8 md:px-16 z-20 pointer-events-none"
          >
            <div className="max-w-md text-left flex flex-col items-start">
              
              {/* Name Anchor (stays visible longer, fades in Stage 3) */}
              <div 
                ref={nameRef}
                style={{
                  willChange: "transform, opacity",
                }}
              >
                <h1 className="font-instrument text-[clamp(2.8rem,5.5vw,5rem)] tracking-[0.08em] text-white font-normal uppercase leading-none mb-6">
                  Hemanth Sai
                </h1>
              </div>

              {/* Supporting Subtitles (fades first in Stage 1) */}
              <div 
                ref={subRef}
                className="flex flex-col items-start"
                style={{
                  willChange: "transform, opacity",
                }}
              >
                <p className="font-instrument italic text-xl sm:text-2xl md:text-3xl text-stone-300/90 leading-tight mb-8">
                  Learning by building.
                </p>

                <div className="flex flex-col gap-1.5 font-outfit text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 leading-relaxed">
                  <p>CSE Student</p>
                  <p>GITAM University, Visakhapatnam</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/45">Scroll to enter</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
