import React, { useLayoutEffect, useRef } from "react";
import { ArrowDownRight, MapPin, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroPortrait from "../assets/hero-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const mediaRef = useRef(null);
  const labelRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(panelRef.current, { scale: 0.75, opacity: 1, transformOrigin: "50% 50%" });
      gsap.set([contentRef.current, labelRef.current], { y: 26, autoAlpha: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .to(labelRef.current, { y: 0, autoAlpha: 1, duration: 0.75, delay: 0.16 })
        .to(contentRef.current, { y: 0, autoAlpha: 1, duration: 1.05 }, "-=0.38")
        .to(panelRef.current, { scale: 0.75, duration: 0.01 }, "<");

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
        },
      });

      scrollTimeline
        .to(contentRef.current, { y: -28, autoAlpha: 0.3, ease: "none" }, 0)
        .to(labelRef.current, { autoAlpha: 0, ease: "none" }, 0.08)
        .to(panelRef.current, { scale: 1, ease: "none" }, 0.1)
        .to(mediaRef.current, { filter: "brightness(1.03) contrast(1.04)", ease: "none" }, 0.2)
        .to(panelRef.current, { autoAlpha: 0, y: -18, ease: "none" }, 0.82);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[180vh] bg-[#090a0b] text-white"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_12%,rgba(255,255,255,0.09),transparent_31%),radial-gradient(ellipse_at_18%_92%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(128deg,#08090a_0%,#161719_47%,#08090a_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(105deg,transparent_0%,rgba(255,255,255,.08)_43%,transparent_51%),repeating-linear-gradient(115deg,rgba(255,255,255,.025)_0px,rgba(255,255,255,.025)_1px,transparent_1px,transparent_7px)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#090a0b] via-[#090a0b]/60 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-[1560px] items-center gap-9 lg:grid-cols-[minmax(360px,.82fr)_minmax(600px,1.18fr)] lg:gap-14 xl:gap-20">
          <div ref={contentRef} className="relative z-10 max-w-[660px]">
            <p ref={labelRef} className="mb-7 flex items-center gap-3 font-outfit text-[10px] font-black uppercase tracking-[0.23em] text-white/58 sm:text-xs sm:tracking-[0.31em]">
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

            <a
              href="#welcome"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/[0.06] px-5 py-3.5 font-outfit text-[10px] font-black uppercase tracking-[0.18em] text-white transition duration-500 hover:border-white/35 hover:bg-white/[0.11] sm:mt-10 sm:px-6 sm:text-xs"
            >
              Explore my story
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>

          <div className="relative flex min-h-[270px] items-center justify-center lg:min-h-[540px]">
            <div ref={panelRef} className="relative w-full max-w-[980px] will-change-transform">
              <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-white/40 via-white/10 to-white/0 opacity-80 sm:rounded-[2.7rem]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#141516] p-2 shadow-[0_38px_130px_rgba(0,0,0,.62)] sm:rounded-[2.7rem] sm:p-3">
                <div className="relative aspect-video overflow-hidden rounded-[1.55rem] bg-[#111214] sm:rounded-[2.15rem]">
                  <img
                    ref={mediaRef}
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

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/35">Scroll to enter</p>
      </div>
    </section>
  );
}
