import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const learningLoop = [
  {
    number: "01",
    title: "Project",
    belief: "Projects turn curiosity into direction.",
    story: "Every journey begins with a question that refuses to leave you alone. I build projects to explore the unknown and give shape to the first version of an idea.",
    principle: "Build first. Clarity follows.",
  },
  {
    number: "02",
    title: "Problem",
    belief: "Work reveals friction.",
    story: "Once the project begins, the vague idea meets reality. Bugs, unclear structure, weak design, and missing logic reveal the real problem that needs attention.",
    principle: "The problem chooses the lesson.",
  },
  {
    number: "03",
    title: "Skill",
    belief: "Friction demands skill.",
    story: "The problem decides what I need to learn next. Instead of collecting random theory, I build the skill that removes the friction in front of me.",
    principle: "Learn what removes friction.",
  },
  {
    number: "04",
    title: "Artifact",
    belief: "Skill becomes proof.",
    story: "A skill becomes valuable when it leaves my head. It turns into a page, prototype, repo, note, demo, case study, or system that can be seen and improved.",
    principle: "Make the invisible visible.",
  },
  {
    number: "05",
    title: "Explanation",
    belief: "Proof needs clarity.",
    story: "An artifact is not finished if I cannot explain it. Explanation forces me to clarify what I built, why it matters, and how the thinking works.",
    principle: "If I cannot explain it, I do not own it yet.",
  },
  {
    number: "06",
    title: "Feedback",
    belief: "Clarity invites correction.",
    story: "Once the work is explained, reality can respond. Feedback shows what is unclear, weak, useful, overbuilt, or worth sharpening.",
    principle: "Feedback reveals the next version.",
  },
  {
    number: "07",
    title: "Iteration",
    belief: "Correction sparks curiosity.",
    story: "Feedback sharpens the next version. Iteration closes one loop, but it also opens a better question, a better angle, and the next thing worth exploring.",
    principle: "Feedback creates iteration.",
  },
];

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

