"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  GasPump,
  Gauge,
  Users,
  Wrench,
  Timer,
  CarProfile,
} from "@phosphor-icons/react";
import type { Vehicle } from "@/lib/data";

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
      {vehicle && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${vehicle.brand} ${vehicle.model} details`}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-border-strong bg-graphite-3 shadow-2xl sm:max-h-[85dvh] sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close vehicle details"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-graphite-4/90 text-off-white shadow-sm transition-all duration-150 hover:border-teal/50 hover:text-teal-light active:scale-95"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="overflow-y-auto">
              <div className="relative h-56 overflow-hidden bg-graphite-2 sm:h-64">
                <div
                  className="absolute inset-0 opacity-70"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${vehicle.accent}30, transparent 65%)` }}
                />
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>

              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
                      {vehicle.bodyType} · {vehicle.brand}
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-off-white sm:text-3xl">
                      {vehicle.model}
                    </h3>
                  </div>
                  <p className="font-display text-2xl font-semibold text-off-white sm:text-3xl">
                    {vehicle.price}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: GasPump, label: vehicle.fuel },
                    { icon: Gauge, label: vehicle.power },
                    { icon: Timer, label: `0–100 ${vehicle.zeroToHundred}` },
                    { icon: Users, label: `${vehicle.seating} Seats` },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-border-hair bg-graphite-4/50 px-3 py-3 text-center"
                    >
                      <Icon size={20} weight="duotone" className="text-teal-light" />
                      <span className="text-xs font-medium text-off-white">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="font-display text-base font-semibold text-off-white">Vehicle Details</h4>
                  <div className="mt-2">
                    {specRow("Condition", `${vehicle.condition} · ${vehicle.year}`)}
                    {specRow("Transmission", vehicle.transmission)}
                    {specRow("Engine / Motor", vehicle.engine)}
                    {specRow("Torque", vehicle.torque)}
                    {specRow("Top Speed", vehicle.topSpeed)}
                    {specRow(vehicle.fuel === "Electric" ? "Range" : "Mileage", vehicle.rangeOrMileage)}
                    {specRow("Odometer", vehicle.mileage)}
                    {specRow("Drive Type", vehicle.driveType)}
                    {specRow("Warranty", vehicle.warranty)}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="flex items-center gap-2 font-display text-base font-semibold text-off-white">
                    <Wrench size={18} weight="duotone" className="text-teal-light" />
                    Signature Features
                  </h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {vehicle.features.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-titanium/80">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-light" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h4 className="flex items-center gap-2 font-display text-base font-semibold text-off-white">
                    <CarProfile size={18} weight="duotone" className="text-teal-light" />
                    Available Colors
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {vehicle.colors.map((color) => (
                      <div
                        key={color.name}
                        className="flex items-center gap-2 rounded-full border border-border-hair bg-graphite-4/50 py-1.5 pl-1.5 pr-3"
                      >
                        <span
                          className="h-5 w-5 rounded-full border border-border-strong"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs font-medium text-off-white">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-border-hair pt-6 sm:flex-row">
                  <a
                    href="#test-drive"
                    onClick={onClose}
                    className="flex-1 rounded-full border border-teal/50 bg-gradient-to-b from-teal-light to-teal px-6 py-3.5 text-center text-sm font-semibold text-graphite shadow-[0_8px_20px_-8px_rgba(0,140,145,0.55)] transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
                  >
                    Book Test Drive
                  </a>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="flex-1 rounded-full border border-border-strong px-6 py-3.5 text-center text-sm font-semibold text-off-white transition-all duration-200 hover:border-teal/50 hover:text-teal-light active:scale-[0.98]"
                  >
                    Enquire Now
                  </a>
                </div>
                <p className="mt-4 text-center text-xs text-muted-gray">
                  EMI from ₹{Math.round(vehicle.priceValue * 0.018).toLocaleString("en-IN")}
                  /month · See financing options below
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
