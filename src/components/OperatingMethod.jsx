import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const learningLoop = [
  {
    number: "01",
    title: "Project",
    belief: "Curiosity creates direction.",
    story: "Curiosity becomes real only when it finds a container. I start with a project because it gives an idea direction, pressure, and a place to become visible work.",
  },
  {
    number: "02",
    title: "Problem",
    belief: "Work reveals friction.",
    story: "Once the project begins, the vague idea meets reality. Bugs, unclear structure, weak design, and missing logic reveal the real problem that needs attention.",
  },
  {
    number: "03",
    title: "Skill",
    belief: "Friction demands skill.",
    story: "The problem decides what I need to learn next. Instead of collecting random theory, I build the skill that removes the friction in front of me.",
  },
  {
    number: "04",
    title: "Artifact",
    belief: "Skill becomes proof.",
    story: "A skill becomes valuable when it leaves my head. It turns into a page, prototype, repo, note, demo, case study, or system that can be seen and improved.",
  },
  {
    number: "05",
    title: "Explanation",
    belief: "Proof needs clarity.",
    story: "An artifact is not finished if I cannot explain it. Explanation forces me to clarify what I built, why it matters, and how the thinking works.",
  },
  {
    number: "06",
    title: "Feedback",
    belief: "Clarity invites correction.",
    story: "Once the work is explained, reality can respond. Feedback shows what is unclear, weak, useful, overbuilt, or worth sharpening.",
  },
  {
    number: "07",
    title: "Iteration",
    belief: "Correction sparks curiosity.",
    story: "Feedback sharpens the next version. Iteration closes one loop, but it also opens a better question and the next thing worth exploring.",
  },
];

function DetailPanel({ item, onReset }) {
  const active = item || {
    number: "00",
    title: "Curiosity",
    belief: "Curiosity creates direction.",
    story: "The loop starts when something feels interesting enough to test. That spark becomes a project, and the project begins exposing the next stage.",
  };

  return (
    <motion.article
      key={active.title}
      initial={{ opacity: 0, x: 20, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.055] p-7 shadow-[0_34px_130px_rgba(0,0,0,0.52)] backdrop-blur-3xl sm:p-8"
    >
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#facc15]/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/42">
            {item ? `${active.number} / Selected stage` : "Starting point"}
          </p>
          {item && (
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:border-white/20 hover:bg-white/[0.09] hover:text-white/75"
            >
              Reset
            </button>
          )}
        </div>
        <h3 className="mt-5 font-syne text-[clamp(2.6rem,6vw,4.7rem)] font-black uppercase leading-[0.82] tracking-[-0.08em] text-white">
          {active.title}.
        </h3>
        <p className="mt-6 text-xl font-black leading-snug tracking-[-0.045em] text-white/90">{active.belief}</p>
        <p className="mt-5 text-sm font-medium leading-relaxed text-white/64 sm:text-base">{active.story}</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-white/35">Operating principle</p>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-white/78">{active.belief}</p>
        </div>
      </div>
    </motion.article>
  );
}

function OrbitNode({ item, index, active, next, onClick }) {
  const angle = -90 + index * (360 / learningLoop.length);
  const radius = 275;
  const x = 380 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 380 + radius * Math.sin((angle * Math.PI) / 180);
  const nodeRadius = active ? 52 : 46;

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
      {next && <circle cx={x} cy={y} r={nodeRadius + 24} fill="rgba(250,204,21,0.045)" stroke="rgba(250,204,21,0.28)" strokeWidth="1" />}
      <circle cx={x} cy={y} r={nodeRadius + 12} fill="rgba(255,255,255,0.055)" opacity={active ? 1 : 0.72} />
      <circle cx={x} cy={y} r={nodeRadius} fill={active ? "rgba(250,204,21,0.18)" : "rgba(255,255,255,0.075)"} stroke={active ? "rgba(250,204,21,0.75)" : "rgba(255,255,255,0.22)"} strokeWidth={active ? 2 : 1.4} />
      <circle cx={x} cy={y} r={nodeRadius - 9} fill="rgba(5,5,5,0.42)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x={x} y={y - 8} textAnchor="middle" className="select-none fill-white/45 text-[10px] font-black uppercase tracking-[0.24em]">{item.number}</text>
      <text x={x} y={y + 16} textAnchor="middle" className="select-none fill-white text-[12px] font-black uppercase tracking-[-0.04em]">{item.title}</text>
    </g>
  );
}

