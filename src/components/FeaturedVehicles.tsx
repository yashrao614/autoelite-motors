"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "@phosphor-icons/react";
import { vehicles } from "@/lib/data";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";

const VehicleDetailModal = dynamic(
  () => import("./VehicleDetailModal").then((m) => m.VehicleDetailModal),
  { ssr: false }
);

export function FeaturedVehicles() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = vehicles.find((v) => v.id === activeId) ?? null;
  const wishlist = useWishlist();

  return (
    <section id="inventory" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-teal-light">
            The Collection
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-off-white sm:text-4xl">
            Featured Vehicles
          </h2>
          <p className="mt-3 text-titanium/70">
            Eight vehicles, one showroom. Select any car for the full spec sheet
            and colour options.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((v, i) => {
            const saved = wishlist.includes(v.id);
            return (
              <motion.div
                key={v.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveId(v.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(v.id);
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border-hair bg-graphite-3 text-left transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_18px_40px_-20px_rgba(0,140,145,0.35)]"
              >
                <span className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-teal to-teal-light transition-transform duration-300 group-hover:scale-x-100" />
                <div className="relative h-40 overflow-hidden bg-graphite-2">
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{ background: `radial-gradient(circle at 50% 40%, ${v.accent}25, transparent 65%)` }}
                  />
                  <button
                    type="button"
                    aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={saved}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(v.id);
                    }}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-graphite-4/80 text-titanium backdrop-blur-md transition-all duration-200 hover:text-teal-light active:scale-90"
                  >
                    <Heart size={15} weight={saved ? "fill" : "regular"} className={saved ? "text-teal-light" : undefined} />
                  </button>
                  <Image
                    src={v.image}
                    alt={`${v.brand} ${v.model}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 320px"
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-light">
                    {v.brand}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-off-white">{v.model}</h3>
                  <p className="mt-1 text-sm text-titanium/70">{v.keySpec}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border-hair pt-4">
                    <span className="font-display text-sm font-semibold text-off-white">{v.price}</span>
                    <span className="text-xs font-semibold text-teal-light underline-offset-4 group-hover:underline">
                      Quick View
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <VehicleDetailModal vehicle={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
