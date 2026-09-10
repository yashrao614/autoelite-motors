"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import type { Vehicle } from "@/lib/data";
import { brandMarks } from "./BrandMarks";

type VehicleDetailModalProps = {
  vehicle: Vehicle | null;
  onClose: () => void;
};

function specRow(label: string, value: string) {
  return (
    <div className="flex items-center justify-between border-b border-border-hair py-3 text-sm">
      <span className="text-muted-gray">{label}</span>
      <span className="font-medium text-off-white">{value}</span>
    </div>
  );
}

export function VehicleDetailModal({ vehicle, onClose }: VehicleDetailModalProps) {
  useEffect(() => {
    if (!vehicle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [vehicle, onClose]);

  return createPortal(
    <AnimatePresence>
      {vehicle && <ModalContent key={vehicle.id} vehicle={vehicle} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}

function ModalContent({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const Mark = brandMarks[vehicle.brand];

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-graphite/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex min-h-full items-start justify-center p-0 sm:items-center sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl overflow-hidden rounded-t-3xl border border-border-strong bg-graphite-2 shadow-2xl sm:rounded-3xl"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close vehicle details"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-graphite/90 text-off-white shadow-sm transition-all duration-150 hover:border-teal hover:text-teal-light active:scale-95"
          >
            <X size={18} weight="bold" />
          </button>

          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-5 sm:p-8">
              <div className="relative h-64 overflow-hidden rounded-2xl bg-graphite-3 sm:h-80">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${vehicle.accent}30, transparent 65%)` }}
                />
                <Image
                  key={vehicle.gallery[activeImage]}
                  src={vehicle.gallery[activeImage]}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-contain p-4"
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {vehicle.gallery.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative h-16 overflow-hidden rounded-xl border bg-graphite-3 transition-colors duration-200 sm:h-20 ${
                      activeImage === i ? "border-teal" : "border-border-hair hover:border-border-strong"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="120px" className="object-contain p-1.5 opacity-90" />
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border-hair p-5 sm:p-8 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-2">
                {Mark && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-graphite-4/60">
                    <Mark className="h-4 w-auto max-w-[18px]" />
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-light">
                  {vehicle.brand}
                </p>
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-off-white sm:text-3xl">
                {vehicle.model}
              </h3>
              <p className="mt-2 font-display text-xl font-bold text-teal-light">{vehicle.price}</p>

              <div className="mt-6">
                {specRow("Engine / Motor", vehicle.engine)}
                {specRow("Power", vehicle.power)}
                {specRow("Torque", vehicle.torque)}
                {specRow("0–100 km/h", vehicle.zeroToHundred)}
                {specRow("Transmission", vehicle.transmission)}
                {specRow("Drive Type", vehicle.driveType)}
                {specRow(
                  vehicle.fuel === "Electric" ? "Range" : "Fuel Type",
                  vehicle.fuel === "Electric" ? vehicle.rangeOrMileage : vehicle.fuel
                )}
                {specRow("Year", String(vehicle.year))}
                {specRow("Mileage", vehicle.mileage)}
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-titanium">
                  Signature Features
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {vehicle.features.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-titanium/90">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="#test-drive"
                  onClick={onClose}
                  className="w-full rounded-full bg-teal py-3.5 text-center text-sm font-semibold text-graphite transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                >
                  Book a Test Drive
                </a>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="w-full rounded-full border border-teal py-3.5 text-center text-sm font-semibold text-teal-light transition-all duration-200 hover:bg-teal hover:text-graphite active:scale-[0.98]"
                >
                  Enquire Now
                </a>
              </div>
              <p className="mt-4 text-center text-xs text-muted-gray">
                EMI from ₹{Math.round(vehicle.priceValue * 0.018).toLocaleString("en-IN")}/month
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