function DesktopOrbit({ activeIndex, setActiveIndex }) {
  const orbitRadius = 275;
  const circumference = 2 * Math.PI * orbitRadius;
  const progress = activeIndex === null ? 1 / learningLoop.length : (activeIndex + 1) / learningLoop.length;
  const nextIndex = activeIndex === null ? 0 : (activeIndex + 1) % learningLoop.length;

  return (
    <div className="relative aspect-square w-full max-w-[820px]">
      <svg className="h-full w-full overflow-visible" viewBox="0 0 760 760" aria-label="Learning loop system">
        <defs>
          <filter id="orbitGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="learningSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,248,178,0.98)" />
            <stop offset="38%" stopColor="rgba(250,204,21,0.64)" />
            <stop offset="75%" stopColor="rgba(250,204,21,0.12)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0)" />
          </radialGradient>
        </defs>
        <circle cx="380" cy="380" r="315" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
        <circle cx="380" cy="380" r={orbitRadius} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.4" strokeDasharray="3 12" />
        <circle cx="380" cy="380" r={orbitRadius} fill="none" stroke="rgba(250,204,21,0.82)" strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} transform="rotate(-90 380 380)" filter="url(#orbitGlow)" />
        <circle cx="380" cy="380" r="220" fill="none" stroke="rgba(250,204,21,0.1)" strokeWidth="1" />
        <circle cx="380" cy="380" r="155" fill="url(#learningSun)" />
        <circle cx="380" cy="380" r="105" fill="rgba(250,204,21,0.13)" stroke="rgba(255,241,177,0.38)" strokeWidth="1.4" />
        <circle cx="380" cy="380" r="78" fill="rgba(250,204,21,0.22)" stroke="rgba(255,248,190,0.46)" strokeWidth="1.3" />
        <text x="380" y="354" textAnchor="middle" className="fill-white/42 text-[10px] font-black uppercase tracking-[0.28em]">{activeIndex === null ? "Starting point" : `${learningLoop[activeIndex].number} / Active stage`}</text>
        <text x="380" y="385" textAnchor="middle" className="fill-white text-[23px] font-black uppercase tracking-[-0.07em]">{activeIndex === null ? "Curiosity" : learningLoop[activeIndex].title}</text>
        <text x="380" y="410" textAnchor="middle" className="fill-white/70 text-[12px] font-bold uppercase tracking-[0.05em]">{activeIndex === null ? "creates direction" : learningLoop[activeIndex].belief}</text>
        {learningLoop.map((item, index) => (
          <OrbitNode
            key={item.title}
            item={item}
            index={index}
            active={activeIndex === index}
            next={nextIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </svg>
    </div>
  );
}

export default function OperatingMethod() {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeItem = useMemo(() => (activeIndex === null ? null : learningLoop[activeIndex]), [activeIndex]);

  return (
    <section id="operating-method" className="relative overflow-hidden bg-[#050505] px-5 py-20 text-white sm:px-8 sm:py-28 md:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(250,204,21,.09),transparent_27%),radial-gradient(circle_at_14%_18%,rgba(255,255,255,.05),transparent_30%),linear-gradient(180deg,#050505,#080808)]" />
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[980px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="max-w-4xl">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#facc15]">Operating method</p>
          <h2 className="mt-5 font-syne text-[clamp(3rem,10vw,7rem)] font-black uppercase leading-[0.84] tracking-[-0.09em]">My Learning Loop</h2>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-white/70 sm:text-2xl">Curiosity starts the system. Projects expose the path. Iteration brings the next question back into focus.</p>
        </div>

        <div className="mt-12 hidden items-center gap-8 lg:grid lg:grid-cols-[minmax(650px,860px)_1fr] xl:gap-12">
          <DesktopOrbit activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          <DetailPanel item={activeItem} onReset={() => setActiveIndex(null)} />
        </div>

        <div className="mt-10 grid gap-3 lg:hidden">
          {learningLoop.map((item, index) => {
            const active = activeIndex === index;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(active ? null : index)}
                className={`overflow-hidden rounded-[1.45rem] border p-5 text-left shadow-[0_20px_70px_rgba(0,0,0,.35)] backdrop-blur-xl transition ${active ? "border-[#facc15]/55 bg-[#facc15]/[0.08]" : "border-white/10 bg-white/[0.045]"}`}
              >
                <div className="flex items-start gap-4">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border font-mono text-xs font-black ${active ? "border-[#facc15]/70 bg-[#facc15]/15 text-[#facc15]" : "border-white/10 bg-white/[0.06] text-white/60"}`}>{item.number}</span>
                  <span className="flex-1">
                    <span className="block font-syne text-2xl font-black uppercase tracking-[-0.055em] text-white">{item.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/58">{item.belief}</span>
                  </span>
                  <span className="pt-1 text-xl text-white/45">{active ? "−" : "+"}</span>
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
