"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";

const Scene = dynamic(() => import("./colonnade-scene"), { ssr: false });

const noop = () => () => {};
function capable() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

export function Colonnade({ ratings }: { ratings: number[] }) {
  const can = useSyncExternalStore(noop, capable, () => false);
  const [on, setOn] = useState(true);
  const colours = useSyncExternalStore(
    noop,
    () => {
      const s = getComputedStyle(document.documentElement);
      return `${s.getPropertyValue("--plaster").trim()}|${s.getPropertyValue("--accent").trim()}|${s.getPropertyValue("--ink").trim()}`;
    },
    () => "#ece7de|#8b2a1c|#15130f",
  );
  const [plaster, accent, ink] = colours.split("|") as [string, string, string];
  if (!can) return null;
  return (
    <figure className="mt-8">
      {on && (
        <div className="bg-paper-sunk/40 h-72 w-full md:h-96">
          <Scene ratings={ratings} plaster={plaster} accent={accent} ink={ink} />
        </div>
      )}
      <figcaption className="text-muted mt-2 flex justify-between gap-4 text-xs">
        <span>
          <span className="smallcaps">Plate II.</span> <em className="font-serif text-sm">The Colonnade</em>: one column
          per rated contest; the red capital is the peak. Drag to turn.
        </span>
        <button type="button" className="quiet-link" onClick={() => setOn((v) => !v)} aria-pressed={!on}>
          {on ? "Hide 3D" : "Show 3D"}
        </button>
      </figcaption>
    </figure>
  );
}
