"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X, MagnifyingGlass } from "@phosphor-icons/react";
import { vehicles, dealershipName } from "@/lib/data";

const links = [
  { label: "Home", href: "#site" },
  { label: "Vehicles", href: "#collection" },
  { label: "Brands", href: "#brands" },
  { label: "About", href: "#why-us" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

function subscribePastEntry(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}
function getPastEntrySnapshot() {
  const entry = document.getElementById("entry");
  if (!entry) return true;
  const threshold = entry.offsetHeight - window.innerHeight * 0.35;
  return window.scrollY > threshold;
}
function getPastEntryServerSnapshot() {
  return false;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const visible = useSyncExternalStore(
    subscribePastEntry,
    getPastEntrySnapshot,
    getPastEntryServerSnapshot
  );

  const results =
    query.trim().length === 0
      ? []
      : vehicles.filter((v) =>
          `${v.brand} ${v.model}`.toLowerCase().includes(query.trim().toLowerCase())
        );

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border-hair bg-graphite/80 backdrop-blur-md transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <a href="#site" className="font-display text-lg font-bold tracking-tight text-off-white sm:text-xl">
          {dealershipName.slice(0, 4).toUpperCase()}
          <span className="text-teal">{dealershipName.slice(4).toUpperCase()}</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-off-white/85 transition-colors duration-200 hover:text-teal-light"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-teal-light transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="relative">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-off-white/80 transition-colors duration-200 hover:bg-graphite-3 hover:text-teal-light"
            >
              <MagnifyingGlass size={17} />
            </button>

            <AnimatePresence>
              {searchOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-40"
                    onClick={() => setSearchOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div
                    role="dialog"
                    aria-label="Search vehicles"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute right-0 top-full z-50 mt-3 w-80 rounded-2xl border border-border-strong bg-graphite-3 p-4 shadow-2xl"
                  >
                    <input
                      autoFocus
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by brand or model…"
                      className="w-full rounded-full border border-border-hair bg-graphite-4/60 px-4 py-2.5 text-sm text-off-white placeholder:text-muted-gray focus:border-teal/60 focus:outline-none"
                    />
                    <div className="mt-3 max-h-72 overflow-y-auto">
                      {query.trim().length === 0 && (
                        <p className="px-1 py-2 text-xs text-muted-gray">
                          Try &ldquo;BMW&rdquo;, &ldquo;Porsche&rdquo;, or &ldquo;Taycan&rdquo;.
                        </p>
                      )}
                      {query.trim().length > 0 && results.length === 0 && (
                        <p className="px-1 py-2 text-xs text-muted-gray">No vehicles found.</p>
                      )}
                      {results.map((v) => (
                        <a
                          key={v.id}
                          href="#collection"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-graphite-4"
                        >
                          <span className="text-off-white">
                            {v.brand} {v.model}
                          </span>
                          <span className="text-xs font-semibold text-teal-light">{v.price}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#test-drive"
            className="rounded-full border border-teal px-5 py-2.5 text-sm font-semibold text-teal-light transition-all duration-200 hover:bg-teal hover:text-graphite active:scale-[0.97]"
          >
            Book a Test Drive
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-hair text-off-white lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center justify-center"
            >
              {open ? <X size={18} /> : <List size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-border-hair bg-graphite lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-base text-off-white/90 transition-colors duration-200 hover:bg-graphite-3 hover:text-teal-light"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#test-drive"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full border border-teal px-5 py-3 text-center text-sm font-semibold text-teal-light"
              >
                Book a Test Drive
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
