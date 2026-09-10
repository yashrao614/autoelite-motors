"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function Lifestyle() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden border-t border-border-hair sm:h-[85vh]">
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0d0f10 0%, #14171a 38%, #191d20 55%, #0b0c0d 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(0,140,145,0.06) 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        {/* horizon light strip */}
        <div className="absolute inset-x-0 top-[52%] h-px bg-gradient-to-r from-transparent via-teal-light/50 to-transparent blur-[1px]" />
        <div className="absolute inset-x-[10%] top-[52%] h-[2px] bg-gradient-to-r from-transparent via-teal/30 to-transparent blur-md" />
        {/* road streaks */}
        <div className="absolute inset-x-0 bottom-0 top-[52%] [perspective:600px]">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(174,180,184,0.08) 0px, rgba(174,180,184,0.08) 2px, transparent 2px, transparent 90px)",
              transform: "rotateX(60deg) scale(2)",
              transformOrigin: "50% 0%",
            }}
          />
        </div>
      </motion.div>

      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-medium uppercase tracking-[0.4em] text-teal-light"
        >
          Beyond the Showroom
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-4 font-display text-3xl font-semibold leading-[1.08] text-off-white sm:text-5xl lg:text-6xl"
        >
          A JOURNEY
          <br />
          BEYOND DESTINATIONS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-5 max-w-md text-sm text-titanium/70 sm:text-base"
        >
          Every AutoElite vehicle is chosen for the road ahead, not just the
          one behind it. Own the drive. Not just the distance.
        </motion.p>
      </div>
    </section>
  );
}
