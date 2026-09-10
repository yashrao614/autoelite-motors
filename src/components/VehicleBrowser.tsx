"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import { bodyTypes, fuelTypes, vehicles, type BodyType, type FuelType } from "@/lib/data";

const VehicleDetailModal = dynamic(
  () => import("./VehicleDetailModal").then((m) => m.VehicleDetailModal),
  { ssr: false }
);

type SortKey = "featured" | "price-asc" | "price-desc" | "newest";
type Condition = "All" | "New" | "Pre-Owned";

const priceRanges = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under ₹1.5 Cr", min: 0, max: 15000000 },
  { label: "₹1.5 Cr – ₹2 Cr", min: 15000000, max: 20000000 },
  { label: "Above ₹2 Cr", min: 20000000, max: Infinity },
];

export function VehicleBrowser() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string>("All");
  const [bodyType, setBodyType] = useState<BodyType | "All">("All");
  const [fuel, setFuel] = useState<FuelType | "All">("All");
  const [condition, setCondition] = useState<Condition>("All");
  const [priceIndex, setPriceIndex] = useState(0);
  const [sort, setSort] = useState<SortKey>("featured");
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = vehicles.find((v) => v.id === activeId) ?? null;

  const filtered = useMemo(() => {
    const range = priceRanges[priceIndex];
    let list = vehicles.filter((v) => {
      const matchesQuery =
        query.trim().length === 0 ||
        `${v.brand} ${v.model}`.toLowerCase().includes(query.trim().toLowerCase());
      const matchesBrand = brand === "All" || v.brand === brand;
      const matchesBody = bodyType === "All" || v.bodyType === bodyType;
      const matchesFuel = fuel === "All" || v.fuel === fuel;
      const matchesCondition = condition === "All" || v.condition === condition;
      const matchesPrice = v.priceValue >= range.min && v.priceValue < range.max;
      return matchesQuery && matchesBrand && matchesBody && matchesFuel && matchesCondition && matchesPrice;
    });

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc") list.sort((a, b) => b.priceValue - a.priceValue);
    if (sort === "newest") list.sort((a, b) => b.year - a.year);
    return list;
  }, [query, brand, bodyType, fuel, condition, priceIndex, sort]);

  const availableBrands = ["All", ...Array.from(new Set(vehicles.map((v) => v.brand)))];

  return (
    <section id="browse" className="border-t border-border-hair bg-graphite-2 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-teal-light">
              Full Inventory
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-off-white sm:text-4xl">
              Browse the Catalog
            </h2>
          </div>
          <p className="text-sm text-titanium/60">
            {filtered.length} vehicle{filtered.length === 1 ? "" : "s"} available
          </p>
        </div>

        {/* filter bar */}
        <div className="mt-8 rounded-2xl border border-border-hair bg-graphite-3/60 p-4 sm:p-5">
          <div className="flex items-center gap-2 rounded-full border border-border-hair bg-graphite-4/50 px-4 py-2.5">
            <MagnifyingGlass size={16} className="text-muted-gray" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by brand or model…"
              className="w-full bg-transparent text-sm text-off-white placeholder:text-muted-gray focus:outline-none"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Select label="Brand" value={brand} onChange={setBrand} options={availableBrands} />
            <Select
              label="Body Type"
              value={bodyType}
              onChange={(v) => setBodyType(v as BodyType | "All")}
              options={["All", ...bodyTypes]}
            />
            <Select
              label="Powertrain"
              value={fuel}
              onChange={(v) => setFuel(v as FuelType | "All")}
              options={["All", ...fuelTypes]}
            />
            <Select
              label="Condition"
              value={condition}
              onChange={(v) => setCondition(v as Condition)}
              options={["All", "New", "Pre-Owned"]}
            />
            <Select
              label="Price Range"
              value={priceRanges[priceIndex].label}
              onChange={(v) => setPriceIndex(priceRanges.findIndex((r) => r.label === v))}
              options={priceRanges.map((r) => r.label)}
            />
            <Select
              label="Sort By"
              value={sort}
              onChange={(v) => setSort(v as SortKey)}
              options={["featured", "price-asc", "price-desc", "newest"]}
              display={{
                featured: "Featured",
                "price-asc": "Price: Low to High",
                "price-desc": "Price: High to Low",
                newest: "Newest",
              }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-gray">
            <SlidersHorizontal size={14} className="mt-0.5" />
            {brand === "All" && bodyType === "All" && fuel === "All" && condition === "All" && priceIndex === 0 ? (
              <span>No filters applied</span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setBrand("All");
                  setBodyType("All");
                  setFuel("All");
                  setCondition("All");
                  setPriceIndex(0);
                }}
                className="text-teal-light underline-offset-2 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v, i) => (
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border-hair bg-graphite-3 transition-all duration-200 hover:-translate-y-1 hover:border-teal/40"
            >
              <div className="relative h-44 bg-graphite-2">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ background: `radial-gradient(circle at 50% 40%, ${v.accent}22, transparent 65%)` }}
                />
                <Image
                  src={v.image}
                  alt={`${v.brand} ${v.model}`}
                  fill
                  sizes="(max-width: 768px) 92vw, 380px"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border border-border-strong bg-graphite-4/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-titanium backdrop-blur-md">
                  {v.condition}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-light">{v.brand}</p>
                    <h3 className="mt-1 font-display text-base font-semibold text-off-white">{v.model}</h3>
                  </div>
                  <span className="font-display text-sm font-semibold text-off-white">{v.price}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-titanium/60">
                  <span>{v.year}</span>
                  <span>{v.mileage}</span>
                  <span>{v.power}</span>
                  <span>{v.transmission.split(" ")[0]} Trans.</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(v.id);
                  }}
                  className="mt-4 w-full rounded-full border border-border-strong py-2.5 text-xs font-semibold uppercase tracking-wide text-off-white transition-colors duration-200 hover:border-teal/50 hover:text-teal-light"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-border-hair bg-graphite-3/50 p-12 text-center text-sm text-titanium/60">
              No vehicles match your filters. Try widening your search.
            </div>
          )}
        </div>
      </div>

      <VehicleDetailModal vehicle={active} onClose={() => setActiveId(null)} />
    </section>
  );
}

function Select<T extends string>({
  label,
  value,
  onChange,
  options,
  display,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: T[];
  display?: Record<string, string>;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-gray">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-lg border border-border-hair bg-graphite-4/50 px-3 py-2 text-xs font-medium text-off-white focus:border-teal/50 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-graphite-3 text-off-white">
            {display?.[opt] ?? opt}
          </option>
        ))}
      </select>
    </label>
  );
}
