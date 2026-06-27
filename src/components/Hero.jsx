import React, { useEffect, useRef } from "react";
import { ArrowDownRight, MapPin, Sparkles } from "lucide-react";

const INTRO_IMAGE = "data:image/webp;base64,UklGRsK+AABXRUJQVlA4ILa+AAA";

export default function Hero() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const updateScene = () => {
      const section = sectionRef.current;
      const media = mediaRef.current;
      const copy = copyRef.current;
      if (!section || !media || !copy) return;

      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      const expand = Math.min(progress / 0.72, 1);
      const fade = Math.max(0, (progress - 0.78) / 0.22);
      const scale = 0.75 + expand * 0.25;

      media.style.transform = `scale(${scale}) translateY(${-fade * 14}px)`;
      media.style.opacity = `${1 - fade}`;
      copy.style.opacity = `${Math.max(0, 1 - progress * 1.25)}`;
      copy.style.transform = `translateY(${-progress * 34}px)`;
    };

    updateScene();
    window.addEventListener("scroll", updateScene, { passive: true });
    window.addEventListener("resize", updateScene);
    return () => {
      window.removeEventListener("scroll", updateScene);
      window.removeEventListener("resize", updateScene);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[185vh] bg-[#090a0b] text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_11%,rgba(255,255,255,.10),transparent_30%),radial-gradient(ellipse_at_18%_95%,rgba(255,255,255,.045),transparent_36%),linear-gradient(128deg,#08090a_0%,#17191b_47%,#08090a_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[.16] [background-image:linear-gradient(105deg,transparent_0%,rgba(255,255,255,.075)_43%,transparent_51%),repeating-linear-gradient(115deg,rgba(255,255,255,.022)_0px,rgba(255,255,255,.022)_1px,transparent_1px,transparent_8px)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090a0b] via-[#090a0b]/70 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-[1560px] items-center gap-8 lg:grid-cols-[minmax(340px,.75fr)_minmax(620px,1.25fr)] lg:gap-10 xl:gap-16">
          <div ref={copyRef} className="relative z-10 max-w-[620px] will-change-transform">
            <p className="mb-7 flex items-center gap-3 font-outfit text-[10px] font-black uppercase tracking-[0.24em] text-white/60 sm:text-xs sm:tracking-[0.31em]">
              <Sparkles className="h-4 w-4 text-[#d9dbde]" />
              AI / SOFTWARE / DESIGN / DISCIPLINE
            </p>

            <h1 className="font-syne text-[clamp(4.1rem,10vw,9.4rem)] font-black uppercase leading-[0.79] tracking-[-0.095em] text-[#f5f5f4]">
              Learning<br />
              by<br />
              building.
            </h1>

            <p className="mt-8 max-w-xl text-base font-medium leading-relaxed text-white/76 sm:text-xl">
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

          <div className="relative flex min-h-[280px] items-center justify-center lg:min-h-[540px]">
            <div ref={mediaRef} className="relative w-full max-w-[1020px] will-change-transform" style={{ transform: "scale(.75)", transformOrigin: "50% 50%" }}>
              <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-white/45 via-white/10 to-white/0 opacity-90 sm:rounded-[2.7rem]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/16 bg-[#141618] p-2 shadow-[0_44px_150px_rgba(0,0,0,.68)] sm:rounded-[2.7rem] sm:p-3">
                <div className="relative aspect-video overflow-hidden rounded-[1.55rem] bg-[#111214] sm:rounded-[2.15rem]">
                  <img src={INTRO_IMAGE} alt="Hemanth Sai in Visakhapatnam" className="h-full w-full object-cover" loading="eager" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.025),transparent_32%,rgba(0,0,0,.22))]" />
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,.13),inset_0_0_90px_rgba(0,0,0,.26)]" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between border-t border-white/12 pt-3 sm:bottom-6 sm:left-6 sm:right-6 sm:pt-4">
                    <div>
                      <p className="font-outfit text-[9px] font-black uppercase tracking-[0.22em] text-white/62 sm:text-[10px]">Hemanth Sai / 2026</p>
                      <p className="mt-1 font-syne text-sm font-black uppercase tracking-[-0.045em] text-white sm:text-base">Curiosity into craft.</p>
                    </div>
                    <span className="hidden rounded-full border border-white/20 bg-black/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md sm:block">Visakhapatnam</span>
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
