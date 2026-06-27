import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loop steps data structure
const learningLoop = [
  {
    number: "01",
    title: "Project",
    belief: "Projects turn curiosity into direction.",
    explanation:
      "Every journey begins with a question. A project gives curiosity direction, pressure, and a place to turn into visible work.",
    principle: "Build first. Clarity follows.",
  },
  {
    number: "02",
    title: "Problem",
    belief: "Work reveals friction.",
    explanation:
      "Once the project begins, the vague idea meets reality. Bugs, unclear structure, weak design, and missing logic reveal the real problem that needs attention.",
    principle: "Projects expose problems.",
  },
  {
    number: "03",
    title: "Skill",
    belief: "Friction demands skill.",
    explanation:
      "The problem decides what I need to learn next. Instead of collecting random theory, I build the skill that removes the friction in front of me.",
    principle: "Problems force me to acquire skills.",
  },
  {
    number: "04",
    title: "Artifact",
    belief: "Skill becomes proof.",
    explanation:
      "A skill becomes valuable when it leaves my head. It turns into a page, prototype, repo, note, demo, case study, or system that can be seen and improved.",
    principle: "Skills produce artifacts.",
  },
  {
    number: "05",
    title: "Explanation",
    belief: "Proof needs clarity.",
    explanation:
      "An artifact is not finished if I cannot explain it. Explanation forces me to clarify what I built, why it matters, and how the thinking works.",
    principle: "Artifacts demand explanation.",
  },
  {
    number: "06",
    title: "Feedback",
    belief: "Clarity invites correction.",
    explanation:
      "Once the work is explained, reality can respond. Feedback shows what is unclear, weak, useful, overbuilt, or worth sharpening.",
    principle: "Explanation generates feedback.",
  },
  {
    number: "07",
    title: "Iteration",
    belief: "Correction sparks curiosity.",
    explanation:
      "Feedback sharpens the next version. Iteration closes one loop, but it also opens a new question, a better angle, and the next thing worth exploring.",
    principle: "Feedback creates iteration.",
  },
];

