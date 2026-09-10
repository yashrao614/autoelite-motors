"use client";

import { motion } from "motion/react";
import { brands } from "@/lib/data";
import { brandMarks } from "./BrandMarks";

export function Brands() {
  return (
    <section id="brands" className="border-t border-border-hair bg-graphite-2 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
            Authorized Dealer
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-off-white sm:text-4xl">
            Premium Brands
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {brands.map((brand, i) => {
            const Mark = brandMarks[brand];
            return (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group flex h-32 flex-col items-center justify-center gap-3 rounded-2xl border bg-graphite-3 px-4 text-center transition-all duration-300 hover:-translate-y-1 sm:h-36 ${
                  i === 0
                    ? "border-teal shadow-[0_0_0_1px_rgba(0,140,145,0.5)]"
                    : "border-border-hair hover:border-teal/50"
                }`}
              >
                <Mark className="h-9 w-auto max-w-[70px] transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-off-white/80">
                  {brand}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
