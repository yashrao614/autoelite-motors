"use client";

import { motion } from "motion/react";
import {
  CurrencyCircleDollar,
  ArrowsClockwise,
  MagnifyingGlass,
  ShieldCheckered,
  Sparkle,
  Wrench,
  ClockCountdown,
  Truck,
} from "@phosphor-icons/react";
import { services } from "@/lib/data";

const icons = [
  CurrencyCircleDollar,
  ArrowsClockwise,
  MagnifyingGlass,
  ShieldCheckered,
  Sparkle,
  Wrench,
  ClockCountdown,
  Truck,
];

export function Services() {
  return (
    <section id="services" className="border-t border-border-hair py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-teal-light">Services</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-off-white sm:text-4xl">
            Ownership, Fully Managed
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl border border-border-hair bg-graphite-3/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal/30 hover:bg-graphite-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border-hair bg-graphite-4/60 transition-colors duration-200 group-hover:border-teal/40">
                  <Icon size={18} weight="light" className="text-teal-light" />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-off-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-titanium/60">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
