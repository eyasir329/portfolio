import type { RatingPoint } from "@/lib/codeforces";

/** Decorative sparkline; the label carries the meaning for screen readers (UX-03 WF-10 (10)). */
export function Sparkline({ points, className, label }: { points: number[]; className?: string; label: string }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(1, max - min);
  const d = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${((i / (points.length - 1)) * 100).toFixed(2)},${(28 - ((p - min) / span) * 26).toFixed(2)}`,
    )
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={className} role="img" aria-label={label}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * Codeforces rating chart: server-rendered SVG with rank bands (labelled, not colour-only) and a
 * table twin for screen readers and anyone who prefers numbers (NFR-A11Y-08).
 */
export function RatingChart({ history }: { history: RatingPoint[] }) {
  const W = 720;
  const H = 260;
  const pad = { l: 44, r: 12, t: 12, b: 28 };
  const ratings = history.map((h) => h.rating);
  const lo = Math.floor((Math.min(...ratings, 1000) - 100) / 100) * 100;
  const hi = Math.ceil((Math.max(...ratings) + 100) / 100) * 100;
  const x = (i: number) => pad.l + (i / Math.max(1, history.length - 1)) * (W - pad.l - pad.r);
  const y = (r: number) => pad.t + (1 - (r - lo) / (hi - lo)) * (H - pad.t - pad.b);
  const ticks = Array.from({ length: (hi - lo) / 100 + 1 }, (_, i) => lo + i * 100).filter((t) => t % 200 === 0);
  const bands = [
    { from: 0, to: 1200, label: "Newbie" },
    { from: 1200, to: 1400, label: "Pupil" },
    { from: 1400, to: 1600, label: "Specialist" },
    { from: 1600, to: 1900, label: "Expert" },
  ].filter((b) => b.to > lo && b.from < hi);
  const d = history.map((h, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(h.rating).toFixed(1)}`).join(" ");
  const maxIdx = ratings.indexOf(Math.max(...ratings));
  const years = [...new Set(history.map((h) => h.date.slice(0, 4)))];

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="rating-title">
        <title id="rating-title">{`Codeforces rating after each of ${history.length} rated contests, peaking at ${ratings[maxIdx]}.`}</title>
        {bands.map((b, i) => (
          <g key={b.label}>
            <rect
              x={pad.l}
              width={W - pad.l - pad.r}
              y={y(Math.min(b.to, hi))}
              height={y(Math.max(b.from, lo)) - y(Math.min(b.to, hi))}
              fill={i % 2 ? "var(--paper-sunk)" : "transparent"}
              opacity={0.7}
            />
            <text
              x={W - pad.r - 4}
              y={y(Math.min(b.to, hi)) + 14}
              textAnchor="end"
              className="fill-[var(--faint)] text-[11px]"
            >
              {b.label}
            </text>
          </g>
        ))}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--rule)" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="fill-[var(--muted)] font-mono text-[11px]">
              {t}
            </text>
          </g>
        ))}
        {years.map((yr) => {
          const i = history.findIndex((h) => h.date.startsWith(yr));
          return (
            <text key={yr} x={x(i)} y={H - 8} className="fill-[var(--muted)] font-mono text-[11px]">
              {yr}
            </text>
          );
        })}
        <path d={d} fill="none" stroke="var(--ink)" strokeWidth="1.75" strokeLinejoin="round" />
        {history.map((h, i) => (
          <circle
            key={h.contestId}
            cx={x(i)}
            cy={y(h.rating)}
            r={i === maxIdx ? 5 : 2.5}
            fill={i === maxIdx ? "var(--accent)" : "var(--ink)"}
          >
            <title>{`${h.contest}: ${h.rating} (${h.delta >= 0 ? "+" : ""}${h.delta}), rank ${h.rank}, ${h.date}`}</title>
          </circle>
        ))}
      </svg>
      <figcaption className="text-muted mt-2 text-xs">
        Each dot is a rated contest; the red dot is the peak. Hover a dot for details, or open the table below.
      </figcaption>
    </figure>
  );
}
