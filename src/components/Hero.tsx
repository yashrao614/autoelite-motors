"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CaretLeft, CaretRight, Play } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section id="site" className="relative flex h-[100dvh] w-full items-center overflow-hidden bg-graphite">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/showroom-hero.png"
          alt="AutoElite showroom"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(21,23,25,0.92) 0%, rgba(21,23,25,0.55) 42%, rgba(21,23,25,0.15) 70%, rgba(21,23,25,0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(21,23,25,0.3) 0%, transparent 25%, transparent 75%, rgba(21,23,25,0.55) 100%)" }}
      />

      <div className="container-page relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-light"
        >
          Luxury Lives Here
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-[1.05] text-off-white sm:text-6xl lg:text-7xl"
        >
          Performance
          <br />
          Meets Elegance
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-titanium sm:text-base"
        >
          Discover a curated collection of exceptional vehicles, selected for
          those who expect more from every drive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#collection"
            className="rounded-full bg-teal px-7 py-3.5 text-center text-sm font-semibold text-graphite shadow-[0_8px_24px_-8px_rgba(0,140,145,0.55)] transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
          >
            Explore Vehicles →
          </a>
          <a
            href="#lifestyle"
            className="group flex items-center justify-center gap-3 text-sm font-semibold text-off-white sm:justify-start"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong transition-colors duration-200 group-hover:border-teal group-hover:text-teal-light">
              <Play size={12} weight="fill" />
            </span>
            Watch Our Story
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-titanium/70">
          <span className="text-off-white">01</span>
          <span className="h-px w-6 bg-border-strong" />
          <span>02</span>
          <span>·</span>
          <span>03</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-off-white/70 backdrop-blur-md transition-colors duration-200 hover:border-teal hover:text-teal-light"
          >
            <CaretLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-off-white/70 backdrop-blur-md transition-colors duration-200 hover:border-teal hover:text-teal-light"
          >
            <CaretRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
