import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const asset = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;
const posterAsset = asset("identity-cinematic-poster.webp");

const identitySignals = [
  {
    number: "01",
    title: "Structure",
    line: "Standards before speed.",
    text: "Structured environments taught me accountability, presence, and the value of carrying myself with seriousness before chasing outcomes.",
    story: "Structure is the part of me that came before ambition. It is the habit of respecting routines, showing up with presence, and understanding that standards are not decoration — they are the operating system. This signal connects Sainik School, NCC, and every environment that taught me to take myself seriously before asking the world to do the same.",
    origin: "Sainik School / NCC",
    compound: "Better standards",
    image: asset("identity-structure.webp"),
    alt: "Hemanth Sai in NCC uniform on horseback",
    objectPosition: "50% 30%"
  },
  {
    number: "02",
    title: "Discipline",
    line: "Practice before confidence.",
    text: "Karate taught me repetition, body control, discomfort, and the quiet confidence that comes from doing hard things before anyone is watching.",
    story: "Discipline is not a motivational quote for me. It is physical. It came from repetition, training, correction, fatigue, and the silent work nobody claps for. Karate made confidence feel earned, not borrowed. That same pattern now moves into learning, coding, design, and building — repeat, refine, sharpen, return.",
    origin: "Karate / Training",
    compound: "Consistent execution",
    image: asset("identity-discipline.webp"),
    alt: "Karate training collage from Hemanth Sai’s early years",
    objectPosition: "50% 22%"
  },
  {
    number: "03",
    title: "Voice",
    line: "Ideas need expression.",
    text: "Speaking taught me that clarity is power. A thought becomes more useful when it can be communicated, understood, and remembered.",
    story: "Voice is the bridge between thinking and impact. Public speaking trained me to hold an idea in front of people and make it clear enough to land. This matters because building is not only about making things; it is also about explaining why they matter, what they change, and why someone should care.",
    origin: "Public speaking / Stage",
    compound: "Clear communication",
    image: asset("identity-voice.webp"),
    alt: "Hemanth Sai speaking at a podium",
    objectPosition: "50% 28%"
  },
  {
    number: "04",
    title: "Builder Mode",
    line: "Visible work beats hidden potential.",
    text: "Now the same pattern moves into technology: turning curiosity into projects, systems, pages, notes, prototypes, and proof that can be seen and improved.",
    story: "Builder Mode is where all the earlier signals become visible. Structure gives the base, discipline keeps the rhythm, voice explains the work, and technology becomes the arena. I am learning to convert curiosity into artifacts: interfaces, repos, systems, notes, demos, case studies, and products that can survive feedback.",
    origin: "AI / Software / Product",
    compound: "Shippable artifacts",
    image: asset("identity-builder.webp"),
    alt: "Hemanth Sai working on a laptop",
    objectPosition: "50% 45%"
  }
];

