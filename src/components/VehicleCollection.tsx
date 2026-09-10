"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { vehicles } from "@/lib/data";
import { VehicleCard } from "./VehicleCard";

const VehicleDetailModal = dynamic(
  () => import("./VehicleDetailModal").then((m) => m.VehicleDetailModal),
  { ssr: false }
);

type BrandFilter = "All" | string;

export function VehicleCollection() {
  const [brand, setBrand] = useState<BrandFilter>("All");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const availableBrands = useMemo(
    () => ["All", ...Array.from(new Set(vehicles.map((v) => v.brand)))],
    []
  );

  const filtered = useMemo(
    () =>
      vehicles.filter((v) => {
        const matchesBrand = brand === "All" || v.brand === brand;
        const matchesQuery =
          query.trim().length === 0 ||
          `${v.brand} ${v.model}`.toLowerCase().includes(query.trim().toLowerCase());
        return matchesBrand && matchesQuery;
      }),
    [brand, query]
  );

  const active = vehicles.find((v) => v.id === activeId) ?? null;

  return (
    <section id="collection" className="border-t border-border-hair py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
              Full Inventory
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-off-white sm:text-4xl">
              Vehicle Collection
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border-hair bg-graphite-3 px-4 py-2.5 sm:w-72">
            <MagnifyingGlass size={15} className="text-muted-gray" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vehicles…"
              className="w-full bg-transparent text-sm text-off-white placeholder:text-muted-gray focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {availableBrands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBrand(b)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                brand === b
                  ? "border-teal bg-teal/10 text-teal-light"
                  : "border-border-hair text-titanium hover:border-border-strong hover:text-off-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} onView={() => setActiveId(v.id)} />
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-border-hair bg-graphite-3/50 p-12 text-center text-sm text-titanium/70">
              No vehicles match your search.
            </div>
          )}
        </div>
      </div>

      <VehicleDetailModal vehicle={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
