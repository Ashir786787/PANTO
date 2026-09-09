"use client";

import { useSyncExternalStore } from "react";

function subscribeToMedia(query: string) {
  return (onStoreChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onStoreChange);
    return () => mql.removeEventListener("change", onStoreChange);
  };
}

function getMediaSnapshot(query: string) {
  return () => window.matchMedia(query).matches;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeToMedia(query),
    getMediaSnapshot(query),
    getMediaSnapshot(query),
  );
}