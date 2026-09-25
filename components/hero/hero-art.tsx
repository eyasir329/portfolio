"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const Scene = dynamic(() => import("./plaster-graph-scene"), { ssr: false });

function canUse3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2"));
  } catch {
    return false;
  }
}

const noop = () => () => {};

/**
 * Hero art: the SVG poster paints first; the WebGL sculpture fades in over it when the device can
 * run it and motion is allowed. A pause control satisfies WCAG 2.2.2 for the idle rotation.
 */
export function HeroArt({ poster }: { poster: React.ReactNode }) {
  const capable = useSyncExternalStore(noop, canUse3D, () => false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(Boolean(e?.isIntersecting)), { threshold: 0.05 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="relative">
      <div ref={box} className="relative aspect-square w-full">
        <div className={cn("absolute inset-0 transition-opacity duration-700", ready && "opacity-0")}>{poster}</div>
        {capable && (
          <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
            <Scene paused={paused || !visible} onReady={() => setReady(true)} />
          </div>
        )}
      </div>
      <figcaption className="text-muted mt-2 flex items-center justify-between gap-4 text-xs">
        <span>
          <span className="smallcaps">Plate I.</span> <em className="font-serif text-sm">Shortest path</em>, plaster and
          oxblood, 2026.
        </span>
        {capable && ready && (
          <button type="button" className="quiet-link no-print" onClick={() => setPaused((p) => !p)}>
            {paused ? "Resume rotation" : "Pause rotation"}
          </button>
        )}
      </figcaption>
    </figure>
  );
}
