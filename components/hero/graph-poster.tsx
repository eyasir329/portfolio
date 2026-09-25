import { buildGraph, project } from "@/lib/graph";

/**
 * Still of the Plaster Graph: server-rendered SVG, first paint for everyone and the permanent view
 * when WebGL is unavailable, motion is reduced, or 3D is switched off (docs/05 §4).
 */
export function GraphPoster({ className }: { className?: string }) {
  const g = buildGraph();
  const pts = g.nodes.map((n) => project(n));
  const onPath = new Set<string>();
  g.path.forEach((v, i) => {
    const w = g.path[i + 1];
    if (w !== undefined) onPath.add(v < w ? `${v}-${w}` : `${w}-${v}`);
  });
  const S = 120; // scale into the viewBox
  const order = pts.map((p, i) => ({ ...p, i })).sort((a, b) => a.z - b.z);

  return (
    <svg
      viewBox="-260 -240 520 480"
      className={className}
      role="img"
      aria-label="A plaster sculpture of a graph: white nodes joined by edges, with one shortest path picked out in red."
    >
      <defs>
        <radialGradient id="plaster" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--paper-raised)" />
          <stop offset="70%" stopColor="var(--plaster)" />
          <stop offset="100%" stopColor="var(--faint)" />
        </radialGradient>
      </defs>
      <ellipse cx="0" cy="215" rx="170" ry="14" fill="var(--ink)" opacity="0.07" />
      {g.edges.map(([a, b]) => {
        const k = `${a}-${b}`;
        const hot = onPath.has(k);
        return (
          <line
            key={k}
            x1={pts[a]!.x * S}
            y1={-pts[a]!.y * S}
            x2={pts[b]!.x * S}
            y2={-pts[b]!.y * S}
            stroke={hot ? "var(--accent)" : "var(--faint)"}
            strokeWidth={hot ? 3 : 1.6}
            strokeLinecap="round"
            opacity={hot ? 0.95 : 0.55}
          />
        );
      })}
      {order.map(({ x, y, z, i }) => {
        const hot = g.path.includes(i);
        const r = (hot ? 13 : 10) * (1 + z * 0.12);
        return (
          <circle
            key={i}
            cx={x * S}
            cy={-y * S}
            r={r}
            fill={hot ? "var(--accent)" : "url(#plaster)"}
            stroke="var(--ink)"
            strokeOpacity={0.12}
          />
        );
      })}
    </svg>
  );
}
