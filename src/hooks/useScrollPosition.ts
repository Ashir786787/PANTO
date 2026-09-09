"use client";

import { useSyncExternalStore } from "react";

function getScrollSnapshot(threshold: number): boolean {
  if (typeof window === "undefined") return false;
  return window.scrollY > threshold;
}

function getScrollSnapshotValue(threshold: number) {
  return () => getScrollSnapshot(threshold);
}

function getScrollSubscribe() {
  return (onStoreChange: () => void) => {
    window.addEventListener("scroll", onStoreChange, { passive: true });
    return () => window.removeEventListener("scroll", onStoreChange);
  };
}

export function useScrollPosition(threshold = 10): boolean {
  return useSyncExternalStore(
    getScrollSubscribe(),
    getScrollSnapshotValue(threshold),
    getScrollSnapshotValue(threshold),
  );
}