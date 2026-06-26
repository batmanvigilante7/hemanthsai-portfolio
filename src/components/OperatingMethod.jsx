import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const learningLoop = [
  { number: "01", title: "Project", belief: "Projects turn curiosity into direction.", story: "I start with projects because they turn a loose idea into a visible direction.", principle: "Build first. Clarity follows." },
  { number: "02", title: "Problem", belief: "Work reveals friction.", story: "A project exposes what is unclear, weak, missing, or worth solving next.", principle: "The problem chooses the lesson." },
  { number: "03", title: "Skill", belief: "Friction demands skill.", story: "I learn the skill that removes the friction in front of the project.", principle: "Learn what removes friction." },
  { number: "04", title: "Artifact", belief: "Skill becomes proof.", story: "The skill becomes a page, prototype, repo, note, system, or demo.", principle: "Make the invisible visible." },
  { number: "05", title: "Explanation", belief: "Proof needs clarity.", story: "Explaining the work sharpens the thinking behind the work.", principle: "If I cannot explain it, I do not own it yet." },
  { number: "06", title: "Feedback", belief: "Clarity invites correction.", story: "Feedback shows what to simplify, sharpen, rebuild, or remove.", principle: "Feedback reveals the next version." },
  { number: "07", title: "Iteration", belief: "Correction sparks curiosity.", story: "Iteration closes one loop and opens the next better question.", principle: "Feedback creates iteration." },
];

function DetailPanel({ item, onReset }) {
  return (
    <motion.article
      key={item.title}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[560px] overflow-hidden rounded-[2rem] border border-white/12 bg-black/35 p-7 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.32em] text-[#facc15]">Stage {item.number} / 07</p>
          <button type="button" onClick={onReset} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/55 hover:bg-white/[0.09]">Reset</button>
        </div>
        <div className="mt-7 h-px w-full bg-white/10" />
        <h3 className="mt-9 font-syne text-[clamp(2.7rem,4vw,4.2rem)] font-black uppercase leading-[0.86] tracking-[-0.085em]">{item.title}</h3>
        <p className="mt-7 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#facc15]">Core belief</p>
        <p className="mt-4 text-xl font-semibold leading-snug tracking-[-0.04em] text-white/90">{item.belief}</p>
        <div className="mt-7 h-px w-full bg-white/10" />
        <p className="mt-7 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#facc15]">Explanation</p>
        <p className="mt-4 text-base font-medium leading-relaxed text-white/65">{item.story}</p>
        <div className="mt-auto rounded-2xl border border-white/10 bg-black/30 p-5">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.24em] text-[#facc15]/80">Operating principle</p>
          <p className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-white/85">{item.principle}</p>
        </div>
      </div>
    </motion.article>
  );
}

function OrbitNode({ item, index, active, next, onClick }) {
  const radius = 250;
  const angle = -90 + index * (360 / learningLoop.length);
  const x = 360 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 360 + radius * Math.sin((angle * Math.PI) / 180);
  const nodeRadius = active ? 52 : 46;

  return (
    <g role="button" tabIndex="0" onClick={onClick} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }} className="cursor-pointer">
      {next && <circle cx={x} cy={y} r={nodeRadius + 24} fill="rgba(250,204,21,0.05)" stroke="rgba(250,204,21,0.28)" />}
      <circle cx={x} cy={y} r={nodeRadius + 12} fill="rgba(255,255,255,0.055)" />
      <circle cx={x} cy={y} r={nodeRadius} fill={active ? "rgba(250,204,21,0.2)" : "rgba(255,255,255,0.08)"} stroke={active ? "rgba(250,204,21,0.85)" : "rgba(255,255,255,0.24)"} strokeWidth={active ? 2 : 1.35} />
      <circle cx={x} cy={y} r={nodeRadius - 8} fill="rgba(5,5,5,0.46)" stroke="rgba(255,255,255,0.09)" />
      <text x={x} y={y - 8} textAnchor="middle" className="select-none fill-[#facc15] text-[10px] font-black uppercase tracking-[0.22em]">{item.number}</text>
      <text x={x} y={y + 17} textAnchor="middle" className="select-none fill-white text-[13px] font-black uppercase tracking-[-0.04em]">{item.title}</text>
    </g>
  );
}

