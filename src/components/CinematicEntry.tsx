"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const ENTRY_CAR = "/entry-car.png";
// Approximate position of the front badge/emblem within the photo, used as
// the fixed zoom origin so scaling reads as a camera push straight into it.
const EMBLEM_ORIGIN = "50% 44%";

export function CinematicEntry() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const carScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.55, 0.88, 1],
    [1, 1, 1.9, 9.5, 9.5]
  );
  const carBlur = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    [0, 0, 11, 11]
  );
  const carOpacity = useTransform(scrollYProgress, [0, 0.92, 0.98], [1, 1, 0]);
  const carFilter = useTransform(carBlur, (b) => (b < 0.4 ? "none" : `blur(${b}px)`));

  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.14], [0, -40]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  const flareOpacity = useTransform(scrollYProgress, [0.45, 0.7, 0.86], [0, 0.9, 0]);
  const flareScale = useTransform(scrollYProgress, [0.45, 0.85], [0.3, 2.6]);

  const coverOpacity = useTransform(scrollYProgress, [0.82, 0.97, 1], [0, 1, 1]);

  if (reduce) {
    return (
      <section
        id="entry"
        className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 text-center"
      >
        <EntryVignette />
        <div className="relative h-[38vh] w-full max-w-xl sm:h-[48vh]">
          <Image
            src={ENTRY_CAR}
            alt="AutoElite signature performance vehicle"
            fill
            priority
            sizes="(max-width: 640px) 90vw, 640px"
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
          />
        </div>
        <EntryCopy />
        <a
          href="#site"
          className="relative mt-10 rounded-full border border-teal/60 bg-teal/10 px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-off-white transition-colors duration-200 hover:bg-teal/20"
        >
          Enter Showroom
        </a>
      </section>
    );
  }

  return (
    <section id="entry" ref={sectionRef} className="relative bg-black" style={{ height: "340vh" }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black">
        <EntryVignette />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            opacity: flareOpacity,
            background: `radial-gradient(circle at 50% 44%, rgba(20,184,189,0.9) 0%, rgba(0,140,145,0.35) 22%, transparent 60%)`,
            scale: flareScale,
          }}
        />

        {/* Text and car share one flex column so the car's box is always the
            space actually left over after the headline — they can never
            overlap at rest, regardless of viewport height. */}
        <div className="relative z-[5] flex h-full w-full flex-col items-center px-6 pt-[9vh] pb-[9vh] sm:pt-[11vh]">
          <motion.div
            className="flex shrink-0 flex-col items-center text-center"
            style={{ opacity: textOpacity, y: textY }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-titanium sm:text-xs">
              AutoElite
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.6rem,3.4vw+1rem,4.5rem)] font-semibold leading-[1.05] tracking-tight text-off-white sm:mt-5">
              DRIVE A HIGHER
              <br />
              STANDARD
            </h1>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-gray sm:mt-5 sm:text-sm sm:tracking-[0.35em]">
              Luxury <span className="text-teal-light">/</span> Performance{" "}
              <span className="text-teal-light">/</span> Beyond
            </p>
          </motion.div>

          <motion.div
            className="relative flex w-full min-h-0 flex-1 items-center justify-center"
            style={{ opacity: carOpacity }}
          >
            <motion.div
              className="relative h-full max-h-[46vh] w-[88vw] max-w-2xl sm:w-[70vw] lg:w-[46vw]"
              style={{
                scale: carScale,
                filter: carFilter,
                transformOrigin: EMBLEM_ORIGIN,
              }}
            >
              <div className="absolute bottom-[8%] left-1/2 h-[10%] w-[60%] -translate-x-1/2 rounded-full bg-black/70 blur-2xl" />
              <div className="absolute inset-x-[6%] bottom-[10%] h-[18%] rounded-full bg-gradient-to-b from-white/[0.06] to-transparent blur-md" />
              <Image
                src={ENTRY_CAR}
                alt="AutoElite signature performance vehicle"
                fill
                priority
                sizes="(max-width: 768px) 88vw, 46vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-3"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted-gray">
            Scroll to Enter
          </span>
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-titanium"
          >
            <CaretDown size={13} />
          </motion.span>
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-graphite"
          style={{ opacity: coverOpacity }}
        />
      </div>
    </section>
  );
}

function EntryCopy() {
  return (
    <div className="relative flex flex-col items-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-titanium sm:text-xs">
        AutoElite
      </p>
      <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-off-white sm:text-6xl">
        DRIVE A HIGHER
        <br />
        STANDARD
      </h1>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.35em] text-muted-gray sm:text-sm">
        Luxury <span className="text-teal-light">/</span> Performance{" "}
        <span className="text-teal-light">/</span> Beyond
      </p>
    </div>
  );
}

function EntryVignette() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 90% 75% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
}
