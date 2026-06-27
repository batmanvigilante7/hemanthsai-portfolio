import React, { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Github, Mail } from "lucide-react";

const LinkedInIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function VideoHero() {
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const opacityRef = useRef(0);
  const requestRef = useRef(null);
  const fadingOutRef = useRef(false);
  const VIDEO_URL = `${import.meta.env.BASE_URL}man-typing-builder.mp4`;

  const animateOpacity = (target, duration) => {
    if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    const startOpacity = opacityRef.current;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = startOpacity + (target - startOpacity) * progress;
      opacityRef.current = current;
      setOpacity(current);
      if (progress < 1) requestRef.current = requestAnimationFrame(step);
      else requestRef.current = null;
    };

    requestRef.current = requestAnimationFrame(step);
  };

  const handleCanPlay = () => {
    if (opacityRef.current === 0 && !fadingOutRef.current) animateOpacity(1, 500);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.55 && !fadingOutRef.current) {
      fadingOutRef.current = true;
      animateOpacity(0, 500);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    setOpacity(0);
    opacityRef.current = 0;
    setTimeout(() => {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => {
            fadingOutRef.current = false;
            animateOpacity(1, 500);
          })
          .catch(() => {
            fadingOutRef.current = false;
          });
      } else {
        fadingOutRef.current = false;
        animateOpacity(1, 500);
      }
    }, 100);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 3) animateOpacity(1, 500);
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section id="video-hero" className="relative min-h-screen overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        style={{ opacity }}
        className="absolute inset-0 h-full w-full object-cover object-center transition-none"
      />

      <div className="absolute inset-0 bg-black/42" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,.26)_52%,rgba(0,0,0,.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-zinc-950 to-transparent" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-14 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-[1480px] items-end gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-5 font-outfit text-[10px] font-black uppercase tracking-[0.32em] text-[#facc15] sm:text-xs">
              Hemanth Sai / Builder Mode
            </p>
            <h1 className="max-w-5xl font-syne text-[clamp(4.2rem,10vw,10.6rem)] font-black uppercase leading-[0.78] tracking-[-0.095em] text-white">
              Ideas<br />Become<br />Proof.
            </h1>
          </div>

          <div className="max-w-xl pb-2 lg:justify-self-end">
            <p className="text-lg font-medium leading-relaxed text-white/72 sm:text-xl">
              A quiet workspace for turning curiosity into systems, interfaces, notes, experiments, and visible proof.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#hero" className="group inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/[0.06] px-5 py-3 font-outfit text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl transition hover:bg-white/[0.11] sm:text-xs">
                Meet Hemanth
                <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a href="#projects" className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/[0.035] px-5 py-3 font-outfit text-[10px] font-black uppercase tracking-[0.18em] text-white/78 backdrop-blur-xl transition hover:bg-white/[0.09] hover:text-white sm:text-xs">
                See proof
              </a>
            </div>
            <div className="mt-8 flex gap-3 text-white/62">
              <a className="rounded-full border border-white/12 bg-white/[0.04] p-3 backdrop-blur-xl transition hover:text-white" href="https://github.com/batmanvigilante7" aria-label="GitHub"><Github className="h-4 w-4" /></a>
              <a className="rounded-full border border-white/12 bg-white/[0.04] p-3 backdrop-blur-xl transition hover:text-white" href="https://www.linkedin.com/" aria-label="LinkedIn"><LinkedInIcon className="h-4 w-4" /></a>
              <a className="rounded-full border border-white/12 bg-white/[0.04] p-3 backdrop-blur-xl transition hover:text-white" href="mailto:hemanthsairoyal7@gmail.com" aria-label="Email"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
