"use client";

import { useEffect, useState } from "react";

/** 0–1 scroll progress through the page, used by river + parallax layers */
export function useRiverProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight;
        // Tip tracks viewport bottom so the river fills through on-screen sections.
        setProgress(
          h <= window.innerHeight
            ? 1
            : Math.min(1, Math.max(0, (window.scrollY + window.innerHeight) / h))
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}
