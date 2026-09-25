import { describe, expect, it } from "vitest";
import { profile } from "./profile";
import { projects, getProject } from "./projects";
import { contests, experiences } from "./record";

describe("content", () => {
  it("has unique project slugs and catalogue numbers", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.catalogue)).size).toBe(projects.length);
  });

  it("resolves every cross-reference", () => {
    for (const p of projects) for (const id of p.related) expect(experiences.some((e) => e.id === id)).toBe(true);
    for (const e of experiences) for (const slug of e.related) expect(getProject(slug)).toBeDefined();
  });

  it("presents the owner as a junior software engineer", () => {
    expect(profile.role).toBe("Junior Software Engineer");
    expect(profile.availability.roles.length).toBeGreaterThan(0);
  });

  it("has exactly one featured contest", () => {
    expect(contests.filter((c) => c.featured)).toHaveLength(1);
  });

  it("never commits a phone number", () => {
    expect(JSON.stringify({ profile, projects, contests })).not.toMatch(/\+?880|01[3-9]\d{8}/);
  });
});
