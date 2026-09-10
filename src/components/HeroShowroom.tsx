"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { vehicles } from "@/lib/data";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { ShowroomBackdrop } from "./ShowroomBackdrop";
import { ShowroomCarScene } from "./ShowroomCarScene";

const VehicleDetailModal = dynamic(
  () => import("./VehicleDetailModal").then((m) => m.VehicleDetailModal),
  { ssr: false }
);

const COUNT = vehicles.length;

export function HeroShowroom() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalId, setModalId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, COUNT - 1]);

  useMotionValueEvent(progress, "change", (latest) => {
    const rounded = Math.min(COUNT - 1, Math.max(0, Math.round(latest)));
    setActiveIndex((prev) => (prev === rounded ? prev : rounded));
  });

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.min(COUNT - 1, Math.max(0, index));
      const track = trackRef.current;
      if (!track) return;
      const trackHeight = track.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollable = trackHeight - viewportHeight;
      const targetY = track.offsetTop + (clamped / (COUNT - 1)) * scrollable;
      window.scrollTo({ top: targetY, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce]
  );

  const activeVehicle = vehicles[activeIndex];
  const modalVehicle = vehicles.find((v) => v.id === modalId) ?? null;
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (modalId) return;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goTo(activeIndexRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(activeIndexRef.current - 1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, modalId]);

  return (
    <section id="showroom" className="relative">
      <div ref={trackRef} style={{ height: `${COUNT * 100}vh` }} className="relative">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          <ShowroomBackdrop />

          <div className="pointer-events-none absolute inset-x-0 top-24 z-20 flex flex-col items-center px-6 text-center sm:top-28">
            <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-teal-light">
              The Collection
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-off-white sm:text-5xl">
              PERFORMANCE
              <br className="sm:hidden" /> MEETS ELEGANCE
            </h2>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-[74%] z-20 flex justify-center sm:top-auto sm:inset-x-auto sm:bottom-10 sm:right-8 sm:justify-end lg:right-14">
            <div className="rounded-2xl border border-border-strong bg-graphite-3/60 px-5 py-3 text-center backdrop-blur-md sm:text-right">
              <p className="font-display text-sm font-semibold tracking-[0.08em] text-off-white">
                {String(activeIndex + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-titanium/70">
                {activeVehicle.brand} {activeVehicle.model}
              </p>
            </div>
          </div>

          {vehicles.map((v, i) => (
            <ShowroomCarScene
              key={v.id}
              vehicle={v}
              index={i}
              progress={progress}
              reduce={Boolean(reduce)}
              onExplore={() => setModalId(v.id)}
            />
          ))}

          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous vehicle"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-graphite-3/60 text-titanium backdrop-blur-md transition-all duration-200 hover:-translate-x-0.5 hover:border-teal/50 hover:text-teal-light disabled:opacity-0 sm:left-6 sm:h-14 sm:w-14 lg:left-10"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === COUNT - 1}
            aria-label="Next vehicle"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-graphite-3/60 text-titanium backdrop-blur-md transition-all duration-200 hover:translate-x-0.5 hover:border-teal/50 hover:text-teal-light disabled:opacity-0 sm:right-6 sm:h-14 sm:w-14 lg:right-10"
          >
            <CaretRight size={20} weight="bold" />
          </button>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center"
            animate={activeIndex === 0 && !reduce ? { y: [0, 8, 0] } : { y: 0 }}
            transition={{ duration: 1.6, repeat: activeIndex === 0 ? Infinity : 0, ease: "easeInOut" }}
            style={{ opacity: activeIndex === COUNT - 1 ? 0 : 1 }}
          >
            <span className="rounded-full border border-border-strong bg-graphite-3/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-titanium/80 backdrop-blur-md">
              Scroll to continue
            </span>
          </motion.div>
        </div>
      </div>

      <VehicleDetailModal vehicle={modalVehicle} onClose={() => setModalId(null)} />
    </section>
  );
}
