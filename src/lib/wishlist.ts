"use client";

import { useSyncExternalStore } from "react";

const KEY = "autoelite-wishlist";
const EVENT = "autoelite-wishlist-change";
const EMPTY: string[] = [];

let cachedRaw: string | null | undefined;
let cachedList: string[] = EMPTY;

function readWishlist(): string[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedList;
  cachedRaw = raw;
  try {
    cachedList = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    cachedList = EMPTY;
  }
  return cachedList;
}

export function getWishlist(): string[] {
  return readWishlist();
}

export function toggleWishlist(id: string) {
  const current = readWishlist();
  const next = current.includes(id)
    ? current.filter((existing) => existing !== id)
    : [...current, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
  return next;
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot() {
  return EMPTY;
}

export function useWishlist() {
  return useSyncExternalStore(subscribe, readWishlist, getServerSnapshot);
}
