import { describe, expect, it } from "vitest";
import { buildGraph, shortestPath } from "@/lib/graph";

describe("plaster graph", () => {
  it("is deterministic", () => {
    expect(buildGraph()).toEqual(buildGraph());
  });

  it("has a connected highlighted path from the first to the last node", () => {
    const g = buildGraph();
    expect(g.path[0]).toBe(0);
    expect(g.path.at(-1)).toBe(g.nodes.length - 1);
    const has = (a: number, b: number) => g.edges.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
    g.path.slice(1).forEach((v, i) => expect(has(g.path[i]!, v)).toBe(true));
  });

  it("finds the shorter of two routes", () => {
    const nodes: [number, number, number][] = [
      [0, 0, 0],
      [1, 0, 0],
      [2, 0, 0],
      [1, 5, 0],
    ];
    expect(
      shortestPath(
        nodes,
        [
          [0, 1],
          [1, 2],
          [0, 3],
          [3, 2],
        ],
        0,
        2,
      ),
    ).toEqual([0, 1, 2]);
  });
});
