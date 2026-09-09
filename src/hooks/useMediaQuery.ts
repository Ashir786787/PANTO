"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    const frame = requestAnimationFrame(() => {
      onChange();
      mql.addEventListener("change", onChange);
    });
    return () => {
      cancelAnimationFrame(frame);
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return matches;
}