function FadeIn({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageFrame({ src, alt, label, className = "", imgStyle }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`noise group relative overflow-hidden bg-white/[0.04] ${className}`}>
      {!broken ? (
        <img
          src={src}
          alt={alt}
          onError={() => setBroken(true)}
          loading="lazy"
          style={imgStyle}
          className="h-full w-full object-cover brightness-100 contrast-105 saturate-[0.92] transition-transform duration-1000 group-hover:scale-[1.035]"
        />
      ) : (
        <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-[linear-gradient(135deg,#171717,#050505)] px-5 text-center">
          <span className="rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.35em] text-white/55">
            {label}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.38))]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

function IdentitySignalModal({ signal, onClose }) {
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
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 34, scale: 0.94, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 34, scale: 0.94, filter: "blur(10px)" }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="noise relative grid max-h-[88svh] w-full max-w-6xl overflow-y-auto rounded-[2.25rem] border border-white/25 bg-white/[0.12] text-white shadow-[0_44px_180px_rgba(0,0,0,0.78)] backdrop-blur-3xl md:grid-cols-[0.92fr_1.08fr] md:rounded-[3.5rem]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.055)_34%,rgba(141,162,255,0.10)_68%,rgba(255,255,255,0.08))]" />
        
        <div className="relative min-h-[260px] p-3 md:min-h-[620px] md:p-4">
          <ImageFrame
            src={signal.image}
            alt={signal.alt}
            label={signal.title}
            className="h-full min-h-[260px] rounded-[1.75rem] border border-white/12 md:min-h-[590px] md:rounded-[3rem]"
            imgStyle={{ objectPosition: signal.objectPosition }}
          />
        </div>

        <div className="relative flex flex-col justify-center p-6 sm:p-8 md:p-12 text-left">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.10] p-0 text-white/72 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close identity signal"
          >
            <span className="block -translate-y-[1px] text-[30px] font-extralight leading-none">
              &times;
            </span>
          </button>
          
          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/44">
            {signal.number} / Identity Signal
          </p>
          <h3 className="mt-5 pr-14 text-[clamp(2.7rem,11vw,6.8rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-white">
            {signal.title}
          </h3>
          <p className="mt-6 max-w-2xl text-2xl font-black leading-tight tracking-[-0.055em] text-white/90 sm:text-3xl">
            {signal.line}
          </p>
          <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/68 sm:text-lg">
            {signal.story}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/14 bg-white/[0.08] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">Origin</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/78">
                {signal.origin}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/14 bg-black/20 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">How it compounds</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/78">
                {signal.compound}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

const joinedX = [-412.5, -137.5, 137.5, 412.5];
const tableX = [-360, -120, 120, 360];
const tableY = [-18, -86, -86, -18];
const tableRotateZ = [-7.5, -2, 2, 7.5];

function SplitFlipCard({ signal, index, progress, onOpen }) {
  const x = useTransform(progress, [0, 0.28, 0.36, 0.50, 0.78, 0.86, 0.96, 1], [joinedX[index], joinedX[index], joinedX[index], tableX[index], tableX[index], tableX[index], joinedX[index], joinedX[index]]);
  const openSafeY = 72;
  const y = useTransform(progress, [0, 0.28, 0.36, 0.50, 0.78, 0.86, 0.96, 1], [0, 0, 0, tableY[index] + openSafeY, tableY[index] + openSafeY, tableY[index] + openSafeY, 0, 0]);
  const rotateZ = useTransform(progress, [0, 0.28, 0.36, 0.50, 0.78, 0.86, 0.96, 1], [0, 0, 0, tableRotateZ[index], tableRotateZ[index], tableRotateZ[index], 0, 0]);
  const rotateY = useTransform(progress, [0, 0.50, 0.58, 0.78, 0.86, 1], [0, 0, 180, 180, 360, 360]);
  const scale = useTransform(progress, [0, 0.50, 0.78, 1], [1, 0.94, 0.94, 1]);
  const pointerEvents = useTransform(progress, (value) => value > 0.58 && value < 0.78 ? "auto" : "none");

  const joinedRadius = index === 0 ? "32px 0px 0px 32px" : index === 3 ? "0px 32px 32px 0px" : "0px 0px 0px 0px";
  const radius = useTransform(progress, [0, 0.36, 0.50, 0.86, 0.96, 1], [joinedRadius, joinedRadius, "32px 32px 32px 32px", "32px 32px 32px 32px", joinedRadius, joinedRadius]);
  const seamOpacity = useTransform(progress, [0, 0.28, 0.36, 0.86, 0.96, 1], [0, 0, 0.45, 0.45, 0, 0]);
  const border = useTransform(progress, [0, 0.36, 0.50, 0.86, 0.96, 1], ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.14)", "1px solid rgba(255, 255, 255, 0.14)", "1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0)"]);
  const backBorder = useTransform(progress, [0, 0.36, 0.50, 0.86, 0.96, 1], ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.12)", "1px solid rgba(255, 255, 255, 0.12)", "1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0)"]);
  const shadow = useTransform(progress, [0, 0.36, 0.50, 0.86, 0.96, 1], ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 0px rgba(0,0,0,0)", "0px 38px 130px rgba(0,0,0,0.62)", "0px 38px 130px rgba(0,0,0,0.62)", "0px 0px 0px rgba(0,0,0,0)", "0px 0px 0px rgba(0,0,0,0)"]);

  const posterWidth = 1100;
  const posterHeight = 620;
  const panelWidth = posterWidth / 4;
  const panelHeight = posterHeight;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="absolute left-1/2 top-1/2 border-0 bg-transparent p-0 text-left outline-none"
      style={{
        width: panelWidth,
        height: panelHeight,
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
        borderRadius: radius
      }}
    >
      {index > 0 && (
        <motion.div
          className="pointer-events-none absolute left-0 top-[5%] z-50 h-[90%] w-px bg-white/30"
          style={{ opacity: seamOpacity }}
        />
      )}
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
            backgroundRepeat: "no-repeat"
          }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col overflow-hidden bg-white/[0.065] text-white backdrop-blur-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            borderRadius: radius,
            boxShadow: shadow,
            border: backBorder
          }}
        >
          <ImageFrame
            src={signal.image}
            alt={signal.alt}
            label={signal.title}
            className="h-[66%] border-b border-white/10"
            imgStyle={{ objectPosition: signal.objectPosition }}
          />
          <div className="relative flex flex-1 flex-col p-4 text-left">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.26em] text-white/38">{signal.number}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.16em] text-white/45">Open</span>
            </div>
            <h3 className="mt-3 text-[clamp(1.45rem,2vw,2.1rem)] font-black uppercase leading-[0.84] tracking-[-0.085em] text-white">
              {signal.title}
            </h3>
            <p className="mt-3 text-sm font-black leading-snug tracking-[-0.05em] text-white/88">
              {signal.line}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

