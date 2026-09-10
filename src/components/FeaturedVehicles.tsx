"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { vehicles } from "@/lib/data";
import { VehicleCard } from "./VehicleCard";

const VehicleDetailModal = dynamic(
  () => import("./VehicleDetailModal").then((m) => m.VehicleDetailModal),
  { ssr: false }
);

const featured = vehicles.slice(0, 4);

export function FeaturedVehicles() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = vehicles.find((v) => v.id === activeId) ?? null;

  return (
    <section className="border-t border-border-hair py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
            Featured
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-off-white sm:text-4xl">
            Featured Vehicles
          </h2>
          <p className="mt-3 text-titanium/80">
            A closer look at the vehicles our clients ask for most.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} onView={() => setActiveId(v.id)} />
          ))}
        </div>
      </div>

      <VehicleDetailModal vehicle={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
