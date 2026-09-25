/**
 * Deterministic graph used by the home hero (S1 "Plaster Graph", docs/05 §3).
 * The same data drives the server-rendered SVG poster and the WebGL scene, so the poster is an
 * honest still of the sculpture rather than a separate illustration.
 */

export type Vec3 = [number, number, number];
export type Graph = {
  nodes: Vec3[];
  edges: [number, number][];
  path: number[]; // a shortest path, highlighted in the accent colour
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dist = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

export function buildGraph(count = 22, seed = 329): Graph {
  const rand = mulberry32(seed);
  const nodes: Vec3[] = [];
  // Points on a Fibonacci sphere, jittered, then squashed a little so it reads as a sculpture.
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const radius = 1.55 + (rand() - 0.5) * 0.5;
    nodes.push([Math.cos(theta) * r * radius * 1.15, y * radius * 0.95, Math.sin(theta) * r * radius]);
  }

  // Connect each node to its nearest neighbours (k = 3), without duplicates.
  const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: dist(n, m) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const k = key(i, j);
        if (!seen.has(k)) {
          seen.add(k);
          edges.push(i < j ? [i, j] : [j, i]);
        }
      });
  });

  return { nodes, edges, path: shortestPath(nodes, edges, 0, count - 1) };
}

/** Dijkstra on Euclidean edge weights: small graph, simple O(V²) version. */
export function shortestPath(nodes: Vec3[], edges: [number, number][], from: number, to: number): number[] {
  const n = nodes.length;
  const adj: [number, number][][] = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    const w = dist(nodes[a]!, nodes[b]!);
    adj[a]!.push([b, w]);
    adj[b]!.push([a, w]);
  }
  const d = Array<number>(n).fill(Infinity);
  const prev = Array<number>(n).fill(-1);
  const done = Array<boolean>(n).fill(false);
  d[from] = 0;
  for (let it = 0; it < n; it++) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!done[i] && (u === -1 || d[i]! < d[u]!)) u = i;
    if (u === -1 || d[u] === Infinity) break;
    done[u] = true;
    for (const [v, w] of adj[u]!) {
      if (d[u]! + w < d[v]!) {
        d[v] = d[u]! + w;
        prev[v] = u;
      }
    }
  }
  if (d[to] === Infinity) return [];
  const path: number[] = [];
  for (let v = to; v !== -1; v = prev[v]!) path.unshift(v);
  return path;
}

/** Orthographic projection for the SVG poster, rotated to match the scene's first frame. */
export function project(v: Vec3, angle = 0.5, tilt = 0.28): { x: number; y: number; z: number } {
  const [x, y, z] = v;
  const cx = Math.cos(angle) * x + Math.sin(angle) * z;
  const cz = -Math.sin(angle) * x + Math.cos(angle) * z;
  const ty = Math.cos(tilt) * y - Math.sin(tilt) * cz;
  const tz = Math.sin(tilt) * y + Math.cos(tilt) * cz;
  return { x: cx, y: ty, z: tz };
}
