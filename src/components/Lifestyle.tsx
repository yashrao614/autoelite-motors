"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function Lifestyle() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="lifestyle" ref={ref} className="relative h-[70vh] overflow-hidden sm:h-[85vh]">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/lifestyle-road.png"
          alt="AutoElite lifestyle — a journey beyond destinations"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(21,23,25,0.9) 0%, rgba(21,23,25,0.45) 45%, rgba(21,23,25,0.05) 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(21,23,25,0.25), transparent 30%, rgba(21,23,25,0.4))" }}
      />

      <div className="container-page relative z-10 flex h-full items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.08] text-off-white sm:text-5xl">
            A Journey Beyond Destinations
          </h2>
          <p className="mt-5 text-sm text-titanium sm:text-base">
            It&rsquo;s more than a drive, it&rsquo;s a way of life.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-block rounded-full border border-teal px-6 py-3 text-sm font-semibold text-teal-light transition-all duration-200 hover:bg-teal hover:text-graphite active:scale-[0.97]"
          >
            Explore Our Story →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