function DesktopOrbit({ activeIndex, setActiveIndex }) {
  const orbitRadius = 250;
  const circumference = 2 * Math.PI * orbitRadius;
  const progress = (activeIndex + 1) / learningLoop.length;
  const active = learningLoop[activeIndex];
  const nextIndex = (activeIndex + 1) % learningLoop.length;

  return (
    <div className="relative mx-auto aspect-square w-[640px] min-w-[640px] xl:w-[700px] xl:min-w-[700px]">
      <svg className="h-full w-full overflow-visible" viewBox="0 0 720 720" aria-label="Learning loop system">
        <defs>
          <filter id="orbitGlowBig"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <radialGradient id="learningSunBig" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255,248,178,1)" /><stop offset="42%" stopColor="rgba(250,204,21,0.68)" /><stop offset="100%" stopColor="rgba(250,204,21,0)" /></radialGradient>
        </defs>
        <circle cx="360" cy="360" r="316" fill="none" stroke="rgba(255,255,255,0.04)" />
        <circle cx="360" cy="360" r={orbitRadius} fill="none" stroke="rgba(255,255,255,0.16)" strokeDasharray="3 12" />
        <circle cx="360" cy="360" r={orbitRadius} fill="none" stroke="rgba(250,204,21,0.9)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} transform="rotate(-90 360 360)" filter="url(#orbitGlowBig)" />
        <circle cx="360" cy="360" r="148" fill="url(#learningSunBig)" />
        <circle cx="360" cy="360" r="104" fill="rgba(250,204,21,0.15)" stroke="rgba(255,241,177,0.42)" strokeWidth="1.5" />
        <circle cx="360" cy="360" r="76" fill="rgba(250,204,21,0.24)" stroke="rgba(255,248,190,0.5)" strokeWidth="1.4" />
        <text x="360" y="335" textAnchor="middle" className="fill-[#facc15] text-[10px] font-black uppercase tracking-[0.28em]">Stage {active.number}</text>
        <text x="360" y="368" textAnchor="middle" className="fill-white text-[24px] font-black uppercase tracking-[-0.07em]">{active.title}</text>
        <text x="360" y="394" textAnchor="middle" className="fill-white/72 text-[10px] font-bold uppercase tracking-[0.04em]">{active.belief}</text>
        {learningLoop.map((item, index) => <OrbitNode key={item.title} item={item} index={index} active={activeIndex === index} next={nextIndex === index} onClick={() => setActiveIndex(index)} />)}
      </svg>
    </div>
  );
}

export default function OperatingMethod() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = useMemo(() => learningLoop[activeIndex], [activeIndex]);

  return (
    <section id="operating-method" className="relative min-h-screen overflow-hidden bg-[#050505] px-6 py-12 text-white sm:px-8 lg:px-10">
      <video className="absolute inset-0 z-0 h-full w-full object-cover opacity-80" autoPlay loop muted playsInline><source src={VIDEO_URL} type="video/mp4" /></video>
      <div className="absolute inset-0 z-[1] bg-black/45" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.26)_43%,rgba(0,0,0,.62)_100%)]" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1760px] items-center gap-10 xl:grid-cols-[360px_740px_520px] 2xl:grid-cols-[410px_760px_560px] 2xl:gap-14">
        <div className="max-w-[360px] 2xl:max-w-[410px]">
          <h2 className="font-serif text-[clamp(3rem,5vw,6.4rem)] font-normal uppercase leading-[0.86] tracking-[-0.055em] text-white">Ideas<br /><span className="text-white/42">Become</span><br />Systems.<br /><br /><span className="text-white/42">Systems</span><br /><span className="text-white/42">Become</span><br />Proof.</h2>
          <div className="mt-8 h-px w-14 bg-[#facc15]" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.34em] text-white/58">The work is only the evidence.</p>
        </div>
        <div className="hidden xl:flex xl:items-center xl:justify-center"><DesktopOrbit activeIndex={activeIndex} setActiveIndex={setActiveIndex} /></div>
        <div className="hidden h-[560px] xl:block"><DetailPanel item={activeItem} onReset={() => setActiveIndex(0)} /></div>
        <div className="grid gap-3 xl:hidden">
          {learningLoop.map((item, index) => {
            const active = activeIndex === index;
            return <button key={item.title} type="button" onClick={() => setActiveIndex(index)} className={`overflow-hidden rounded-[1.45rem] border p-5 text-left shadow-[0_20px_70px_rgba(0,0,0,.35)] backdrop-blur-xl transition ${active ? "border-[#facc15]/55 bg-[#facc15]/[0.08]" : "border-white/10 bg-white/[0.045]"}`}><div className="flex items-start gap-4"><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border font-mono text-xs font-black ${active ? "border-[#facc15]/70 bg-[#facc15]/15 text-[#facc15]" : "border-white/10 bg-white/[0.06] text-white/60"}`}>{item.number}</span><span className="flex-1"><span className="block font-syne text-2xl font-black uppercase tracking-[-0.055em] text-white">{item.title}</span><span className="mt-2 block text-sm leading-relaxed text-white/58">{item.belief}</span></span></div>{active && <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/66">{item.story}</p>}</button>;
          })}
        </div>
      </div>
    </section>
  );
}
