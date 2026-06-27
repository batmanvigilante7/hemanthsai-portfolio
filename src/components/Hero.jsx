import React from "react";
import { ArrowDownRight, MapPin, Sparkles } from "lucide-react";
import heroPortrait from "../assets/hero-portrait.jpg";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#090a0b] px-5 py-28 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_12%,rgba(255,255,255,0.09),transparent_31%),radial-gradient(ellipse_at_18%_92%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(128deg,#08090a_0%,#161719_47%,#08090a_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(105deg,transparent_0%,rgba(255,255,255,.08)_43%,transparent_51%),repeating-linear-gradient(115deg,rgba(255,255,255,.025)_0px,rgba(255,255,255,.025)_1px,transparent_1px,transparent_7px)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-14rem)] w-full max-w-[1560px] items-center gap-9 lg:grid-cols-[minmax(360px,.82fr)_minmax(600px,1.18fr)] lg:gap-14 xl:gap-20">
        <div className="relative z-10 max-w-[660px]">
          <p className="mb-7 flex items-center gap-3 font-outfit text-[10px] font-black uppercase tracking-[0.23em] text-white/58 sm:text-xs sm:tracking-[0.31em]">
            <Sparkles className="h-4 w-4 text-[#d7d9dc]" />
            AI / SOFTWARE / DESIGN / DISCIPLINE
          </p>

          <h1 className="font-syne text-[clamp(4.1rem,10vw,9.4rem)] font-black uppercase leading-[0.79] tracking-[-0.095em] text-[#f5f5f4]">
            Learning<br />
            by<br />
            building.
          </h1>

          <p className="mt-8 max-w-xl text-base font-medium leading-relaxed text-white/73 sm:text-xl">
            I&apos;m <span className="font-bold text-white">Hemanth Sai</span>, a CSE student at GITAM University, Visakhapatnam — building at the intersection of AI, software, and design.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.17em] text-white/58 sm:mt-9 sm:text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
              <MapPin className="h-3.5 w-3.5 text-white/72" /> Visakhapatnam, India
            </span>
            <span className="rounded-full border border-white/14 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">GITAM / CSE</span>
          </div>

          <a href="#welcome" className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/[0.06] px-5 py-3.5 font-outfit text-[10px] font-black uppercase tracking-[0.18em] text-white transition duration-500 hover:border-white/35 hover:bg-white/[0.11] sm:mt-10 sm:px-6 sm:text-xs">
            Explore my story
            <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
        </div>

        <div className="relative flex min-h-[270px] items-center justify-center lg:min-h-[540px]">
          <div className="relative w-full max-w-[980px] scale-[0.92] lg:scale-[0.75]">
            <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-white/40 via-white/10 to-white/0 opacity-80 sm:rounded-[2.7rem]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#141516] p-2 shadow-[0_38px_130px_rgba(0,0,0,.62)] sm:rounded-[2.7rem] sm:p-3">
              <div className="relative aspect-video overflow-hidden rounded-[1.55rem] bg-[#111214] sm:rounded-[2.15rem]">
                <img
                  src={heroPortrait}
                  alt="Hemanth Sai in Visakhapatnam"
                  className="h-full w-full object-cover object-[50%_41%]"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.06),transparent_38%,rgba(0,0,0,.34))]" />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,.13),inset_0_0_85px_rgba(0,0,0,.3)]" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between border-t border-white/12 pt-3 sm:bottom-6 sm:left-6 sm:right-6 sm:pt-4">
                  <div>
                    <p className="font-outfit text-[9px] font-black uppercase tracking-[0.22em] text-white/56 sm:text-[10px]">Hemanth Sai / 2026</p>
                    <p className="mt-1 font-syne text-sm font-black uppercase tracking-[-0.045em] text-white sm:text-base">Curiosity into craft.</p>
                  </div>
                  <span className="hidden rounded-full border border-white/20 bg-black/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md sm:block">Visakhapatnam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
