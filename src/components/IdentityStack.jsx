import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, cubicBezier } from "framer-motion";

const asset = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;
const posterAsset = asset("identity-cinematic-poster.webp");

const identitySignals = [
  {
    number: "01",
    title: "Structure",
    line: "Standards before speed.",
    story:
      "Structure is the operating system beneath everything I build: showing up with seriousness, holding a standard, and doing the work before asking for outcomes.",
    origin: "Sainik School / NCC",
    compound: "Better standards",
    image: asset("identity-structure.webp"),
    alt: "Hemanth Sai in NCC uniform",
    objectPosition: "50% 30%",
  },
  {
    number: "02",
    title: "Discipline",
    line: "Practice before confidence.",
    story:
      "Discipline came from repetition, correction, fatigue, and the quiet work nobody applauds. Confidence is earned through return after return.",
    origin: "Karate / Training",
    compound: "Consistent execution",
    image: asset("identity-discipline.webp"),
    alt: "Karate training collage",
    objectPosition: "50% 22%",
  },
  {
    number: "03",
    title: "Voice",
    line: "Ideas need expression.",
    story:
      "Voice is the bridge between thinking and impact. A thought becomes useful when it can be communicated clearly enough to land and be remembered.",
    origin: "Public speaking / Stage",
    compound: "Clear communication",
    image: asset("identity-voice.webp"),
    alt: "Hemanth Sai speaking at a podium",
    objectPosition: "50% 28%",
  },
  {
    number: "04",
    title: "Builder Mode",
    line: "Visible work beats hidden potential.",
    story:
      "This is where the earlier signals become visible work: interfaces, systems, repos, projects, notes, demos, and proof that can survive feedback.",
    origin: "AI / Software / Product",
    compound: "Shippable artifacts",
    image: asset("identity-builder.webp"),
    alt: "Hemanth Sai working on a laptop",
    objectPosition: "50% 45%",
  },
];

const POSTER_WIDTH = 1100;
const POSTER_HEIGHT = 620;
const PANEL_WIDTH = POSTER_WIDTH / 4;

const joinedX = [-412.5, -137.5, 137.5, 412.5];
const tableX = [-220, -74, 74, 220];
const tableY = [0, -18, -18, 0];
const tableRotateZ = [-5.5, -1.5, 1.5, 5.5];

// Easing Curve Creators
const easeOutQuart = cubicBezier(0.25, 1, 0.5, 1);

// ==========================================
// SUBCOMPONENTS
// ==========================================

function ImageFrame({ src, alt, title, objectPosition }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      <img
        src={src}
        alt={alt}
        style={{ objectPosition }}
        className="h-full w-full object-cover brightness-100 contrast-105 saturate-[0.92]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.48)]" />
      <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
        {title}
      </span>
    </div>
  );
}

function SignalModal({ signal, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.96 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="grid max-h-[88svh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/20 bg-[#0c0c0c]/95 text-white shadow-[0_40px_160px_rgba(0,0,0,0.85)] md:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="min-h-[280px] overflow-hidden md:min-h-[580px]">
          <ImageFrame {...signal} title={signal.title} />
        </div>
        <div className="relative flex flex-col justify-center p-7 sm:p-10">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-xl text-white/70 transition hover:bg-white/15 hover:text-white"
            aria-label="Close identity signal"
          >
            ×
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
            {signal.number} / Identity signal
          </p>
          <h3 className="mt-5 font-syne text-[clamp(2.8rem,8vw,5.8rem)] font-black uppercase leading-[0.82] tracking-[-0.085em]">
            {signal.title}
          </h3>
          <p className="mt-5 text-2xl font-black leading-tight tracking-[-0.04em] text-white/90">
            {signal.line}
          </p>
          <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">
            {signal.story}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">Origin</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.1em] text-white/85">
                {signal.origin}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
                How it compounds
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.1em] text-white/85">
                {signal.compound}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function FloatingDust() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = 35;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1 - 0.04, // Slow upward drift
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-45"
    />
  );
}

/**
 * StickyStage: Centered viewport animation stage providing lighting, ambient glow, vignettes,
 * and canvas dust particles representing a museum exhibit setup. Holds exit fade/scale triggers.
 */
