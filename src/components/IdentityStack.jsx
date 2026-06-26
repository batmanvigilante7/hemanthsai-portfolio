import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Film, Palette, Zap } from "lucide-react";

const asset = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;
const posterAsset = asset("identity-cinematic-poster.webp");

const forces = [
  {
    number: "01",
    title: "Storyteller",
    icon: Film,
    image: asset("identity-voice.webp"),
    accent: "text-amber-300",
    line: "I turn moments into meaning. Words, visuals, and emotions that stay.",
  },
  {
    number: "02",
    title: "Builder",
    icon: Code2,
    image: asset("identity-builder.webp"),
    accent: "text-sky-300",
    line: "I build systems that solve real problems with clean code and logic.",
  },
  {
    number: "03",
    title: "Designer",
    icon: Palette,
    image: asset("identity-structure.webp"),
    accent: "text-emerald-300",
    line: "I design experiences that feel right and look timeless.",
  },
  {
    number: "04",
    title: "Disciplined",
    icon: Zap,
    image: asset("identity-discipline.webp"),
    accent: "text-yellow-300",
    line: "I show up. Every day. Consistent actions compound everything.",
  },
];

const joinedX = [-412.5, -137.5, 137.5, 412.5];
const splitX = [-390, -130, 130, 390];
const splitY = [-4, -42, -42, -4];
const splitRotate = [-4, -1.4, 1.4, 4];

function ScrollRail({ progress }) {
  const stage = useTransform(progress, (value) => {
    if (value < 0.34) return "01";
    if (value < 0.78) return "02";
    return "03";
  });

  const copy = useTransform(progress, (value) => {
    if (value < 0.34) return "Big card.\nOne identity.\nFull focus.";
    if (value < 0.78) return "Decomposed\ninto 4 parts.\n4 forces that\nbuild me.";
    return "Recomposed.\nStronger.\nWhole again.";
  });

  const dotY = useTransform(progress, [0, 0.5, 1], [0, 165, 330]);

  return (
    <aside className="pointer-events-none absolute left-6 top-1/2 z-30 hidden w-44 -translate-y-1/2 xl:block">
      <motion.p className="font-mono text-4xl font-black tracking-[-0.08em] text-white/90">{stage}</motion.p>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.32em] text-white/45">Scroll</p>
      <motion.p className="mt-10 whitespace-pre-line font-mono text-base leading-relaxed text-white/72">{copy}</motion.p>
      <div className="relative mt-8 h-[340px] w-px bg-white/12">
        <motion.div className="absolute -left-[3px] h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" style={{ y: dotY }} />
      </div>
    </aside>
  );
}

function PosterSlice({ index, progress }) {
  const x = useTransform(progress, [0, 0.18, 0.34, 0.46, 0.72, 0.86, 1], [joinedX[index], joinedX[index], splitX[index], splitX[index], splitX[index], joinedX[index], joinedX[index]]);
  const y = useTransform(progress, [0, 0.18, 0.34, 0.46, 0.72, 0.86, 1], [0, 0, splitY[index], splitY[index], splitY[index], 0, 0]);
  const rotateZ = useTransform(progress, [0, 0.18, 0.34, 0.46, 0.72, 0.86, 1], [0, 0, splitRotate[index], splitRotate[index], splitRotate[index], 0, 0]);
  const rotateY = useTransform(progress, [0, 0.36, 0.48, 0.72, 0.84, 1], [0, 0, 180, 180, 360, 360]);
  const scale = useTransform(progress, [0, 0.34, 0.48, 0.72, 0.86, 1], [1, 0.94, 0.92, 0.92, 1, 1]);
  const opacity = useTransform(progress, [0, 0.12, 0.46, 0.72, 0.95, 1], [1, 1, 1, 1, 1, 1]);
  const radius = useTransform(
    progress,
    [0, 0.18, 0.34, 0.72, 0.86, 1],
    [index === 0 ? "24px 0 0 24px" : index === 3 ? "0 24px 24px 0" : "0px", index === 0 ? "24px 0 0 24px" : index === 3 ? "0 24px 24px 0" : "0px", "22px", "22px", index === 0 ? "24px 0 0 24px" : index === 3 ? "0 24px 24px 0" : "0px", index === 0 ? "24px 0 0 24px" : index === 3 ? "0 24px 24px 0" : "0px"]
  );
  const seamOpacity = useTransform(progress, [0, 0.16, 0.34, 0.72, 0.9, 1], [0.18, 0.18, 0.55, 0.55, 0.18, 0.18]);
  const shadow = useTransform(progress, [0, 0.34, 0.48, 0.72, 0.86, 1], ["0 28px 90px rgba(0,0,0,.48)", "0 48px 120px rgba(0,0,0,.62)", "0 40px 100px rgba(0,0,0,.58)", "0 40px 100px rgba(0,0,0,.58)", "0 28px 90px rgba(0,0,0,.48)", "0 28px 90px rgba(0,0,0,.48)"]);

  const posterWidth = 1100;
  const posterHeight = 360;
  const panelWidth = posterWidth / 4;
  const force = forces[index];
  const Icon = force.icon;

  return (
    <motion.button
      type="button"
      className="absolute left-1/2 top-1/2 border-0 bg-transparent p-0 text-left outline-none"
      style={{ width: panelWidth, height: posterHeight, x, y, rotateZ, opacity, scale, translateX: "-50%", translateY: "-50%", perspective: 1400, transformStyle: "preserve-3d", borderRadius: radius, zIndex: 20 + index }}
    >
      {index > 0 && <motion.div className="pointer-events-none absolute left-0 top-[8%] z-50 h-[84%] w-px bg-white/30" style={{ opacity: seamOpacity }} />}
      <motion.div className="relative h-full w-full" style={{ rotateY, transformStyle: "preserve-3d", borderRadius: radius }}>
        <motion.div
          className="absolute inset-0 overflow-hidden border border-white/15 bg-[#070707] [backface-visibility:hidden]"
          style={{ borderRadius: radius, boxShadow: shadow, backgroundImage: `url(${posterAsset})`, backgroundSize: `${posterWidth}px ${posterHeight}px`, backgroundPosition: `-${index * panelWidth}px center`, backgroundRepeat: "no-repeat" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/30" />
        </motion.div>

        <motion.article
          className="absolute inset-0 flex flex-col overflow-hidden border border-white/15 bg-white/[0.06] text-white shadow-2xl backdrop-blur-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ borderRadius: radius, boxShadow: shadow }}
        >
          <div className="relative h-[58%] overflow-hidden border-b border-white/10">
            <img src={force.image} alt="" className="h-full w-full object-cover opacity-90 brightness-75 contrast-125 saturate-[0.85]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-md">
              <Icon className={`h-4 w-4 ${force.accent}`} />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{force.number}</p>
              <h3 className="mt-3 font-syne text-xl font-black uppercase leading-none tracking-[-0.06em] text-white">{force.title}</h3>
            </div>
            <p className="font-mono text-[12px] leading-relaxed text-white/68">{force.line}</p>
          </div>
        </motion.article>
      </motion.div>
    </motion.button>
  );
}

function FloatingShards({ progress }) {
  const opacity = useTransform(progress, [0.18, 0.34, 0.72, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0.18, 0.34, 0.72, 0.9], [0.7, 1, 1, 0.7]);

  return (
    <motion.div className="pointer-events-none absolute inset-0 z-10 hidden md:block" style={{ opacity, scale }}>
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="absolute block rounded-sm border border-white/25 bg-white/[0.025] shadow-[0_0_18px_rgba(255,255,255,0.10)]"
          style={{
            width: `${8 + (index % 4) * 5}px`,
            height: `${12 + (index % 3) * 7}px`,
            left: `${14 + ((index * 17) % 74)}%`,
            top: `${23 + ((index * 11) % 48)}%`,
            transform: `rotate(${(index * 29) % 120}deg)`,
          }}
        />
      ))}
    </motion.div>
  );
}

