"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Heart, Gauge, Timer, GasPump } from "@phosphor-icons/react";
import type { Vehicle } from "@/lib/data";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";
import { brandMarks } from "./BrandMarks";

export function VehicleCard({
  vehicle,
  index = 0,
  onView,
}: {
  vehicle: Vehicle;
  index?: number;
  onView: () => void;
}) {
  const wishlist = useWishlist();
  const saved = wishlist.includes(vehicle.id);
  const Mark = brandMarks[vehicle.brand];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-hair bg-graphite-3 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_18px_40px_-20px_rgba(0,140,145,0.35)]"
    >
      <button
        type="button"
        onClick={onView}
        aria-label={`View ${vehicle.brand} ${vehicle.model}`}
        className="relative h-48 overflow-hidden bg-graphite-2 text-left"
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{ background: `radial-gradient(circle at 50% 40%, ${vehicle.accent}22, transparent 65%)` }}
        />
        <Image
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          sizes="(max-width: 768px) 90vw, 320px"
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </button>

      <button
        type="button"
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={saved}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(vehicle.id);
        }}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-graphite/70 text-off-white/80 backdrop-blur-md transition-all duration-200 hover:text-teal-light active:scale-90"
      >
        <Heart size={15} weight={saved ? "fill" : "regular"} className={saved ? "text-teal-light" : undefined} />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            {Mark && (
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-graphite-4/60">
                <Mark className="h-4 w-auto max-w-[18px]" />
              </span>
            )}
            <div>
              <h3 className="font-display text-lg font-bold text-off-white">
                {vehicle.brand} {vehicle.model.split(" ")[0]}
              </h3>
              <p className="mt-0.5 text-sm text-muted-gray">
                {vehicle.model.split(" ").slice(1).join(" ") || vehicle.bodyType}
              </p>
            </div>
          </div>
          <span className="whitespace-nowrap font-display text-base font-bold text-off-white">
            {vehicle.price}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-border-hair pt-4 text-xs text-titanium">
          <span className="flex items-center gap-1.5">
            <Gauge size={15} className="text-teal-light" />
            {vehicle.power}
          </span>
          <span className="flex items-center gap-1.5">
            <Timer size={15} className="text-teal-light" />
            {vehicle.zeroToHundred}
          </span>
          <span className="flex items-center gap-1.5">
            <GasPump size={15} className="text-teal-light" />
            {vehicle.fuel}
          </span>
        </div>

        <button
          type="button"
          onClick={onView}
          className="mt-5 w-full rounded-full border border-teal/60 py-2.5 text-sm font-semibold text-teal-light transition-all duration-200 hover:bg-teal hover:text-graphite active:scale-[0.98]"
        >
          View Details →
        </button>
      </div>
    </motion.div>
  );
}