function DetailPanel({ item, onReset }) {
  const active = item || learningLoop[0];

  return (
    <motion.article
      key={active.title}
      initial={{ opacity: 0, x: 16, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-white/12 bg-black/35 p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl xl:p-8"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#facc15]/10 blur-3xl" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.32em] text-[#facc15]">
            Stage {active.number} / 07
          </p>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/55 transition hover:border-white/25 hover:bg-white/[0.09] hover:text-white"
          >
            Reset
          </button>
        </div>

        <div className="mt-7 h-px w-full bg-white/10" />

        <h3 className="mt-9 font-syne text-[clamp(2.6rem,5vw,4.8rem)] font-black uppercase leading-[0.86] tracking-[-0.085em] text-white">
          {active.title}
        </h3>

        <p className="mt-7 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#facc15]">Core belief</p>
        <p className="mt-4 text-xl font-semibold leading-snug tracking-[-0.04em] text-white/90 xl:text-2xl">{active.belief}</p>

        <div className="mt-7 h-px w-full bg-white/10" />

        <p className="mt-7 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#facc15]">Explanation</p>
        <p className="mt-4 text-base font-medium leading-relaxed text-white/65 xl:text-lg">{active.story}</p>

        <div className="mt-auto pt-8">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-[#facc15]/80">Operating principle</p>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-white/85">{active.principle}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function OrbitNode({ item, index, active, next, onClick }) {
  const angle = -90 + index * (360 / learningLoop.length);
  const radius = 225;
  const x = 330 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 330 + radius * Math.sin((angle * Math.PI) / 180);
  const nodeRadius = active ? 45 : 40;

  return (
    <g
      role="button"
      tabIndex="0"
      aria-label={`Open ${item.title}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onClick();
      }}
      className="cursor-pointer outline-none"
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {next && <circle cx={x} cy={y} r={nodeRadius + 20} fill="rgba(250,204,21,0.045)" stroke="rgba(250,204,21,0.25)" strokeWidth="1" />}
      <circle cx={x} cy={y} r={nodeRadius + 10} fill="rgba(255,255,255,0.05)" opacity={active ? 1 : 0.68} />
      <circle cx={x} cy={y} r={nodeRadius} fill={active ? "rgba(250,204,21,0.18)" : "rgba(255,255,255,0.075)"} stroke={active ? "rgba(250,204,21,0.78)" : "rgba(255,255,255,0.2)"} strokeWidth={active ? 2 : 1.25} />
      <circle cx={x} cy={y} r={nodeRadius - 8} fill="rgba(5,5,5,0.42)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x={x} y={y - 7} textAnchor="middle" className="select-none fill-[#facc15] text-[9px] font-black uppercase tracking-[0.24em]">{item.number}</text>
      <text x={x} y={y + 15} textAnchor="middle" className="select-none fill-white text-[11px] font-black uppercase tracking-[-0.04em]">{item.title}</text>
    </g>
  );
}

function DesktopOrbit({ activeIndex, setActiveIndex }) {
  const orbitRadius = 225;
  const circumference = 2 * Math.PI * orbitRadius;
  const progress = activeIndex === null ? 1 / learningLoop.length : (activeIndex + 1) / learningLoop.length;
  const nextIndex = activeIndex === null ? 0 : (activeIndex + 1) % learningLoop.length;
  const active = activeIndex === null ? learningLoop[0] : learningLoop[activeIndex];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px] xl:max-w-[660px]">
      <svg className="h-full w-full overflow-visible" viewBox="0 0 660 660" aria-label="Learning loop system">
        <defs>
          <filter id="orbitGlowFixed">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="learningSunFixed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,248,178,0.98)" />
            <stop offset="38%" stopColor="rgba(250,204,21,0.64)" />
            <stop offset="75%" stopColor="rgba(250,204,21,0.14)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0)" />
          </radialGradient>
        </defs>

        <circle cx="330" cy="330" r="286" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
        <circle cx="330" cy="330" r={orbitRadius} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.25" strokeDasharray="3 12" />
        <circle cx="330" cy="330" r={orbitRadius} fill="none" stroke="rgba(250,204,21,0.82)" strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} transform="rotate(-90 330 330)" filter="url(#orbitGlowFixed)" />
        <circle cx="330" cy="330" r="172" fill="none" stroke="rgba(250,204,21,0.1)" strokeWidth="1" />
        <circle cx="330" cy="330" r="126" fill="url(#learningSunFixed)" />
        <circle cx="330" cy="330" r="88" fill="rgba(250,204,21,0.13)" stroke="rgba(255,241,177,0.38)" strokeWidth="1.4" />
        <circle cx="330" cy="330" r="66" fill="rgba(250,204,21,0.22)" stroke="rgba(255,248,190,0.46)" strokeWidth="1.3" />

        <text x="330" y="307" textAnchor="middle" className="fill-[#facc15] text-[10px] font-black uppercase tracking-[0.28em]">Stage {active.number}</text>
        <text x="330" y="338" textAnchor="middle" className="fill-white text-[22px] font-black uppercase tracking-[-0.07em]">{active.title}</text>
        <text x="330" y="363" textAnchor="middle" className="fill-white/72 text-[10px] font-bold uppercase tracking-[0.05em]">{active.belief}</text>

        {learningLoop.map((item, index) => (
          <OrbitNode
            key={item.title}
            item={item}
            index={index}
            active={activeIndex === index || (activeIndex === null && index === 0)}
            next={nextIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </svg>
    </div>
  );
}

export default function OperatingMethod() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = useMemo(() => learningLoop[activeIndex], [activeIndex]);

  return (
    <section id="operating-method" className="relative min-h-screen overflow-hidden bg-[#050505] px-5 py-16 text-white sm:px-8 md:px-10 lg:py-20">
      <video className="absolute inset-0 z-0 h-full w-full object-cover opacity-75" autoPlay loop muted playsInline>
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-black/50" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(0,0,0,.78)_0%,rgba(0,0,0,.42)_38%,rgba(0,0,0,.58)_100%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1680px] items-center gap-8 lg:grid-cols-[0.82fr_1.08fr_0.92fr] xl:gap-10">
        <div className="max-w-[420px]">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.45em] text-white/62">Hemanth.Sai</p>
          <h2 className="font-serif text-[clamp(3.4rem,7vw,7.2rem)] font-normal uppercase leading-[0.86] tracking-[-0.055em] text-white">
            Ideas<br />
            <span className="text-white/42">Become</span><br />
            Systems.<br />
            <span className="text-white/42">Systems</span><br />
            <span className="text-white/42">Become</span><br />
            Proof.
          </h2>
          <div className="mt-9 h-px w-14 bg-[#facc15]" />
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.34em] text-white/58">The work is only the evidence.</p>
        </div>

        <div className="hidden justify-center lg:flex">
          <DesktopOrbit activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>

        <div className="hidden h-full max-h-[620px] lg:block">
          <DetailPanel item={activeItem} onReset={() => setActiveIndex(0)} />
        </div>

        <div className="grid gap-3 lg:hidden">
          {learningLoop.map((item, index) => {
            const active = activeIndex === index;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`overflow-hidden rounded-[1.45rem] border p-5 text-left shadow-[0_20px_70px_rgba(0,0,0,.35)] backdrop-blur-xl transition ${active ? "border-[#facc15]/55 bg-[#facc15]/[0.08]" : "border-white/10 bg-white/[0.045]"}`}
              >
                <div className="flex items-start gap-4">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border font-mono text-xs font-black ${active ? "border-[#facc15]/70 bg-[#facc15]/15 text-[#facc15]" : "border-white/10 bg-white/[0.06] text-white/60"}`}>{item.number}</span>
                  <span className="flex-1">
                    <span className="block font-syne text-2xl font-black uppercase tracking-[-0.055em] text-white">{item.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/58">{item.belief}</span>
                  </span>
                </div>
                {active && <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/66">{item.story}</p>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
