import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
const tableX = [-420, -140, 140, 420];
const tableY = [18, -26, -26, 18];
const tableRotateZ = [-6, -2, 2, 6];

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

function SplitFlipCard({ signal, index, onOpen, setCardRef, setInnerRef }) {
  const joinedRadius = index === 0 ? "32px 0 0 32px" : index === 3 ? "0 32px 32px 0" : "0px";

  return (
    <button
      ref={(node) => setCardRef(index, node)}
      type="button"
      onClick={onOpen}
      className="identity-card absolute left-1/2 top-1/2 border-0 bg-transparent p-0 text-left outline-none"
      style={{
        width: PANEL_WIDTH,
        height: POSTER_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: 1400,
        borderRadius: joinedRadius,
        pointerEvents: "none",
      }}
    >
      {index > 0 && (
        <div className="identity-seam pointer-events-none absolute left-0 top-[5%] z-50 h-[90%] w-px bg-white/30 opacity-0" />
      )}

      <div
        ref={(node) => setInnerRef(index, node)}
        className="identity-card-inner relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          borderRadius: joinedRadius,
        }}
      >
        <div
          className="identity-front absolute inset-0 overflow-hidden bg-[#070707] [backface-visibility:hidden]"
          style={{
            borderRadius: joinedRadius,
            backgroundImage: `url(${posterAsset})`,
            backgroundSize: `${POSTER_WIDTH}px ${POSTER_HEIGHT}px`,
            backgroundPosition: `-${index * PANEL_WIDTH}px 0px`,
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className="identity-back absolute inset-0 flex flex-col overflow-hidden bg-white/[0.065] text-white backdrop-blur-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ borderRadius: joinedRadius }}
        >
          <div className="h-[66%] border-b border-white/10">
            <ImageFrame {...signal} title={signal.title} />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.26em] text-white/38">
                {signal.number}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-white/45">
                Open
              </span>
            </div>
            <h3 className="mt-3 font-syne text-[clamp(1.45rem,2vw,2.1rem)] font-black uppercase leading-[0.84] tracking-[-0.085em] text-white">
              {signal.title}
            </h3>
            <p className="mt-3 text-sm font-black leading-snug tracking-[-0.05em] text-white/88">
              {signal.line}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

function DesktopIdentityArtifact({ onOpen }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const innersRef = useRef([]);

  const setCardRef = (index, node) => {
    if (node) cardsRef.current[index] = node;
  };

  const setInnerRef = (index, node) => {
    if (node) innersRef.current[index] = node;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const inners = innersRef.current.filter(Boolean);

    if (!section || !stage || cards.length !== 4 || inners.length !== 4) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      gsap.set(stage, {
        scale: 0.86,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      });

      cards.forEach((card, index) => {
        const joinedRadius = index === 0 ? "32px 0 0 32px" : index === 3 ? "0 32px 32px 0" : "0px";
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: joinedX[index],
          y: 0,
          rotateZ: 0,
          scale: 1,
          borderRadius: joinedRadius,
          pointerEvents: "none",
          zIndex: 20 + index,
          force3D: true,
        });
        gsap.set(inners[index], {
          rotateY: 0,
          borderRadius: joinedRadius,
          transformStyle: "preserve-3d",
          force3D: true,
        });
        gsap.set(card.querySelectorAll(".identity-front, .identity-back"), {
          borderRadius: joinedRadius,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          border: "1px solid rgba(255,255,255,0)",
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2600",
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(stage, { scale: 0.82, duration: 0.18 }, 0);

      tl.to(cards, {
        x: (index) => tableX[index],
        y: (index) => tableY[index],
        rotateZ: (index) => tableRotateZ[index],
        scale: 0.82,
        borderRadius: "28px",
        duration: 0.24,
        stagger: 0.015,
      }, 0.18);

      tl.to(cards.map((card) => card.querySelector(".identity-seam")).filter(Boolean), {
        opacity: 0.35,
        duration: 0.12,
      }, 0.2);

      tl.to(cards.map((card) => card.querySelectorAll(".identity-front, .identity-back")), {
        borderRadius: "28px",
        boxShadow: "0 32px 110px rgba(0,0,0,.62)",
        border: "1px solid rgba(255,255,255,.14)",
        duration: 0.24,
      }, 0.18);

      tl.to(inners, {
        rotateY: 180,
        duration: 0.26,
        stagger: 0.018,
      }, 0.43);

      tl.set(cards, { pointerEvents: "auto" }, 0.66);
      tl.to({}, { duration: 0.22 }, 0.68);
      tl.set(cards, { pointerEvents: "none" }, 0.86);

      tl.to(inners, {
        rotateY: 360,
        duration: 0.20,
        stagger: 0.012,
      }, 0.84);

      tl.to(cards, {
        x: (index) => joinedX[index],
        y: 0,
        rotateZ: 0,
        scale: 1,
        borderRadius: (index) => (index === 0 ? "32px 0 0 32px" : index === 3 ? "0 32px 32px 0" : "0px"),
        duration: 0.14,
      }, 0.94);

      tl.to(cards.map((card) => card.querySelector(".identity-seam")).filter(Boolean), {
        opacity: 0,
        duration: 0.08,
      }, 0.94);

      tl.to(cards.map((card) => card.querySelectorAll(".identity-front, .identity-back")), {
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        border: "1px solid rgba(255,255,255,0)",
        duration: 0.12,
      }, 0.94);

      tl.to(stage, { scale: 0.86, duration: 0.10 }, 0.94);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative hidden min-h-screen md:block">
      <div className="grid h-screen place-items-center overflow-visible">
        <div
          ref={stageRef}
          className="relative h-[620px] w-[1100px] origin-center"
          style={{ perspective: 1400, transformStyle: "preserve-3d" }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[42px] bg-white/[0.045] blur-[90px]" />
          {identitySignals.map((signal, index) => (
            <SplitFlipCard
              key={signal.title}
              signal={signal}
              index={index}
              onOpen={() => onOpen(index)}
              setCardRef={setCardRef}
              setInnerRef={setInnerRef}
            />
          ))}
        </div>
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