function CinematicSplitIntroCard({ mobile = false, onOpen }) {
  if (mobile) {
    return (
      <FadeIn>
        <div>
          <h3 className="mb-5 max-w-5xl text-[clamp(2.15rem,13vw,3.8rem)] font-black uppercase leading-[0.82] tracking-[-0.095em] text-white">
            Before the builder,<br />there was the pattern.
          </h3>
          <div className="noise relative overflow-hidden rounded-[2rem] border border-white/14 bg-[#070707] shadow-[0_44px_170px_rgba(0,0,0,0.62)]">
            <img
              src={posterAsset}
              alt="Before the builder, there was the pattern. The origin before the output."
              className="w-full"
            />
          </div>
        </div>
      </FadeIn>
    );
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 20%", "end end"] });

  // Subtle scroll-based stage scale to let the component breathe and zoom during flips
  const stageScale = useTransform(
    scrollYProgress,
    [0.00, 0.28, 0.50, 0.78, 0.86, 0.96, 1.00],
    [0.68, 0.68, 0.72, 0.76, 0.76, 0.68, 0.68]
  );

  return (
    <div ref={ref} className="relative hidden min-h-[300vh] md:block">
      <div className="sticky top-0 grid h-screen place-items-center overflow-visible">
        <motion.div
          className="relative h-[min(64vh,620px)] w-[min(92vw,1100px)]"
          style={{ 
            perspective: 1400, 
            transformStyle: "preserve-3d",
            scale: stageScale 
          }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-white/[0.045] blur-[90px]" />
          {identitySignals.map((signal, index) => (
            <SplitFlipCard
              key={signal.title}
              signal={signal}
              index={index}
              progress={scrollYProgress}
              onOpen={() => onOpen?.(index)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function MobileStackCard({ signal, index, progress, onOpen }) {
  const targetScale = Math.max(0.84, 1 - (identitySignals.length - index - 1) * 0.045);
  const scale = useTransform(progress, [index * 0.22, 1], [1, targetScale]);
  const y = useTransform(progress, [index * 0.22, 1], [0, -index * 10]);

  return (
    <div className="sticky top-20 flex min-h-[82svh] items-start justify-center py-3">
      <motion.button
        type="button"
        onClick={onOpen}
        style={{ scale, y, top: `calc(${index * 14}px)` }}
        className="relative flex w-full max-w-md origin-top flex-col overflow-hidden rounded-[1.65rem] border border-white/12 bg-white/[0.06] text-left text-white shadow-[0_28px_100px_rgba(0,0,0,0.42)] backdrop-blur-3xl"
      >
        <ImageFrame
          src={signal.image}
          alt={signal.alt}
          label={signal.title}
          className="aspect-[4/3] border-b border-white/10"
          imgStyle={{ objectPosition: signal.objectPosition }}
        />
        <div className="relative p-4 text-left">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.26em] text-white/38">
              {signal.number}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.16em] text-white/45">
              Open
            </span>
          </div>
          <h3 className="mt-5 text-[clamp(2.05rem,12vw,3.2rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-white">
            {signal.title}
          </h3>
          <p className="mt-4 text-base font-black leading-snug tracking-[-0.05em] text-white/88">
            {signal.line}
          </p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-white/58">
            {signal.text}
          </p>
        </div>
      </motion.button>
    </div>
  );
}

function MobileStickyStack({ onOpen }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative px-5 py-16 md:hidden">
      <div className="mx-auto max-w-md">
        <FadeIn>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-white/45">
            Identity
          </p>
          <h2 className="text-[clamp(2.7rem,15vw,4.4rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-white">
            The pattern behind the proof.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-white/70">
            Before I became interested in AI, software, and product building, I was shaped by structure, discipline, voice, and execution.
          </p>
        </FadeIn>
        <div className="mt-10">
          <CinematicSplitIntroCard mobile />
        </div>
        <div className="mt-8 pb-[70svh]">
          {identitySignals.map((signal, index) => (
            <MobileStackCard
              key={signal.title}
              signal={signal}
              index={index}
              progress={scrollYProgress}
              onOpen={() => onOpen(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopIdentityShowcase({ onOpen }) {
  return (
    <div className="relative hidden px-5 py-10 sm:px-8 sm:py-14 md:block md:px-10">
      <div className="relative mx-auto max-w-[1680px]">
        <FadeIn>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-white/45">
            Identity
          </p>
          <h2 className="max-w-6xl text-[clamp(2.7rem,9.2vw,6rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-white">
            The pattern behind the proof.
          </h2>
          <p className="mt-5 max-w-4xl text-xl font-light leading-relaxed text-white/72">
            Before I became interested in AI, software, and product building, I was shaped by structure, discipline, voice, and execution.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/56">
            The environments changed — training grounds, uniforms, stages, classrooms, and laptops — but the pattern stayed the same: learn under pressure, communicate with clarity, and turn intent into visible work.
          </p>
        </FadeIn>
        <div className="mt-6">
          <CinematicSplitIntroCard onOpen={onOpen} />
        </div>
      </div>
    </div>
  );
}

export default function IdentityStack() {
  const [activeSignal, setActiveSignal] = useState(null);

  return (
    <section id="identity" className="relative overflow-x-clip bg-[#070707] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,.075),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(141,162,255,.10),transparent_30%),linear-gradient(180deg,#070707,#050505)] pointer-events-none" />
      <DesktopIdentityShowcase onOpen={setActiveSignal} />
      <MobileStickyStack onOpen={setActiveSignal} />
      <AnimatePresence>
        {activeSignal !== null && (
          <IdentitySignalModal
            signal={identitySignals[activeSignal]}
            onClose={() => setActiveSignal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