function DesktopArtifact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const captionOpacity = useTransform(scrollYProgress, [0.7, 0.86, 1], [0, 0.45, 1]);

  return (
    <div ref={ref} className="relative hidden min-h-[360vh] overflow-visible md:block">
      <div className="sticky top-0 h-screen overflow-hidden">
        <ScrollRail progress={scrollYProgress} />
        <FloatingShards progress={scrollYProgress} />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.07),transparent_34%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.055),transparent_44%)]" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[1100px] max-w-[72vw] -translate-x-1/2 -translate-y-1/2" style={{ perspective: 1600, transformStyle: "preserve-3d" }}>
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[36px] bg-white/[0.04] blur-[70px]" />
          {forces.map((force, index) => (
            <PosterSlice key={force.title} index={index} progress={scrollYProgress} />
          ))}
        </div>

        <motion.p className="absolute bottom-9 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.58em] text-white/35" style={{ opacity: captionOpacity }}>
          One identity. Four forces. Endless building.
        </motion.p>
      </div>
    </div>
  );
}

function MobileArtifact() {
  return (
    <div className="px-5 py-16 md:hidden">
      <div className="mx-auto max-w-md">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-amber-300">Identity Artifact</p>
        <h2 className="font-syne text-[clamp(2.7rem,15vw,4.4rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-white">
          Learning by building.
        </h2>
        <p className="mt-5 font-outfit text-base leading-relaxed text-white/64">
          One identity decomposes into four forces: storyteller, builder, designer, and disciplined execution.
        </p>
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/14 bg-[#070707] shadow-[0_44px_170px_rgba(0,0,0,0.62)]">
          <img src={posterAsset} alt="Learning by building identity poster" className="w-full" />
        </div>
        <div className="mt-6 grid gap-4">
          {forces.map((force) => {
            const Icon = force.icon;
            return (
              <article key={force.title} className="overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                <div className="relative h-44 overflow-hidden border-b border-white/10">
                  <img src={force.image} alt="" className="h-full w-full object-cover opacity-90 brightness-75 contrast-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <Icon className={`absolute bottom-4 left-4 h-5 w-5 ${force.accent}`} />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{force.number}</p>
                  <h3 className="mt-3 font-syne text-2xl font-black uppercase leading-none tracking-[-0.06em] text-white">{force.title}</h3>
                  <p className="mt-4 font-mono text-sm leading-relaxed text-white/64">{force.line}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function IdentityStack() {
  return (
    <section id="identity" className="relative overflow-x-clip bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(255,255,255,.075),transparent_30%),radial-gradient(circle_at_88%_54%,rgba(250,204,21,.07),transparent_34%),linear-gradient(180deg,#050505,#050505)]" />
      <DesktopArtifact />
      <MobileArtifact />
    </section>
  );
}
