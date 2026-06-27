import React from "react";
import { ArrowDownRight, Dumbbell, Mic2, Shield, Trophy } from "lucide-react";

const beforeBuilderSignals = [
  {
    icon: Shield,
    title: "Structure",
    origin: "Sainik School / NCC",
    text: "Before software, there was structure — routines, standards, presence, and the habit of showing up seriously.",
  },
  {
    icon: Dumbbell,
    title: "Discipline",
    origin: "Karate / Training",
    text: "Practice taught me that confidence is not borrowed. It is earned through repetition, correction, and discomfort.",
  },
  {
    icon: Mic2,
    title: "Voice",
    origin: "Public speaking / Stage",
    text: "Speaking trained me to hold an idea clearly enough for people to understand, remember, and respond to it.",
  },
  {
    icon: Trophy,
    title: "Pressure",
    origin: "Sports / Performance",
    text: "Competition made feedback physical. Pressure taught me what motivation alone never could.",
  },
];

export default function Welcome() {
  return (
    <section
      id="welcome"
      className="relative overflow-hidden bg-[#080808] px-5 py-20 text-white sm:px-8 sm:py-28 md:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(250,204,21,.12),transparent_34%),radial-gradient(ellipse_at_82%_92%,rgba(255,255,255,.07),transparent_34%),linear-gradient(180deg,#080808_0%,#101010_48%,#050505_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:repeating-linear-gradient(115deg,rgba(255,255,255,.035)_0px,rgba(255,255,255,.035)_1px,transparent_1px,transparent_9px)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 font-outfit text-[10px] font-black uppercase tracking-[0.32em] text-[#facc15] sm:text-xs">
              Before the builder
            </p>
            <h2 className="max-w-5xl font-syne text-[clamp(3.4rem,11vw,8.4rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-white">
              The pattern<br />behind<br />the proof.
            </h2>
          </div>

          <div className="max-w-3xl lg:pb-3">
            <p className="text-xl font-light leading-relaxed tracking-[-0.035em] text-white/72 sm:text-2xl">
              Before I became interested in AI, software, and product building, I was shaped by structure, discipline, voice, and pressure.
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/52 sm:text-lg">
              The environments changed — training grounds, uniforms, stages, classrooms, and laptops — but the pattern stayed the same: learn under pressure, communicate with clarity, and turn intent into visible work.
            </p>
            <a
              href="#identity"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/[0.055] px-5 py-3 font-outfit text-[10px] font-black uppercase tracking-[0.18em] text-white/82 backdrop-blur-xl transition hover:border-white/28 hover:bg-white/[0.09] hover:text-white sm:text-xs"
            >
              Enter identity stack
              <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {beforeBuilderSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <article
                key={signal.title}
                className="group min-h-[260px] rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_28px_100px_rgba(0,0,0,.36)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] sm:p-7"
              >
                <div className="flex items-center justify-between gap-5">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/[0.055] text-[#facc15]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-white/32">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-8 font-syne text-[clamp(2rem,5vw,3.1rem)] font-black uppercase leading-[0.86] tracking-[-0.075em] text-white">
                  {signal.title}
                </h3>
                <p className="mt-4 font-outfit text-[10px] font-black uppercase tracking-[0.2em] text-[#facc15]/75">
                  {signal.origin}
                </p>
                <p className="mt-5 text-sm font-medium leading-relaxed text-white/56 sm:text-base">
                  {signal.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
