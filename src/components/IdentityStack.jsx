import React, { useRef, useState } from "react";
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

const joinedX = [-412.5, -137.5, 137.5, 412.5];
const tableX = [-390, -130, 130, 390];
const tableY = [0, -20, -20, 0];
const tableRotateZ = [-5.5, -1.5, 1.5, 5.5];

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-2xl"
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
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">{signal.number} / Identity signal</p>
          <h3 className="mt-5 font-syne text-[clamp(2.8rem,8vw,5.8rem)] font-black uppercase leading-[0.82] tracking-[-0.085em]">{signal.title}</h3>
          <p className="mt-5 text-2xl font-black leading-tight tracking-[-0.04em] text-white/90">{signal.line}</p>
          <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">{signal.story}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">Origin</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.1em] text-white/85">{signal.origin}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">How it compounds</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.1em] text-white/85">{signal.compound}</p>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function SplitFlipCard({ signal, index, progress, onOpen }) {
  const x = useTransform(
    progress,
    [0, 0.20, 0.45, 0.90, 1.0],
    [joinedX[index], joinedX[index], tableX[index], tableX[index], joinedX[index]]
  );
  const y = useTransform(
    progress,
    [0, 0.20, 0.45, 0.90, 1.0],
    [0, 0, tableY[index], tableY[index], 0]
  );
  const rotateZ = useTransform(
    progress,
    [0, 0.20, 0.45, 0.90, 1.0],
    [0, 0, tableRotateZ[index], tableRotateZ[index], 0]
  );
  const rotateY = useTransform(
    progress,
    [0, 0.45, 0.70, 0.90, 1.0],
    [0, 0, 180, 180, 360]
  );
  const scale = useTransform(
    progress,
    [0, 0.20, 0.45, 0.90, 1.0],
    [1, 1, 0.82, 0.82, 1]
  );
  const pointerEvents = useTransform(
    progress,
    (value) => (value > 0.60 && value < 0.90 ? "auto" : "none")
  );
  const joinedRadius = index === 0 ? "32px 0 0 32px" : index === 3 ? "0 32px 32px 0" : "0";
  const radius = useTransform(
    progress,
    [0, 0.20, 0.45, 0.90, 1.0],
    [joinedRadius, joinedRadius, "28px", "28px", joinedRadius]
  );
  const seamOpacity = useTransform(
    progress,
    [0, 0.20, 0.35, 0.90, 0.95, 1.0],
    [0, 0, 0.35, 0.35, 0, 0]
  );
  const border = useTransform(
    progress,
    [0, 0.20, 0.45, 0.90, 0.95, 1.0],
    ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,.14)", "1px solid rgba(255,255,255,.14)", "1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0)"]
  );
  const shadow = useTransform(
    progress,
    [0, 0.20, 0.45, 0.90, 0.95, 1.0],
    ["0 0 0 rgba(0,0,0,0)", "0 0 0 rgba(0,0,0,0)", "0 32px 110px rgba(0,0,0,.62)", "0 32px 110px rgba(0,0,0,.62)", "0 0 0 rgba(0,0,0,0)", "0 0 0 rgba(0,0,0,0)"]
  );

  const posterWidth = 1100;
  const posterHeight = 620;
  const panelWidth = posterWidth / 4;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="absolute left-1/2 top-1/2 border-0 bg-transparent p-0 text-left outline-none"
      style={{
        width: panelWidth,
        height: posterHeight,
        x,
        y,
        rotateZ,
        scale,
        pointerEvents,
        zIndex: 20 + index,
        perspective: 1400,
        transformStyle: "preserve-3d",
        translateX: "-50%",
        translateY: "-50%",
        borderRadius: radius,
      }}
    >
      {index > 0 && <motion.div className="pointer-events-none absolute left-0 top-[5%] z-50 h-[90%] w-px bg-white/30" style={{ opacity: seamOpacity }} />}
      <motion.div className="relative h-full w-full" style={{ rotateY, transformStyle: "preserve-3d", borderRadius: radius }}>
        <motion.div
          className="absolute inset-0 overflow-hidden bg-[#070707] [backface-visibility:hidden]"
          style={{
            borderRadius: radius,
            boxShadow: shadow,
            border,
            backgroundImage: `url(${posterAsset})`,
            backgroundSize: `${posterWidth}px ${posterHeight}px`,
            backgroundPosition: `-${index * panelWidth}px 0px`,
            backgroundRepeat: "no-repeat",
          }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col overflow-hidden bg-white/[0.065] text-white backdrop-blur-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ borderRadius: radius, boxShadow: shadow, border }}
        >
          <div className="h-[66%] border-b border-white/10">
            <ImageFrame {...signal} title={signal.title} />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.26em] text-white/38">{signal.number}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-white/45">Open</span>
            </div>
            <h3 className="mt-3 font-syne text-[clamp(1.45rem,2vw,2.1rem)] font-black uppercase leading-[0.84] tracking-[-0.085em] text-white">{signal.title}</h3>
            <p className="mt-3 text-sm font-black leading-snug tracking-[-0.05em] text-white/88">{signal.line}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

function DesktopIdentityArtifact({ onOpen }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const artifactScale = useTransform(scrollYProgress, [0, 0.45, 0.90, 1.0], [0.86, 0.82, 0.82, 0.86]);

  return (
    <div ref={ref} className="relative hidden h-[320vh] md:block">
      <div className="sticky top-0 grid h-screen place-items-center overflow-visible">
        <motion.div
          className="relative h-[620px] w-[1100px] origin-center"
          style={{ scale: artifactScale, perspective: 1400, transformStyle: "preserve-3d" }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[42px] bg-white/[0.045] blur-[90px]" />
          {identitySignals.map((signal, index) => (
            <SplitFlipCard key={signal.title} signal={signal} index={index} progress={scrollYProgress} onOpen={() => onOpen(index)} />
          ))}
        </motion.div>
      </div>
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
            <button key={signal.title} onClick={() => onOpen(index)} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] text-left">
              <div className="h-44"><ImageFrame {...signal} title={signal.title} /></div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{signal.number}</p>
                <h3 className="mt-3 font-syne text-2xl font-black uppercase tracking-[-0.06em]">{signal.title}</h3>
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

  return (
    <section id="identity" className="relative overflow-x-clip bg-[#070707] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,.07),transparent_34%),linear-gradient(180deg,#070707,#050505)]" />
      <DesktopIdentityArtifact onOpen={setActiveSignal} />
      <MobileIdentityFallback onOpen={setActiveSignal} />
      <AnimatePresence>{activeSignal !== null && <SignalModal signal={identitySignals[activeSignal]} onClose={() => setActiveSignal(null)} />}</AnimatePresence>
    </section>
  );
}
