import { z } from "zod";

/**
 * Content schemas. Content lives in typed files under `content/` for now (P2 moves it to Supabase,
 * docs/07-database-design.md). Every file is validated by `content/content.test.ts`, so a typo in a
 * URL or a missing field fails CI instead of production.
 */

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.url(),
});

export const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  headline: z.string(),
  positioning: z.string(),
  shortBio: z.string().max(320),
  location: z.string(),
  email: z.email(),
  availability: z.object({
    open: z.boolean(),
    roles: z.array(z.string()).min(1),
  }),
  social: z.array(linkSchema.extend({ id: z.enum(["github", "linkedin", "codeforces", "email"]) })),
  now: z.array(z.string()),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  catalogue: z.string().regex(/^\d{2}$/),
  title: z.string(),
  subtitle: z.string(),
  kind: z.enum(["Web platform", "AI product", "Hardware"]),
  status: z.enum(["Maintained", "In progress", "Completed"]),
  years: z.string().optional(),
  role: z.string(),
  medium: z.array(z.string()).min(1),
  summary: z.string().max(220),
  featured: z.boolean(),
  problem: z.string(),
  highlights: z.array(z.string()).min(1),
  architecture: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
  learned: z.array(z.string()).default([]),
  links: z.array(linkSchema).default([]),
  related: z.array(z.string()).default([]),
});

export const experienceSchema = z.object({
  id: z.string(),
  kind: z.enum(["Leadership", "Work", "Teaching", "Volunteer"]),
  title: z.string(),
  organisation: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string().optional(),
  highlights: z.array(z.string()).min(1),
  related: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  years: z.string(),
  result: z.string(),
  note: z.string().optional(),
});

export const skillGroupSchema = z.object({
  group: z.string(),
  items: z.array(z.string()).min(1),
});

export const certificationSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  year: z.string(),
  description: z.string(),
});

export const contestSchema = z.object({
  date: z.string(),
  name: z.string(),
  host: z.string().optional(),
  result: z.string(),
  detail: z.string().optional(),
  featured: z.boolean().default(false),
});

export const judgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  handle: z.string(),
  href: z.url(),
  note: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Contest = z.infer<typeof contestSchema>;
export type Judge = z.infer<typeof judgeSchema>;
