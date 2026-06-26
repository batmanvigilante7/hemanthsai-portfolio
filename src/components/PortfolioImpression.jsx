import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDownRight, Sparkles } from "lucide-react";
import heroPortrait from "../assets/hero-portrait.jpg";

export default function PortfolioImpression() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".arrival-item",
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.13, ease: "power4.out", delay: 0.16 }
      );
      gsap.fromTo(
        ".arrival-portrait",
        { autoAlpha: 0, scale: 0.94, y: 26 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.48 }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="arrival" className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[#050505] px-5 pb-10 pt-24 text-white sm:px-8 sm:pb-12 sm:pt-28 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.12),transparent_27%),radial-gradient(circle_at_12%_86%,rgba(250,204,21,0.13),transparent_32%),linear-gradient(180deg,#050505_0%,#0a0a0a_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] [background-image:radial-gradient(#fff_0.8px,transparent_0.8px)] [background-size:22px_22px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        <div className="relative z-10 max-w-3xl">
          <p className="arrival-item mb-5 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.19em] text-white/60 sm:text-xs sm:tracking-[0.28em]">
            <Sparkles className="h-4 w-4 text-[#facc15]" /> AI / Software / Design / Storytelling
          </p>
          <h1 className="arrival-item max-w-[9.8ch] font-syne text-[clamp(3.65rem,13vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.085em] text-white">
            Learning by building.
          </h1>
          <p className="arrival-item mt-6 max-w-xl font-outfit text-base font-light leading-relaxed tracking-wide text-white/70 sm:mt-7 sm:text-xl">
            I&apos;m Hemanth Sai — a CSE student turning curiosity into visible proof through AI, software, design, and stories worth remembering.
          </p>
          <div className="arrival-item mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <a href="#hero" className="group inline-flex items-center gap-3 rounded-full bg-[#facc15] px-5 py-3.5 font-outfit text-[10px] font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.035] sm:px-6 sm:text-xs">
              Enter the portfolio <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a href="#welcome" className="rounded-full border border-white/15 bg-white/[0.045] px-5 py-3.5 font-outfit text-[10px] font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.09] hover:text-white sm:px-6 sm:text-xs">
              Explore the story
            </a>
          </div>
          <div className="arrival-item mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-5 font-outfit text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45 sm:mt-11 sm:gap-x-7 sm:text-[10px] sm:tracking-[0.2em]">
            <span>GITAM CSE</span><span className="hidden h-1 w-1 rounded-full bg-[#facc15]/80 sm:block" /><span>Builder mode</span><span className="hidden h-1 w-1 rounded-full bg-[#facc15]/80 sm:block" /><span>Proof over potential</span>
          </div>
        </div>

        <div className="arrival-portrait relative mx-auto w-full max-w-[min(78vw,390px)] sm:max-w-[440px] lg:max-w-[490px]">
          <div className="absolute inset-x-10 bottom-2 top-14 rounded-full bg-[#facc15]/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.3rem] border border-white/15 bg-white/[0.045] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.58)] backdrop-blur-2xl sm:rounded-[3rem] sm:p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:rounded-[2.35rem]">
              <img src={heroPortrait} alt="Hemanth Sai" className="h-full w-full scale-[1.035] object-cover object-[50%_36%]" loading="eager" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              <div className="absolute bottom-5 left-5 right-5 border border-white/15 bg-black/35 p-4 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <p className="font-outfit text-[9px] font-black uppercase tracking-[0.24em] text-[#facc15]">Hemanth Sai / 2026</p>
                <p className="mt-1.5 font-syne text-sm font-black uppercase tracking-[-0.035em] text-white sm:text-base">Turning thought into artifacts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 font-outfit text-[9px] font-bold uppercase tracking-[0.28em] text-white/35 sm:block">Scroll to enter</p>
    </section>
  );
}
