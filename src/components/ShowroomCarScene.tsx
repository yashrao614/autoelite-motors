"use client";

import Image from "next/image";
import { MotionValue, motion, useTransform } from "motion/react";
import type { Vehicle } from "@/lib/data";

type ShowroomCarSceneProps = {
  vehicle: Vehicle;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
  onExplore: () => void;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const DWELL = 0.22;
const EDGE = 0.5;
const BLUR_MAX = 4;
const ramp = (o: number) => clamp((Math.abs(o) - DWELL) / (EDGE - DWELL), 0, 1);

export function ShowroomCarScene({ vehicle, index, progress, reduce, onExplore }: ShowroomCarSceneProps) {
  const offset = useTransform(progress, (p) => p - index);

  const carX = useTransform(offset, (o) => `${clamp(-o / EDGE, -1, 1) * 42}vw`);
  const carScale = useTransform(offset, (o) => 1 - ramp(o) * 0.18);
  const carOpacity = useTransform(offset, (o) => 1 - ramp(o));
  const carBlurPx = useTransform(offset, (o) => ramp(o) * BLUR_MAX);
  const carBlurFilter = useTransform(carBlurPx, (b) => (b < 0.4 ? "none" : `blur(${b}px)`));
  const carRotate = useTransform(offset, (o) => Math.sign(-o) * ramp(o) * 6);

  const textX = useTransform(offset, (o) => `${Math.sign(-o) * ramp(o) * 8}%`);
  const textOpacity = carOpacity;

  const pointerEvents = useTransform(offset, (o) => (Math.abs(o) < DWELL ? "auto" : "none"));

  if (reduce) {
    return (
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-5 pt-14 pb-6 sm:flex sm:items-center sm:justify-center sm:gap-0 sm:px-0 sm:pt-0 sm:pb-0"
        style={{ opacity: carOpacity, pointerEvents }}
      >
        <CarFigure vehicle={vehicle} index={index} onExplore={onExplore} order="order-1" />
        <div className="pointer-events-auto order-2 w-full max-w-md rounded-3xl border border-border-strong bg-graphite-3/70 p-6 text-center shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:absolute sm:inset-x-0 sm:bottom-8 sm:top-24 sm:left-[6%] sm:right-auto sm:w-[min(34rem,42vw)] sm:text-left lg:left-[9%] lg:top-28">
          <TextContent vehicle={vehicle} onExplore={onExplore} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-5 pt-14 pb-6 sm:flex sm:items-center sm:justify-center sm:gap-0 sm:px-0 sm:pt-0 sm:pb-0"
      style={{ opacity: carOpacity, pointerEvents }}
    >
      <motion.div
        style={{ x: textX, opacity: textOpacity }}
        className="pointer-events-none z-20 order-2 flex w-full justify-center sm:absolute sm:inset-x-0 sm:bottom-8 sm:top-24 sm:left-[6%] sm:right-auto sm:order-none sm:w-[min(34rem,42vw)] sm:items-center sm:justify-start lg:left-[9%] lg:top-28"
      >
        <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-border-strong bg-graphite-3/70 p-6 text-center shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:text-left">
          <TextContent vehicle={vehicle} onExplore={onExplore} />
        </div>
      </motion.div>

      <div
        role="button"
        tabIndex={0}
        aria-label={`View ${vehicle.brand} ${vehicle.model} details`}
        onClick={onExplore}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onExplore();
          }
        }}
        className="relative order-1 h-[30vh] w-[88vw] max-w-3xl cursor-pointer sm:order-none sm:h-[52vh] sm:w-[92vw] sm:translate-x-[6vw] md:translate-x-[9vw] lg:h-[58vh] lg:w-[52vw] lg:translate-x-[15vw] xl:translate-x-[18vw]"
      >
        <motion.div
          style={{ x: carX, scale: carScale, filter: carBlurFilter, rotate: carRotate }}
          className="relative h-full w-full"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[55%] w-[85%] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70 blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${vehicle.accent}35, transparent 72%)` }}
          />
          <div className="absolute bottom-[10%] left-1/2 h-[8%] w-[52%] -translate-x-1/2 rounded-full bg-black/60 blur-2xl" />
          <div
            className="absolute inset-0"
            style={{
              maskImage: "radial-gradient(ellipse 54% 60% at 50% 56%, black 82%, transparent 99%)",
              WebkitMaskImage: "radial-gradient(ellipse 54% 60% at 50% 56%, black 82%, transparent 99%)",
            }}
          >
            <Image
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              sizes="(max-width: 768px) 92vw, 52vw"
              className="scale-[1.15] object-contain"
              priority={index === 0}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CarFigure({
  vehicle,
  index,
  onExplore,
  order,
}: {
  vehicle: Vehicle;
  index: number;
  onExplore: () => void;
  order: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View ${vehicle.brand} ${vehicle.model} details`}
      onClick={onExplore}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExplore();
        }
      }}
      className={`relative ${order} h-[30vh] w-[88vw] max-w-3xl cursor-pointer sm:h-[52vh] sm:w-[92vw] sm:translate-x-[6vw] md:translate-x-[9vw] lg:h-[58vh] lg:w-[52vw] lg:translate-x-[15vw] xl:translate-x-[18vw]`}
    >
      <div className="absolute bottom-[10%] left-1/2 h-[8%] w-[52%] -translate-x-1/2 rounded-full bg-black/60 blur-2xl" />
      <Image
        src={vehicle.image}
        alt={`${vehicle.brand} ${vehicle.model}`}
        fill
        sizes="(max-width: 768px) 92vw, 52vw"
        className="object-contain"
        priority={index === 0}
      />
    </div>
  );
}

function TextContent({ vehicle, onExplore }: { vehicle: Vehicle; onExplore: () => void }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-light">{vehicle.brand}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold leading-[1.05] text-off-white sm:text-4xl">
        {vehicle.model}
      </h2>
      <p className="mt-3 text-sm text-titanium/80 sm:text-base">{vehicle.tagline}</p>

      <div className="mt-5 flex items-center justify-center gap-4 sm:justify-start">
        <span className="font-display text-xl font-semibold text-off-white sm:text-2xl">{vehicle.price}</span>
        <span className="h-4 w-px bg-border-strong" />
        <span className="text-sm font-medium text-titanium/80">{vehicle.keySpec}</span>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:justify-start">
        <button
          type="button"
          onClick={onExplore}
          className="rounded-full border border-teal/50 bg-gradient-to-b from-teal-light to-teal px-6 py-3 text-sm font-semibold text-graphite shadow-[0_8px_24px_-8px_rgba(0,140,145,0.55)] transition-all duration-200 hover:brightness-105 active:scale-[0.97]"
        >
          Explore Vehicle
        </button>
        <a
          href="#test-drive"
          className="rounded-full border border-border-strong bg-graphite-4/60 px-6 py-3 text-center text-sm font-semibold text-off-white transition-all duration-200 hover:border-titanium active:scale-[0.97]"
        >
          Book a Test Drive
        </a>
      </div>
    </>
  );
}
