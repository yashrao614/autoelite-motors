"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X, MagnifyingGlass, Heart, TrashSimple } from "@phosphor-icons/react";
import { vehicles, dealershipName } from "@/lib/data";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";

const links = [
  { label: "Home", href: "#site" },
  { label: "Vehicles", href: "#inventory" },
  { label: "Brands", href: "#brands" },
  { label: "About", href: "#experience" },
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
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [query, setQuery] = useState("");
  const visible = useSyncExternalStore(
    subscribePastEntry,
    getPastEntrySnapshot,
    getPastEntryServerSnapshot
  );
  const wishlistIds = useWishlist();
  const wishlistVehicles = vehicles.filter((v) => wishlistIds.includes(v.id));

  const results =
    query.trim().length === 0
      ? []
      : vehicles.filter((v) =>
          `${v.brand} ${v.model}`.toLowerCase().includes(query.trim().toLowerCase())
        );

  const closePanels = () => {
    setSearchOpen(false);
    setWishlistOpen(false);
  };

  useEffect(() => {
    if (!searchOpen && !wishlistOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanels();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, wishlistOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border-hair bg-graphite/70 backdrop-blur-md transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <a href="#site" className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_10px_2px_rgba(0,140,145,0.6)]" />
          <span className="font-display text-lg font-semibold tracking-tight text-off-white sm:text-xl">
            {dealershipName.slice(0, 4).toUpperCase()}
            <span className="text-teal-light">{dealershipName.slice(4)}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group/link relative rounded-full px-4 py-2 text-sm font-medium text-titanium transition-colors duration-200 hover:text-off-white"
            >
              {link.label}
              <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-teal-light transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/link:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative flex items-center gap-1 rounded-full border border-border-hair p-1.5">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((v) => !v);
                setWishlistOpen(false);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-titanium transition-colors duration-200 hover:bg-graphite-4 hover:text-teal-light"
            >
              <MagnifyingGlass size={17} />
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              aria-expanded={wishlistOpen}
              onClick={() => {
                setWishlistOpen((v) => !v);
                setSearchOpen(false);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-titanium transition-colors duration-200 hover:bg-graphite-4 hover:text-teal-light"
            >
              <Heart size={17} />
              {wishlistVehicles.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal text-[10px] font-semibold text-graphite">
                  {wishlistVehicles.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {searchOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-40"
                    onClick={closePanels}
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
                          Try &ldquo;Porsche&rdquo;, &ldquo;BMW&rdquo;, or &ldquo;Taycan&rdquo;.
                        </p>
                      )}
                      {query.trim().length > 0 && results.length === 0 && (
                        <p className="px-1 py-2 text-xs text-muted-gray">No vehicles found.</p>
                      )}
                      {results.map((v) => (
                        <a
                          key={v.id}
                          href="#inventory"
                          onClick={closePanels}
                          className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-graphite-4"
                        >
                          <span>
                            <span className="block font-medium text-off-white">
                              {v.brand} {v.model}
                            </span>
                            <span className="text-xs text-muted-gray">{v.bodyType}</span>
                          </span>
                          <span className="text-xs font-semibold text-teal-light">{v.price}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {wishlistOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-40"
                    onClick={closePanels}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div
                    role="dialog"
                    aria-label="Wishlist"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute right-0 top-full z-50 mt-3 w-80 rounded-2xl border border-border-strong bg-graphite-3 p-4 shadow-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-semibold text-off-white">Wishlist</h3>
                      {wishlistVehicles.length > 0 && (
                        <span className="text-xs text-muted-gray">{wishlistVehicles.length} saved</span>
                      )}
                    </div>
                    <div className="mt-3 max-h-72 overflow-y-auto">
                      {wishlistVehicles.length === 0 ? (
                        <p className="px-1 py-2 text-xs text-muted-gray">
                          No vehicles saved yet. Tap the heart on any car to save it here.
                        </p>
                      ) : (
                        wishlistVehicles.map((v) => (
                          <div
                            key={v.id}
                            className="flex items-center justify-between gap-2 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-graphite-4"
                          >
                            <a href="#inventory" onClick={closePanels} className="flex-1">
                              <span className="block font-medium text-off-white">
                                {v.brand} {v.model}
                              </span>
                              <span className="text-xs text-teal-light">{v.price}</span>
                            </a>
                            <button
                              type="button"
                              aria-label={`Remove ${v.model} from wishlist`}
                              onClick={() => toggleWishlist(v.id)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-gray transition-colors hover:bg-graphite-4 hover:text-off-white"
                            >
                              <TrashSimple size={14} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <a
            href="#test-drive"
            className="rounded-full border border-teal/50 bg-gradient-to-b from-teal-light to-teal px-5 py-2.5 text-sm font-semibold text-graphite shadow-[0_8px_20px_-8px_rgba(0,140,145,0.55)] transition-all duration-200 hover:brightness-105 active:scale-[0.97]"
          >
            Book a Test Drive
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-hair bg-graphite-3/60 text-off-white backdrop-blur-md lg:hidden"
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
                  className="rounded-lg px-2 py-3 text-base text-titanium transition-colors duration-200 hover:bg-graphite-3 hover:text-off-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#test-drive"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full border border-teal/50 bg-gradient-to-b from-teal-light to-teal px-5 py-3 text-center text-sm font-semibold text-graphite"
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
