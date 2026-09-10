"use client";

import { motion } from "motion/react";
import { brands } from "@/lib/data";

export function Brands() {
  return (
    <section id="brands" className="border-t border-border-hair py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-teal-light">
            Authorized Partners
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-off-white sm:text-4xl">
            The Marques We Represent
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-hair bg-border-hair sm:grid-cols-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group flex h-28 items-center justify-center bg-graphite-2 px-4 transition-colors duration-300 hover:bg-graphite-3 sm:h-36"
            >
              <span className="font-display text-base font-semibold uppercase tracking-[0.08em] text-titanium/50 transition-all duration-300 group-hover:text-teal-light group-hover:[text-shadow:0_0_18px_rgba(0,140,145,0.5)] sm:text-lg">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
