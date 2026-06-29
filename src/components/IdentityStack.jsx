import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

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
const sliceX = [-475, -160, 160, 475];

const cardPositions = [
  { x: -205, y: -125, r: -3 },
  { x: 205, y: -125, r: 3 },
  { x: -205, y: 125, r: 2.5 },
  { x: 205, y: 125, r: -2.5 },
];

function ImageFrame({ src, alt, title, objectPosition }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      <img
        src={src}
        alt={alt}
        style={{ objectPosition }}
        className="h-full w-full object-cover brightness-100 contrast-105 saturate-[0.92] transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.48)]" />
      <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
        {title}
      </span>
    </div>
  );
}

function SignalModal({ signal, onClose }) {
  useEffect(() => {
    const closeOnKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", closeOnKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
            type="button"
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
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
                Origin
              </p>
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
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.offsetWidth || window.innerWidth;
      canvas.height = parent?.offsetHeight || window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 34 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.3 + 0.25,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1 - 0.03,
      opacity: Math.random() * 0.26 + 0.04,
    }));

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-40" />;
}

function StickyStage({ scrollYProgress, children }) {
  const stageScale = useTransform(
    scrollYProgress,
    [0, 0.16, 0.78, 0.92, 1],
    [0.78, 0.78, 0.82, 0.78, 0.78]
  );

  return (
    <div className="sticky top-0 grid h-screen w-full place-items-center overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060608] via-[#0b0b0d] to-[#040405]" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[65%] w-[75%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.065)_0%,transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute left-1/2 bottom-[-15%] h-[50%] w-[85%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_0%,transparent_60%)] blur-[100px]" />
      <FloatingDust />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.86)_100%)]" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[620px] w-[1100px] origin-center"
        style={{
          x: "-50%",
          y: "-50%",
          scale: stageScale,
          perspective: 1400,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function PosterSlicePiece({ index, progress }) {
  const opacity = useTransform(progress, [0, 0.22, 0.34, 0.76, 0.9, 1], [1, 1, 0, 0, 1, 1]);
  const x = useTransform(progress, [0, 0.1, 0.26, 0.76, 0.9, 1], [joinedX[index], joinedX[index], sliceX[index], sliceX[index], joinedX[index], joinedX[index]]);
  const rotateZ = useTransform(progress, [0, 0.1, 0.26, 0.76, 0.9, 1], [0, 0, index < 2 ? -1.5 : 1.5, index < 2 ? -1.5 : 1.5, 0, 0]);
  const radius = index === 0 ? "32px 0 0 32px" : index === 3 ? "0 32px 32px 0" : "0";

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 overflow-hidden bg-[#070707]"
      style={{
        width: PANEL_WIDTH,
        height: POSTER_HEIGHT,
        x,
        y: 0,
        opacity,
        rotateZ,
        translateX: "-50%",
        translateY: "-50%",
        borderRadius: radius,
        backgroundImage: `url(${posterAsset})`,
        backgroundSize: `${POSTER_WIDTH}px ${POSTER_HEIGHT}px`,
        backgroundPosition: `-${index * PANEL_WIDTH}px 0px`,
        backgroundRepeat: "no-repeat",
        pointerEvents: "none",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
    </motion.div>
  );
}

function RealIdentityCard({ signal, index, progress, onOpen }) {
  const pos = cardPositions[index];

  const opacity = useTransform(progress, [0, 0.28, 0.4, 0.75, 0.88, 1], [0, 0, 1, 1, 0, 0]);
  const x = useTransform(progress, [0, 0.28, 0.42, 0.75, 0.88, 1], [joinedX[index] * 0.28, joinedX[index] * 0.28, pos.x, pos.x, joinedX[index] * 0.28, joinedX[index] * 0.28]);
  const y = useTransform(progress, [0, 0.28, 0.42, 0.75, 0.88, 1], [0, 0, pos.y, pos.y, 0, 0]);
  const scale = useTransform(progress, [0, 0.28, 0.42, 0.75, 0.88, 1], [0.7, 0.7, 1, 1, 0.7, 0.7]);
  const rotateZ = useTransform(progress, [0, 0.28, 0.42, 0.75, 0.88, 1], [0, 0, pos.r, pos.r, 0, 0]);
  const rotateY = useTransform(progress, [0, 0.32, 0.48, 0.75, 0.88, 1], [70, 70, 0, 0, 70, 70]);
  const z = useTransform(progress, [0, 0.28, 0.42, 0.75, 0.88, 1], [0, 0, 55, 55, 0, 0]);
  const pointerEvents = useTransform(progress, (value) => (value > 0.48 && value < 0.75 ? "auto" : "none"));

  const shadow = useTransform(
    progress,
    [0, 0.3, 0.45, 0.75, 0.88, 1],
    [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 26px 80px rgba(0,0,0,0.68)",
      "0px 26px 80px rgba(0,0,0,0.68)",
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 0px 0px rgba(0,0,0,0)",
    ]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 340,
        height: 210,
        x,
        y,
        z,
        scale,
        rotateZ,
        rotateY,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
        transformStyle: "preserve-3d",
        pointerEvents,
      }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        className="group relative flex h-full w-full cursor-pointer items-center gap-4 overflow-hidden rounded-[24px] border border-white/[0.10] bg-zinc-950/80 p-4 text-left text-white outline-none backdrop-blur-2xl"
        whileHover={{
          scale: 1.035,
          y: -8,
          borderColor: "rgba(255,255,255,0.18)",
          transition: { duration: 0.24, ease: [0.25, 1, 0.5, 1] },
        }}
        style={{ boxShadow: shadow }}
      >
        <div className="relative h-[172px] w-[108px] flex-shrink-0 overflow-hidden rounded-[16px] border border-white/5 bg-zinc-900">
          <img
            src={signal.image}
            alt={signal.alt}
            style={{ objectPosition: signal.objectPosition }}
            className="h-full w-full object-cover brightness-95 saturate-[0.9] transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </div>

        <div className="pointer-events-none flex h-[172px] flex-1 flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-syne text-[20px] font-black uppercase leading-none tracking-[-0.045em] text-white/90 transition-colors duration-300 group-hover:text-[#d4a373]">
              {signal.title}
            </h3>
            <span className="font-mono text-[10px] font-bold tracking-wider text-white/30">
              {signal.number}
            </span>
          </div>

          <p className="text-[13px] font-semibold leading-snug text-white/64">
            {signal.line}
          </p>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#d4a373]/90">
              {signal.origin}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/30 transition-colors group-hover:text-white/50">
              {signal.compound}
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function FourCards({ scrollYProgress, onOpen }) {
  return (
    <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
      {identitySignals.map((signal, index) => (
        <PosterSlicePiece key={`slice-${signal.title}`} index={index} progress={scrollYProgress} />
      ))}

      {identitySignals.map((signal, index) => (
        <RealIdentityCard
          key={`card-${signal.title}`}
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
              type="button"
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
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section id="identity" className="overflow-visible bg-[#050505] text-white">
      <div ref={ref} className="relative hidden min-h-[175vh] md:block">
        <StickyStage scrollYProgress={scrollYProgress}>
          <FourCards scrollYProgress={scrollYProgress} onOpen={setActiveSignal} />
        </StickyStage>
      </div>

      <MobileIdentityFallback onOpen={setActiveSignal} />

      <AnimatePresence>
        {activeSignal !== null && (
          <SignalModal signal={identitySignals[activeSignal]} onClose={() => setActiveSignal(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