function StickyStage({ scrollYProgress, children }) {
  const stageScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.90, 1.00],
    [0.96, 1.0, 1.0, 0.96],
    { ease: [easeOutQuart, easeOutQuart, easeOutQuart] }
  );
  const stageOpacity = useTransform(
    scrollYProgress,
    [0, 0.90, 1.00],
    [1.0, 1.0, 0.0],
    { ease: [easeOutQuart, easeOutQuart] }
  );

  return (
    <motion.div
      className="sticky top-0 grid h-screen place-items-center overflow-hidden w-full bg-[#050505]"
      style={{ opacity: stageOpacity }}
    >
      {/* Museum Backdrop / Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060608] via-[#0b0b0d] to-[#040405]" />

      {/* Ambient Spotlight */}
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[65%] w-[75%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.06)_0%,transparent_70%)] blur-[80px]" />

      {/* Subtle Soft Glow Reflection */}
      <div className="pointer-events-none absolute left-1/2 bottom-[-15%] h-[50%] w-[85%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)] blur-[100px]" />

      {/* Floating Dust Particle Field */}
      <FloatingDust />

      {/* Museum Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

      {/* Center Stage Container */}
      <motion.div
        className="relative h-[min(68vh,620px)] w-[min(96vw,1100px)] origin-center"
        style={{
          scale: stageScale,
          perspective: 1400,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * SplitFlipCard: Renders one of the sliced vertical pieces of the cinematic poster.
 * Transitions between being a seamlessly touching poster slice and an elevated, flipped card.
 */
function SplitFlipCard({ signal, index, progress, onOpen }) {
  // 1. Derived scroll progress phases (0.0 to 1.0)
  const splitProgress = useTransform(progress, [0.15, 0.35], [0, 1]);
  const spreadProgress = useTransform(progress, [0.35, 0.55], [0, 1]);
  
  // Card-specific cascading flip start and end times
  const flipStart = 0.55 + index * 0.03;
  const flipEnd = flipStart + 0.11;
  const cardFlipProgress = useTransform(progress, [flipStart, flipEnd], [0, 1]);
  
  const mergeProgress = useTransform(progress, [0.90, 1.00], [0, 1]);

  // 2. Driven transforms computed from derived progress values
  
  // X translation (absolute position relative to stage center)
  const x = useTransform(
    [splitProgress, spreadProgress, mergeProgress],
    ([split, spread, merge]) => {
      const startX = joinedX[index];
      const midwayX = joinedX[index] + (tableX[index] - joinedX[index]) * 0.3;
      const targetX = startX + split * (midwayX - startX) + spread * (tableX[index] - midwayX);
      return targetX * (1 - merge) + startX * merge;
    }
  );

  // Y translation
  const y = useTransform(
    [splitProgress, spreadProgress, mergeProgress],
    ([split, spread, merge]) => {
      const startY = 0;
      const midwayY = tableY[index] * 0.3;
      const targetY = startY + split * (midwayY - startY) + spread * (tableY[index] - midwayY);
      return targetY * (1 - merge) + startY * merge;
    }
  );

  // Scale (animates from 1.0 to 0.78 during split & spread)
  const scale = useTransform(
    [splitProgress, spreadProgress, mergeProgress],
    ([split, spread, merge]) => {
      const startScale = 1.0;
      const midwayScale = 0.88;
      const targetScale = startScale + split * (midwayScale - startScale) + spread * (0.78 - midwayScale);
      return targetScale * (1 - merge) + startScale * merge;
    }
  );

  // Z elevation (creates physical depth)
  const z = useTransform(
    [splitProgress, mergeProgress],
    ([split, merge]) => {
      return 40 * split * (1 - merge);
    }
  );

  // Rotate Z (subtle fan-out tilt)
  const rotateZ = useTransform(
    [spreadProgress, mergeProgress],
    ([spread, merge]) => {
      const targetTilt = tableRotateZ[index];
      return targetTilt * spread * (1 - merge);
    }
  );

  // Rotate Y (flip from 0 to 180, then complete to 360 during merge)
  const rotateY = useTransform(
    [cardFlipProgress, mergeProgress],
    ([flip, merge]) => {
      const flippedRotation = flip * 180;
      const mergeRotation = merge * 180;
      return flippedRotation + mergeRotation;
    }
  );

  // Border radius (dynamically transitions corners)
  const radius = useTransform(
    [splitProgress, mergeProgress],
    ([split, merge]) => {
      const r1 = (index === 0) ? (32 - split * 8) : (split * 24);
      const r2 = (index === 3) ? (32 - split * 8) : (split * 24);
      const r3 = (index === 3) ? (32 - split * 8) : (split * 24);
      const r4 = (index === 0) ? (32 - split * 8) : (split * 24);
      
      const m1 = r1 * (1 - merge) + ((index === 0) ? merge * 32 : 0);
      const m2 = r2 * (1 - merge) + ((index === 3) ? merge * 32 : 0);
      const m3 = r3 * (1 - merge) + ((index === 3) ? merge * 32 : 0);
      const m4 = r4 * (1 - merge) + ((index === 0) ? merge * 32 : 0);
      
      return `${m1}px ${m2}px ${m3}px ${m4}px`;
    }
  );

  // Border Outline Opacity
  const border = useTransform(
    [splitProgress, mergeProgress],
    ([split, merge]) => {
      const opacity = split * 0.12 * (1 - merge);
      return `1px solid rgba(255, 255, 255, ${opacity})`;
    }
  );

  // Drop Shadow Blur and Opacity
  const shadow = useTransform(
    [splitProgress, mergeProgress],
    ([split, merge]) => {
      const shadowOpacity = split * 0.65 * (1 - merge);
      const blur = split * 80 * (1 - merge);
      const yOffset = split * 24 * (1 - merge);
      return `0 ${yOffset}px ${blur}px rgba(0, 0, 0, ${shadowOpacity})`;
    }
  );

  // Pointer Events (Active only during the Hold/Explore phase: 75% to 90%)
  const pointerEvents = useTransform(
    progress,
    (val) => (val >= 0.75 && val <= 0.90 ? "auto" : "none")
  );

  return (
    <motion.div
      className="absolute border-0 bg-transparent p-0 text-left outline-none"
      style={{
        left: "50%",
        top: "50%",
        width: PANEL_WIDTH,
        height: POSTER_HEIGHT,
        marginLeft: -PANEL_WIDTH / 2,
        marginTop: -POSTER_HEIGHT / 2,
        x,
        y,
        z,
        scale,
        rotateZ,
        pointerEvents,
        perspective: 1400,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Hover & Modal Activation Button wrapper */}
      <motion.button
        type="button"
        onClick={onOpen}
        className="w-full h-full text-left outline-none border-0 bg-transparent p-0 relative block cursor-pointer group"
        whileHover={{
          scale: 1.03,
          y: -10,
          transition: { duration: 0.28, ease: easeOutQuart },
        }}
        style={{
          transformStyle: "preserve-3d",
          borderRadius: radius,
        }}
      >
        {/* Flip rotation wrapper */}
        <motion.div
          className="relative h-full w-full"
          style={{
            rotateY,
            transformStyle: "preserve-3d",
            borderRadius: radius,
          }}
        >
          {/* Front Face: Poster Slice (0-15% is Poster Pause, touching seamlessly) */}
          <motion.div
            className="absolute inset-0 overflow-hidden bg-[#070707] [backface-visibility:hidden]"
            style={{
              borderRadius: radius,
              boxShadow: shadow,
              border,
              backgroundImage: `url(${posterAsset})`,
              backgroundSize: `${POSTER_WIDTH}px ${POSTER_HEIGHT}px`,
              backgroundPosition: `-${index * PANEL_WIDTH}px 0px`,
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Subtle reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.05] pointer-events-none rounded-[inherit]" />
          </motion.div>

          {/* Back Face: Content Card (Revealed after cascading Flip phase) */}
          <motion.div
            className="absolute inset-0 flex flex-col overflow-hidden bg-zinc-950/85 text-white backdrop-blur-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{
              borderRadius: radius,
              boxShadow: shadow,
              border,
            }}
          >
            {/* Ambient inner card vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

            {/* Shiny card reflection sheen (triggers on hover during Hold/Explore) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none z-10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
            />

            <div className="h-[64%] border-b border-white/10 overflow-hidden relative">
              <ImageFrame {...signal} title={signal.title} />
            </div>

            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 relative z-10">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.26em] text-white/35">
                  {signal.number}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-white/40 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  Open
                </span>
              </div>
              <div>
                <h3 className="font-syne text-[clamp(1.1rem,1.6vw,1.8rem)] font-black uppercase leading-none tracking-[-0.08em] text-white">
                  {signal.title}
                </h3>
                <p className="mt-2 text-xs font-bold leading-tight tracking-[-0.03em] text-white/80 line-clamp-2">
                  {signal.line}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

/**
 * FourCards: Container component holding and laying out the 4 vertical poster slices/cards.
 */
function FourCards({ scrollYProgress, onOpen }) {
  return (
    <div
      className="absolute inset-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      {identitySignals.map((signal, index) => (
        <SplitFlipCard
          key={signal.title}
          signal={signal}
          index={index}
          progress={scrollYProgress}
          onOpen={() => onOpen(index)}
        />
      ))}
    </div>
  );
}

function MobileIdentityFallback({ onOpen }) {
  return (
    <div className="px-5 py-14 md:hidden">
      <div className="mx-auto max-w-md">
        <div className="overflow-hidden rounded-[2rem] border border-white/14 bg-[#070707] shadow-[0_36px_120px_rgba(0,0,0,.58)]">
          <img src={posterAsset} alt="Hemanth Sai identity poster" className="w-full" />
        </div>
        <div className="mt-6 grid gap-4">
          {identitySignals.map((signal, index) => (
            <button
              key={signal.title}
              onClick={() => onOpen(index)}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] text-left"
            >
              <div className="h-44">
                <ImageFrame {...signal} title={signal.title} />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
                  {signal.number}
                </p>
                <h3 className="mt-3 font-syne text-2xl font-black uppercase tracking-[-0.06em]">
                  {signal.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{signal.line}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function IdentityStack() {
  const [activeSignal, setActiveSignal] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="identity"
      className="relative h-auto md:h-[180vh] bg-[#050505] text-white overflow-visible"
    >
      <StickyStage scrollYProgress={scrollYProgress}>
        <FourCards scrollYProgress={scrollYProgress} onOpen={setActiveSignal} />
      </StickyStage>
      <MobileIdentityFallback onOpen={setActiveSignal} />
      <AnimatePresence>
        {activeSignal !== null && (
          <SignalModal
            signal={identitySignals[activeSignal]}
            onClose={() => setActiveSignal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
