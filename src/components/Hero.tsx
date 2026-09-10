"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Play } from "@phosphor-icons/react";

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

      <div className="relative z-10 w-full pl-6 sm:pl-10 lg:pl-14">
        <div className="max-w-[220px] sm:max-w-xs lg:max-w-sm">
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
            className="mt-4 font-display text-2xl font-bold uppercase leading-[1.15] text-off-white sm:text-3xl lg:text-4xl"
          >
            Performance Meets Elegance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 text-sm leading-relaxed text-titanium sm:text-base"
          >
            Discover a curated collection of exceptional vehicles, selected for
            those who expect more from every drive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-9 flex flex-col items-start gap-4"
          >
            <a
              href="#collection"
              className="whitespace-nowrap rounded-full bg-teal px-7 py-3.5 text-center text-sm font-semibold text-graphite shadow-[0_8px_24px_-8px_rgba(0,140,145,0.55)] transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            >
              Explore Vehicles →
            </a>
            <a
              href="#lifestyle"
              className="group flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-off-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong transition-colors duration-200 group-hover:border-teal group-hover:text-teal-light">
                <Play size={12} weight="fill" />
              </span>
              Watch Our Story
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
