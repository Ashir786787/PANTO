"use client";

import { useEffect, useState } from "react";

export function useScrollPosition(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    const frame = requestAnimationFrame(() => {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return scrolled;
}