// Single Svg Node for desktop orbit layout
function SvgLoopNode({ item, index, active, isNext, hoveredNode, activeLoop, onOpen, onHoverStart, onHoverEnd, setRef }) {
  const angle = -90 + index * (360 / learningLoop.length);
  const radius = 278;
  const x = 380 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 380 + radius * Math.sin((angle * Math.PI) / 180);
  
  // Node radius: active 58, inactive 50
  const nodeRadius = active ? 58 : 50;

  // Dimming logic: Dim non-selected nodes when a node is hovered or active
  const isHighlighted = active || hoveredNode === index;
  const isAnyHighlighted = activeLoop !== null || hoveredNode !== null;
  const shouldDim = isAnyHighlighted && !isHighlighted;
  const nodeOpacity = shouldDim ? 0.28 : 1.0;

  return (
    <motion.g
      ref={setRef}
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title} stage`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen();
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={{ opacity: nodeOpacity }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="cursor-pointer outline-none select-none group"
      whileHover={{ scale: 1.05 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {/* Glow pulse behind standard node if it's next in the loop */}
      {isNext && (
        <motion.circle
          cx={x}
          cy={y}
          r={nodeRadius + 18}
          fill="rgba(250,204,21,0.015)"
          stroke="rgba(250,204,21,0.15)"
          strokeWidth="1"
          animate={{
            r: [nodeRadius + 12, nodeRadius + 22, nodeRadius + 12],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Background container ring */}
      <circle
        cx={x}
        cy={y}
        r={nodeRadius + 12}
        fill={active ? "rgba(250,204,21,0.06)" : "rgba(255,255,255,0.03)"}
        className="transition-all duration-500 group-hover:fill-[#facc15]/5"
      />

      {/* Main outer ring */}
      <circle
        cx={x}
        cy={y}
        r={nodeRadius}
        fill={
          active
            ? "rgba(250,204,21,0.12)"
            : isNext
            ? "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.04)"
        }
        stroke={
          active
            ? "rgba(250,204,21,0.72)"
            : isNext
            ? "rgba(250,204,21,0.3)"
            : "rgba(255,255,255,0.15)"
        }
        strokeWidth={active ? 2 : 1.2}
        className="transition-all duration-500 group-hover:stroke-[#facc15]/60 group-hover:fill-[#facc15]/5"
      />

      {/* Inner glass plate */}
      <circle
        cx={x}
        cy={y}
        r={nodeRadius - 9}
        fill="rgba(8,8,8,0.45)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />

      {/* Active dashed orbiting element */}
      {active && (
        <circle
          cx={x}
          cy={y}
          r={nodeRadius + 18}
          fill="none"
          stroke="rgba(250,204,21,0.35)"
          strokeWidth="1.2"
          strokeDasharray="5 7"
        />
      )}

      {/* Counter-rotating text labels group to keep text horizontal */}
      <g
        className="counter-rotate-text"
        data-x={x}
        data-y={y}
        style={{
          transform: "rotate(calc(-1 * var(--orbit-rotation, 0deg)))",
          transformOrigin: `${x}px ${y}px`,
        }}
      >
        {/* Label Text */}
        <text
          x={x}
          y={y - 8}
          textAnchor="middle"
          className={`font-mono text-[9px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 group-hover:fill-[#facc15] ${
            active ? "fill-[#facc15]" : "fill-white/40"
          }`}
        >
          {item.number}
        </text>
        <text
          x={x}
          y={y + 16}
          textAnchor="middle"
          className={`font-syne text-[12px] font-black uppercase tracking-[-0.04em] transition-colors duration-500 group-hover:fill-white ${
            active ? "fill-white" : "fill-white/80"
          }`}
        >
          {item.title}
        </text>
      </g>
    </motion.g>
  );
}

// Right panel detail view (desktop)
function LoopDetailPanel({ item, onReset }) {
  return (
    <motion.article
      key={item.title}
      initial={{ opacity: 0, x: 20, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[32px] border border-white/12 bg-black/35 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-between h-[520px] w-full"
    >
      {/* Decorative subtle background radial glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#facc15]/3 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#facc15]/80">
            Stage {item.number} / 07
          </span>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-white/45 transition duration-300 hover:border-[#facc15]/30 hover:bg-[#facc15]/10 hover:text-white cursor-pointer"
          >
            Reset
          </button>
        </div>

        <h3 className="mt-5 font-syne text-4xl font-black uppercase tracking-[-0.06em] text-white">
          {item.title}
        </h3>

        <div className="mt-5">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#facc15]/75">Core Belief</span>
          <p className="mt-1 text-base font-bold leading-snug tracking-tight text-zinc-100">
            {item.belief}
          </p>
        </div>

        <div className="mt-4">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">Explanation</span>
          <p className="mt-1 text-sm font-normal leading-relaxed text-zinc-400">
            {item.explanation}
          </p>
        </div>
      </div>

      <div className="relative rounded-xl border border-white/5 bg-black/30 p-4 mt-auto">
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
          Operating Principle
        </span>
        <p className="mt-1 text-xs font-semibold tracking-wide text-zinc-300 uppercase">
          {item.principle}
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-4 text-[9px] font-mono text-white/20">
        <span>Active OS Loop</span>
        <span>{item.number} / 07</span>
      </div>
    </motion.article>
  );
}

// Mobile individual accordion card
function AccordionCard({ step, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
        isOpen
          ? "border-[#facc15]/30 bg-zinc-900/25 shadow-[0_12px_40px_-12px_rgba(250,204,21,0.08)]"
          : "border-zinc-900/60 bg-zinc-950/40 hover:border-zinc-800/60"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 group focus:outline-none"
      >
        <div className="flex items-start gap-4">
          <span
            className={`font-mono text-sm transition-colors duration-500 mt-0.5 ${
              isOpen ? "text-[#facc15]" : "text-zinc-500 group-hover:text-zinc-400"
            }`}
          >
            {step.number}
          </span>
          <div>
            <h4
              className={`text-xl font-bold uppercase tracking-tight font-syne transition-colors duration-500 ${
                isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"
              }`}
            >
              {step.title}
            </h4>
            <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-widest leading-normal">
              {step.belief}
            </p>
          </div>
        </div>
        <span
          className={`text-[10px] font-mono transition-colors duration-500 mt-1 border rounded-full px-3 py-1 ${
            isOpen
              ? "text-[#facc15] border-[#facc15]/20 bg-[#facc15]/5"
              : "text-zinc-500 border-zinc-800/60 group-hover:text-zinc-400 group-hover:border-zinc-700"
          }`}
        >
          {isOpen ? "CLOSE" : "OPEN"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-zinc-900/60 space-y-4">
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-4">
                {step.explanation}
              </p>
              <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/40 p-4">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#facc15]/70">
                  Operating Principle
                </p>
                <p className="mt-1.5 text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                  {step.principle}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OperatingMethod() {
  const [activeLoop, setActiveLoop] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGlowPhase, setIsGlowPhase] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Refs for elements and GSAP orchestration
  const triggerRef = useRef(null);
  const textLeftRef = useRef(null);
  const orbitContainerRef = useRef(null);
  const rightPanelRef = useRef(null);
  const rotatingGroupRef = useRef(null);
  const rotationTweenRef = useRef(null);
  const nodesRef = useRef([]);

  // Active stage details
  const activeItem = activeLoop !== null ? learningLoop[activeLoop] : null;
  const orbitRadius = 278;
  const circumference = 2 * Math.PI * orbitRadius;

  // Stage active index refs for ScrollTrigger updates
  const activeLoopRef = useRef(null);
  const isGlowPhaseRef = useRef(false);

  // Math for continuously scroll-linked progress ring
  // Stage 2 starts at 0.28 progress and ends at 0.82 progress in the scrub timeline
  let activeProgress = 0;
  if (scrollProgress > 0.28 && scrollProgress <= 0.82) {
    activeProgress = (scrollProgress - 0.28) / (0.82 - 0.28);
  } else if (scrollProgress > 0.82) {
    activeProgress = 1;
  }
  const progressOffset = circumference * (1 - activeProgress);
  const nextLoop = activeLoop === null ? 0 : (activeLoop + 1) % learningLoop.length;

  // Sun Intensity scaling based on scroll progress
  const sunIntensity = activeLoop === null ? 0.15 : (activeLoop + 1) / learningLoop.length;
  
  // Center sun radius: 120 to 150 (let's use 130 base, scaling with active item)
  const sunCoreRadius = 110 + sunIntensity * 20;
  const sunMiddleRadius = 126 + sunIntensity * 24;
  const sunOuterRadius = 150 + sunIntensity * 30;

  // Center display texts
  const centerEyebrow = activeItem ? `Stage ${activeItem.number}` : "The Closed OS";
  const centerTitle = activeItem ? activeItem.title : "Curiosity";
  const centerSubtitle = activeItem ? activeItem.belief : "creates direction";

  // Wrap subtitle for circular center fit
  const centerSubtitleLines = centerSubtitle.split(" ").reduce((lines, word) => {
    const next = lines.length ? `${lines[lines.length - 1]} ${word}` : word;
    if (next.length > 20 && lines.length < 2) return [...lines, word];
    if (!lines.length) return [word];
    return [...lines.slice(0, -1), next];
  }, []);

  // Set up mouse parallax for the orbit centerpiece on desktop
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) * 0.022;
      const y = (clientY - window.innerHeight / 2) * 0.022;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Set up slow continuous orbital rotation with GSAP (animates a CSS custom property)
  useEffect(() => {
    if (window.innerWidth >= 1024 && rotatingGroupRef.current) {
      const tween = gsap.to(rotatingGroupRef.current, {
        "--orbit-rotation": "360deg",
        duration: 110,
        repeat: -1,
        ease: "none",
      });
      rotationTweenRef.current = tween;
    }

    return () => {
      if (rotationTweenRef.current) {
        rotationTweenRef.current.kill();
      }
    };
  }, []);

  // Smoothly slow down rotation on hover
  useEffect(() => {
    if (rotationTweenRef.current) {
      const targetScale = hoveredNode !== null ? 0.12 : 1.0;
      gsap.to(rotationTweenRef.current, {
        timeScale: targetScale,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  }, [hoveredNode]);

  // Set up scroll linked GSAP timeline
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    // Reset initial positions for GSAP control
    gsap.set(textLeftRef.current, { opacity: 0, y: 36 });
    gsap.set(rightPanelRef.current, { opacity: 0, x: 36 });
    nodesRef.current.forEach((node) => {
      if (node) gsap.set(node, { opacity: 0, scale: 0.6 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);

            // Determine active index in Stage 2 (0.28 to 0.82)
            let activeIdx = null;
            if (progress > 0.28 && progress <= 0.82) {
              const range = 0.82 - 0.28;
              const step = range / 7;
              const localProgress = progress - 0.28;
              activeIdx = Math.min(6, Math.floor(localProgress / step));
            } else if (progress > 0.82) {
              activeIdx = 6;
            }

            if (activeIdx !== activeLoopRef.current) {
              activeLoopRef.current = activeIdx;
              setActiveLoop(activeIdx);
            }

            // Determine glow phase (0.82 to 0.93)
            const glow = progress > 0.82 && progress <= 0.93;
            if (glow !== isGlowPhaseRef.current) {
              isGlowPhaseRef.current = glow;
              setIsGlowPhase(glow);
            }
          },
        },
      });

      // STAGE 1: Intro (Build up)
      tl.to(textLeftRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" })
        .to({}, { duration: 0.4 }); // slight holding delay

      // Nodes scale/stagger in
      nodesRef.current.forEach((node, idx) => {
        tl.to(
          node,
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
          `-=${idx === 0 ? 0 : 0.35}`
        );
      });

      // Right panel fades in
      tl.to(rightPanelRef.current, { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.4");

      // STAGE 2: Interaction Scroll window (handled via onUpdate progress steps)
      tl.to({}, { duration: 6.5 });

      // STAGE 3: Full glow phase
      tl.to({}, { duration: 1.2 }); // hold the glow

      // OUTRO: fade out all items in viewport
      tl.to(
        [textLeftRef.current, orbitContainerRef.current, rightPanelRef.current],
        { opacity: 0, y: -24, duration: 1.5, ease: "power2.in" }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full bg-[#030303]">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/45 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)] z-[2] pointer-events-none" />
      </div>

      {/* DESKTOP & TABLET VIEW: Responsive Grid Layout */}
      <div className="relative z-10 hidden lg:flex min-h-screen w-full flex-col justify-center items-center py-12 px-8 xl:px-12 max-w-[1700px] mx-auto overflow-hidden">
        <div className="flex flex-col xl:grid xl:grid-cols-[28%_44%_28%] items-center justify-between w-full gap-10 xl:gap-12 relative">
          
          {/* LEFT ZONE: Philosophy Editorial Typography */}
          <div ref={textLeftRef} className="w-full xl:w-auto flex flex-col justify-between xl:h-[520px] select-none text-left shrink-0">
            <div className="max-w-[700px] xl:max-w-none">
              <h1 className="font-instrument text-[clamp(3.8rem,5vw,5.2rem)] font-light uppercase tracking-tight leading-[0.82]">
                <span className="text-white">Ideas</span> <br />
                <span className="text-white/30">Become</span> <br />
                <span className="text-white">Systems.</span>
              </h1>
              <h1 className="font-instrument text-[clamp(3.8rem,5vw,5.2rem)] font-light uppercase tracking-tight leading-[0.82] mt-6 xl:mt-8">
                <span className="text-white/30">Systems</span> <br />
                <span className="text-white">Become</span> <br />
                <span className="text-white/30">Proof.</span>
              </h1>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/35 mt-6 xl:mt-auto">
              The work is only the evidence.
            </p>
          </div>

          {/* TABLET RESPONSIVE WRAPPER (Groups Orbit and Right Panel side-by-side on tablet/medium, disappears on XL grid) */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 xl:contents">
            
            {/* CENTER ZONE: Interactive SVG Orbit OS (Never below 600px, ideally 620px-760px) */}
            <div className="flex justify-center items-center w-full max-w-[620px] xl:max-w-none flex-shrink-0">
              <motion.div
                ref={orbitContainerRef}
                animate={{ x: mouseOffset.x, y: mouseOffset.y }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
                style={{ width: "clamp(620px, 42vw, 760px)" }}
                className="aspect-square flex items-center justify-center relative flex-shrink-0"
              >
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 760 760"
                  aria-label="Operating system learning loop"
                >
                  <defs>
                    <filter id="orbitLineGlow">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="sunCoreGlow">
                      <feGaussianBlur stdDeviation="12" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(250,204,21,0.85)" />
                      <stop offset="35%" stopColor="rgba(217,119,6,0.38)" />
                      <stop offset="70%" stopColor="rgba(146,64,14,0.1)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                  </defs>

                  {/* Starry floating particles */}
                  <g opacity="0.6">
                    <motion.circle
                      cx="120"
                      cy="140"
                      r="1.2"
                      fill="rgba(255,255,255,0.4)"
                      animate={{ x: [0, 8, -4, 0], y: [0, -12, 10, 0] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="630"
                      cy="170"
                      r="1"
                      fill="rgba(255,255,255,0.3)"
                      animate={{ x: [0, -10, 6, 0], y: [0, 15, -8, 0] }}
                      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="100"
                      cy="520"
                      r="1"
                      fill="rgba(255,255,255,0.35)"
                      animate={{ x: [0, 12, -6, 0], y: [0, -10, 12, 0] }}
                      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="650"
                      cy="550"
                      r="1.4"
                      fill="rgba(255,255,255,0.4)"
                      animate={{ x: [0, -6, 12, 0], y: [0, 8, -14, 0] }}
                      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <circle cx="210" cy="80" r="0.8" fill="rgba(255,255,255,0.18)" />
                    <circle cx="530" cy="690" r="1" fill="rgba(255,255,255,0.22)" />
                  </g>

                  {/* Inner ambient ring */}
                  <circle
                    cx="380"
                    cy="380"
                    r="314"
                    fill="none"
                    stroke="rgba(255,255,255,0.015)"
                    strokeWidth="1"
                  />

                  {/* Orbit System Rotating Group */}
                  <g
                    ref={rotatingGroupRef}
                    style={{
                      transform: "rotate(var(--orbit-rotation, 0deg))",
                      transformOrigin: "380px 380px",
                    }}
                  >
                    {/* Background Orbit Ring */}
                    <circle
                      cx="380"
                      cy="380"
                      r={orbitRadius}
                      fill="none"
                      stroke={
                        hoveredNode !== null ? "rgba(250,204,21,0.22)" : "rgba(255,255,255,0.08)"
                      }
                      strokeWidth="1.2"
                      strokeDasharray="4 10"
                      className="transition-all duration-500"
                    />

                    {/* Active dash path ring */}
                    <motion.circle
                      cx="380"
                      cy="380"
                      r={orbitRadius}
                      fill="none"
                      stroke="rgba(250,204,21,0.72)"
                      strokeWidth={isGlowPhase ? 3.5 : 2.5}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      animate={{
                        strokeDashoffset: progressOffset,
                        stroke: isGlowPhase ? "rgba(250,204,21,0.95)" : "rgba(250,204,21,0.72)",
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      transform="rotate(-90 380 380)"
                      filter="url(#orbitLineGlow)"
                    />

                    {/* Loop Step Nodes */}
                    {learningLoop.map((item, index) => (
                      <SvgLoopNode
                        key={item.title}
                        item={item}
                        index={index}
                        active={activeLoop === index}
                        isNext={nextLoop === index}
                        hoveredNode={hoveredNode}
                        activeLoop={activeLoop}
                        onOpen={() => setActiveLoop(index)}
                        onHoverStart={() => setHoveredNode(index)}
                        onHoverEnd={() => setHoveredNode(null)}
                        setRef={(el) => (nodesRef.current[index] = el)}
                      />
                    ))}
                  </g>

                  {/* Static Glowing Sun Core (Curiosity center: size 120-150px) */}
                  <motion.circle
                    cx="380"
                    cy="380"
                    fill="url(#sunGlow)"
                    animate={{
                      r: isGlowPhase ? sunOuterRadius * 1.15 : sunOuterRadius,
                      opacity: isGlowPhase ? 0.95 : 0.75 + sunIntensity * 0.2,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    filter="url(#sunCoreGlow)"
                  />
                  <motion.circle
                    cx="380"
                    cy="380"
                    animate={{ r: sunMiddleRadius }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    fill={`rgba(250,204,21,${0.08 + sunIntensity * 0.08})`}
                    stroke={`rgba(250,204,21,${0.25 + sunIntensity * 0.15})`}
                    strokeWidth="1.2"
                  />
                  <motion.circle
                    cx="380"
                    cy="380"
                    animate={{ r: sunCoreRadius }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    fill={`rgba(250,204,21,${0.12 + sunIntensity * 0.08})`}
                    stroke={`rgba(250,204,21,${0.35 + sunIntensity * 0.2})`}
                    strokeWidth="1.4"
                  />

                  {/* Sun core labels */}
                  <motion.text
                    key={`eyebrow-${centerEyebrow}`}
                    x="380"
                    y={336}
                    textAnchor="middle"
                    className="select-none fill-[#facc15]/80 font-mono text-[9px] font-bold uppercase tracking-[0.28em]"
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {centerEyebrow}
                  </motion.text>

                  <motion.text
                    key={`title-${centerTitle}`}
                    x="380"
                    y={378}
                    textAnchor="middle"
                    className="select-none fill-white font-syne text-[23px] font-black uppercase tracking-[-0.05em]"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {centerTitle}
                  </motion.text>

                  {centerSubtitleLines.map((line, index) => (
                    <motion.text
                      key={`${centerSubtitle}-${index}`}
                      x="380"
                      y={406 + index * 16}
                      textAnchor="middle"
                      className="select-none fill-white/60 font-mono text-[10px] font-medium uppercase tracking-[0.06em]"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      {line}
                    </motion.text>
                  ))}
                </svg>
              </motion.div>
            </div>

            {/* RIGHT ZONE: Details Glass Panel (clamp 420px to 540px, never overlaps) */}
            <div ref={rightPanelRef} className="w-full md:w-[460px] xl:w-auto flex justify-end shrink-0">
              <div className="w-full xl:w-[460px] xl:max-w-[480px]">
                <AnimatePresence mode="wait">
                  {activeItem ? (
                    <LoopDetailPanel
                      key={activeItem.title}
                      item={activeItem}
                      onReset={() => setActiveLoop(0)}
                    />
                  ) : (
                    <motion.article
                      key="default"
                      initial={{ opacity: 0, x: 20, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.98 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden rounded-[32px] border border-white/12 bg-black/35 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-between h-[520px] w-full"
                    >
                      {/* Decorative subtle background radial glow */}
                      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#facc15]/3 blur-3xl" />

                      <div className="relative">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
                            Starting Point
                          </span>
                          <button
                            type="button"
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-white/20 transition duration-300 cursor-not-allowed"
                            disabled
                          >
                            Reset
                          </button>
                        </div>

                        <h3 className="mt-5 font-syne text-4xl font-black uppercase tracking-[-0.06em] text-white">
                          Curiosity
                        </h3>

                        <div className="mt-5">
                          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#facc15]/60">Core Concept</span>
                          <p className="mt-1 text-lg font-bold leading-snug tracking-tight text-zinc-100">
                            Everything starts from curiosity.
                          </p>
                        </div>

                        <div className="mt-4">
                          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">Explanation</span>
                          <p className="mt-1 text-sm font-normal leading-relaxed text-zinc-400">
                            The loop starts when something feels interesting enough to build. That spark
                            becomes a project, and the project begins exposing the next stage. Scroll
                            down to watch the system build itself.
                          </p>
                        </div>
                      </div>

                      <div className="relative rounded-xl border border-white/5 bg-black/30 p-4 mt-auto">
                        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                          Operating Principle
                        </span>
                        <p className="mt-1 text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                          The closed operating loop never ends.
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-4 text-[9px] font-mono text-white/20">
                        <span>Starting state</span>
                        <span>00 / 07</span>
                      </div>
                    </motion.article>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE VIEW: Normal flow scrolling, vertical layout */}
      <div className="relative z-10 lg:hidden px-6 py-20 max-w-xl mx-auto flex flex-col gap-12">
        {/* Philosophy Typography */}
        <div className="select-none text-left">
          <h1 className="font-instrument text-[clamp(3rem,11vw,4.5rem)] font-light uppercase tracking-tight leading-[0.88] text-white">
            Ideas <br />
            <span className="opacity-50">Become</span> <br />
            Systems. <br />
            <span className="opacity-50">Systems</span> <br />
            Become <br />
            <span className="opacity-50">Proof.</span>
          </h1>
          <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
            The work is only the evidence.
          </p>
        </div>

        {/* Dynamic Accordion Cards */}
        <div className="grid gap-4 w-full">
          {learningLoop.map((step, index) => (
            <AccordionCard
              key={step.title}
              step={step}
              isOpen={mobileExpanded === index}
              onToggle={() => setMobileExpanded(mobileExpanded === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
