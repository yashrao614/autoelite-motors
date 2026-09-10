"use client";

import { motion } from "motion/react";
import { ShieldCheck, Receipt, HandCoins, UserFocus, Headset } from "@phosphor-icons/react";
import { whyChooseUs } from "@/lib/data";

const icons = [ShieldCheck, Receipt, HandCoins, UserFocus, Headset];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="border-t border-border-hair bg-graphite-2 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
            Why AutoElite
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-off-white sm:text-4xl">
            Built on Trust
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border-hair bg-graphite-3 p-6 transition-colors duration-200 hover:border-teal/30"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                  <Icon size={20} weight="duotone" className="text-teal-light" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-off-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-titanium/75">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
