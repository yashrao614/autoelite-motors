"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPinLine, Phone, EnvelopeSimple, ClockCountdown } from "@phosphor-icons/react";
import { locations, dealershipEmail } from "@/lib/data";

export function Contact() {
  const [activeCity, setActiveCity] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const location = locations[activeCity];

  return (
    <section id="contact" className="border-t border-border-hair bg-graphite-2 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">Visit Us</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-off-white sm:text-4xl">
            Find a Showroom
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-border-strong">
            <div className="flex flex-wrap gap-2 border-b border-border-hair bg-graphite-3 p-3">
              {locations.map((loc, i) => (
                <button
                  key={loc.city}
                  type="button"
                  onClick={() => setActiveCity(i)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
                    activeCity === i ? "bg-teal/20 text-teal-light" : "text-titanium/60 hover:text-off-white"
                  }`}
                >
                  {loc.city}
                </button>
              ))}
            </div>
            <div className="relative h-72 w-full sm:h-96">
              <iframe
                key={location.city}
                title={`AutoElite showroom — ${location.city}`}
                src={location.mapEmbedSrc}
                className="h-full w-full border-0 grayscale invert-[0.92] contrast-[1.05]"
                loading="lazy"
              />
            </div>
            <div className="grid gap-4 bg-graphite-3 p-6 sm:grid-cols-3">
              <InfoRow icon={MapPinLine} label="Address" value={location.address} />
              <InfoRow icon={Phone} label="Phone" value={location.phone} />
              <InfoRow icon={ClockCountdown} label="Hours" value={location.hours} />
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="rounded-3xl border border-border-strong bg-graphite-3/70 p-6 sm:p-8"
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
                <p className="font-display text-lg font-semibold text-off-white">Message sent</p>
                <p className="text-sm text-titanium/70">We&rsquo;ll reply within one business day.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" name="name" required />
                  <Field label="Phone Number" name="phone" type="tel" />
                </div>
                <Field label="Email" name="email" type="email" required />
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-gray">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    className="resize-none rounded-lg border border-border-hair bg-graphite-4/50 px-3.5 py-2.5 text-sm text-off-white placeholder:text-muted-gray focus:border-teal/50 focus:outline-none"
                    placeholder="Tell us what you're looking for…"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-1 w-full rounded-full bg-teal py-3.5 text-sm font-semibold text-graphite shadow-[0_8px_24px_-8px_rgba(0,140,145,0.55)] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                >
                  Send Message
                </button>
                <p className="flex items-center justify-center gap-2 text-xs text-muted-gray">
                  <EnvelopeSimple size={14} /> {dealershipEmail}
                </p>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPinLine;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={16} className="mt-0.5 shrink-0 text-teal-light" />
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-gray">{label}</p>
        <p className="mt-0.5 text-sm text-off-white">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
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
