import { z } from "zod";

/**
 * Codeforces public API (https://codeforces.com/apidoc). Fetched on the server and cached for a
 * day, so visitors never wait on Codeforces. If the API is unreachable the page shows the last
 * known values with an honest "as of" label instead of failing (UX principle U4).
 */

const ratingChange = z.object({
  contestId: z.number(),
  contestName: z.string(),
  rank: z.number(),
  ratingUpdateTimeSeconds: z.number(),
  oldRating: z.number(),
  newRating: z.number(),
});

const userInfo = z.object({
  handle: z.string(),
  rating: z.number().optional(),
  maxRating: z.number().optional(),
  rank: z.string().optional(),
  maxRank: z.string().optional(),
});

const envelope = <T extends z.ZodType>(result: T) => z.object({ status: z.literal("OK"), result });

export type RatingPoint = {
  contestId: number;
  contest: string;
  rank: number;
  date: string; // ISO date
  rating: number;
  delta: number;
};

export type CodeforcesProfile = {
  handle: string;
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  maxRank: string | null;
  history: RatingPoint[];
  live: boolean;
  fetchedAt: string | null;
};

export function toRatingPoints(changes: z.infer<typeof ratingChange>[]): RatingPoint[] {
  return changes
    .slice()
    .sort((a, b) => a.ratingUpdateTimeSeconds - b.ratingUpdateTimeSeconds)
    .map((c) => ({
      contestId: c.contestId,
      contest: c.contestName,
      rank: c.rank,
      date: new Date(c.ratingUpdateTimeSeconds * 1000).toISOString().slice(0, 10),
      rating: c.newRating,
      delta: c.newRating - c.oldRating,
    }));
}

export function parseProfile(infoJson: unknown, ratingJson: unknown, fetchedAt: string): CodeforcesProfile {
  const info = envelope(z.array(userInfo).min(1)).parse(infoJson).result[0]!;
  const changes = envelope(z.array(ratingChange)).parse(ratingJson).result;
  return {
    handle: info.handle,
    rating: info.rating ?? null,
    maxRating: info.maxRating ?? null,
    rank: info.rank ?? null,
    maxRank: info.maxRank ?? null,
    history: toRatingPoints(changes),
    live: true,
    fetchedAt,
  };
}

export function fallbackProfile(handle: string, maxRating: number): CodeforcesProfile {
  return {
    handle,
    rating: null,
    maxRating,
    rank: null,
    maxRank: null,
    history: [],
    live: false,
    fetchedAt: null,
  };
}

export async function getCodeforcesProfile(handle: string, fallbackMax: number): Promise<CodeforcesProfile> {
  // Tests and screenshots use recorded fixtures instead of the network (never set in production).
  const fixtureDir = process.env.CODEFORCES_FIXTURE;
  if (fixtureDir) {
    const { readFile } = await import("node:fs/promises");
    const [info, rating] = await Promise.all(
      ["info", "rating"].map(async (f) => JSON.parse(await readFile(`${fixtureDir}/${f}.json`, "utf8"))),
    );
    return parseProfile(info, rating, "2026-09-25T00:00:00.000Z");
  }
  const base = "https://codeforces.com/api";
  const opts = { next: { revalidate: 60 * 60 * 24 }, signal: AbortSignal.timeout(6000) } as const;
  try {
    const [info, rating] = await Promise.all([
      fetch(`${base}/user.info?handles=${encodeURIComponent(handle)}`, opts).then((r) => r.json()),
      fetch(`${base}/user.rating?handle=${encodeURIComponent(handle)}`, opts).then((r) => r.json()),
    ]);
    return parseProfile(info, rating, new Date().toISOString());
  } catch {
    return fallbackProfile(handle, fallbackMax);
  }
}

/** Codeforces rank titles, used as text labels next to rank colours (never colour alone). */
export function rankTitle(rating: number): string {
  if (rating < 1200) return "Newbie";
  if (rating < 1400) return "Pupil";
  if (rating < 1600) return "Specialist";
  if (rating < 1900) return "Expert";
  if (rating < 2100) return "Candidate Master";
  if (rating < 2300) return "Master";
  if (rating < 2400) return "International Master";
  if (rating < 2600) return "Grandmaster";
  if (rating < 3000) return "International Grandmaster";
  return "Legendary Grandmaster";
}
