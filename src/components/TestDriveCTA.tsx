"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { vehicles } from "@/lib/data";

export function TestDriveCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="test-drive" className="relative overflow-hidden border-t border-border-hair py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,140,145,0.14) 0%, transparent 60%)" }}
      />
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
              Get Behind the Wheel
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.08] text-off-white sm:text-4xl lg:text-5xl">
              Ready to Experience It?
            </h2>
            <p className="mt-4 max-w-md text-sm text-titanium/80 sm:text-base">
              The right car isn&rsquo;t just something you own. It&rsquo;s something
              you experience. Book a private test drive at your nearest showroom.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="rounded-3xl border border-border-strong bg-graphite-3/70 p-6 backdrop-blur-md sm:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                <p className="font-display text-lg font-semibold text-off-white">Request received</p>
                <p className="text-sm text-titanium/70">
                  Our concierge team will confirm your test drive shortly.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" required />
                <Field label="Phone Number" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" className="sm:col-span-2" />
                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-gray">
                    Vehicle of Interest
                  </span>
                  <select
                    name="vehicle"
                    className="rounded-lg border border-border-hair bg-graphite-4/50 px-3.5 py-2.5 text-sm text-off-white focus:border-teal/50 focus:outline-none"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id} className="bg-graphite-3">
                        {v.brand} {v.model}
                      </option>
                    ))}
                  </select>
                </label>
                <Field label="Preferred Date" name="date" type="date" />
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-teal py-3.5 text-sm font-semibold text-graphite shadow-[0_8px_24px_-8px_rgba(0,140,145,0.55)] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                  >
                    Book a Test Drive
                  </button>
                </div>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-gray">
        {label}
        {required && <span className="text-teal-light"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-lg border border-border-hair bg-graphite-4/50 px-3.5 py-2.5 text-sm text-off-white placeholder:text-muted-gray focus:border-teal/50 focus:outline-none"
      />
    </label>
  );
}
