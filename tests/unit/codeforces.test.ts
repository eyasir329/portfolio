import { describe, expect, it } from "vitest";
import info from "../fixtures/codeforces/info.json";
import rating from "../fixtures/codeforces/rating.json";
import { fallbackProfile, parseProfile, rankTitle, toRatingPoints } from "@/lib/codeforces";

describe("codeforces", () => {
  it("parses profile and history in chronological order", () => {
    const p = parseProfile(info, rating, "2026-01-01T00:00:00Z");
    expect(p.live).toBe(true);
    expect(p.maxRating).toBe(1101);
    expect(p.history).toHaveLength(rating.result.length);
    const dates = p.history.map((h) => h.date);
    expect([...dates].sort()).toEqual(dates);
  });

  it("computes rating deltas", () => {
    const pts = toRatingPoints([
      { contestId: 1, contestName: "A", rank: 10, ratingUpdateTimeSeconds: 2, oldRating: 1000, newRating: 1050 },
      { contestId: 2, contestName: "B", rank: 20, ratingUpdateTimeSeconds: 1, oldRating: 0, newRating: 1000 },
    ]);
    expect(pts.map((p) => [p.contestId, p.delta])).toEqual([
      [2, 1000],
      [1, 50],
    ]);
  });

  it("rejects malformed API responses", () => {
    expect(() => parseProfile({ status: "FAILED" }, rating, "")).toThrow();
  });

  it("falls back honestly", () => {
    const f = fallbackProfile("eyasir329", 1101);
    expect(f).toMatchObject({ live: false, maxRating: 1101, history: [] });
  });

  it("labels ranks", () => {
    expect(rankTitle(1101)).toBe("Newbie");
    expect(rankTitle(1400)).toBe("Specialist");
    expect(rankTitle(2400)).toBe("Grandmaster");
  });
});
