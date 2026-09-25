import { z } from "zod";
import { projectSchema, type Project } from "./schema";

const raw = [
  {
    slug: "neupc",
    catalogue: "01",
    title: "NEUPC",
    subtitle: "Full-stack club management platform",
    kind: "Web platform",
    status: "Maintained",
    role: "Sole developer · Programming Secretary of the club",
    medium: ["Next.js", "Supabase", "PostgreSQL", "Auth.js", "Browser extension"],
    summary:
      "A role-based platform for Netrokona University Programming Club: member progress across online judges, forums, chat and an AI-assisted solution review.",
    featured: true,
    problem:
      "The club ran on spreadsheets and chat threads. Mentors couldn't see who was practising, members had no single place for resources, and contest results were scattered across many online judges.",
    highlights: [
      "Role-based, multi-tenant design (student, mentor, admin) with access control enforced in the database, not only in the UI.",
      "A competitive-programming tracker that integrates dozens of online judges, plus a custom browser extension that syncs submissions and ratings where a judge has no public API.",
      "An AI-assisted solution analysis pipeline that keeps working when an AI provider is down.",
      "Real-time chat, discussion forums and secure sign-in, deployed to production for the club.",
    ],
    architecture: [
      {
        title: "Access control in Postgres",
        body: "Row Level Security policies decide what each role can read and write, so a bug in a page can't leak another member's data.",
      },
      {
        title: "Judges behind adapters",
        body: "Every online judge is integrated through the same interface. Where a judge offers no public data, the browser extension fills the gap.",
      },
      {
        title: "Graceful AI",
        body: "The analysis pipeline treats the AI provider as optional: when it is unavailable, the rest of the platform keeps working.",
      },
    ],
    learned: [
      "Designing permissions first makes every later feature simpler.",
      "Integrations fail in creative ways; health checks and kill switches belong in version one.",
    ],
    links: [{ label: "Repository", href: "https://github.com/eyasir329/NEUPC" }],
    related: ["programming-secretary"],
  },
  {
    slug: "joborx",
    catalogue: "02",
    title: "Joborx",
    subtitle: "AI-powered job-hunting assistant",
    kind: "AI product",
    status: "In progress",
    role: "Designer and developer",
    medium: ["Next.js", "TypeScript", "PostgreSQL", "LLM APIs"],
    summary:
      "Scores job listings against a résumé with plain-language explanations, and prepares interview research automatically. Bilingual: English and Bengali.",
    featured: true,
    problem:
      "Job seekers read hundreds of listings without knowing which ones actually fit, and interview preparation starts from a blank page every time.",
    highlights: [
      "A job-matching engine that scores listings against a résumé and explains each score in plain language.",
      "An automated research agent that prepares interview-prep summaries for a company and role.",
      "Resilient to AI-provider failure, so the product degrades gracefully instead of breaking.",
      "A bilingual (English/Bengali) interface.",
    ],
    architecture: [
      {
        title: "Explainable scoring",
        body: "Every match score carries the reasons behind it, so users can trust or challenge the ranking instead of guessing.",
      },
      {
        title: "Provider fallback",
        body: "The product is designed to keep working when an AI provider fails, the same lesson learned building NEUPC.",
      },
    ],
    learned: ["An AI feature is only as good as its explanation and its failure mode."],
    links: [],
    related: [],
  },
  {
    slug: "tourmate",
    catalogue: "03",
    title: "Tourmate",
    subtitle: "Tour and hotel booking platform",
    kind: "Web platform",
    status: "Completed",
    role: "Full-stack developer",
    medium: ["React", "Express", "MySQL"],
    summary: "Tour and hotel booking with role-based dashboards for travellers, agencies and admins.",
    featured: false,
    problem: "Booking tours and hotels in one place, with separate tools for customers and operators.",
    highlights: [
      "Role-based dashboards for travellers, agencies and administrators.",
      "REST API in Express over a relational MySQL schema.",
    ],
    links: [{ label: "Repository", href: "https://github.com/eyasir329/tourmate" }],
  },
  {
    slug: "eduflow329",
    catalogue: "04",
    title: "Eduflow329",
    subtitle: "Academic management system",
    kind: "Web platform",
    status: "Completed",
    role: "Full-stack developer",
    medium: ["React", "Express", "MySQL"],
    summary: "An academic management system with role-based access for students, teachers and administrators.",
    featured: false,
    problem: "Courses, results and notices managed in one system with the right access for each role.",
    highlights: [
      "Role-based access for students, teachers and administrators.",
      "Relational schema for courses, enrolments and results.",
    ],
    links: [{ label: "Repository", href: "https://github.com/eyasir329/eduflow329" }],
  },
  {
    slug: "surveillance-car",
    catalogue: "05",
    title: "Surveillance Car",
    subtitle: "Wireless camera vehicle",
    kind: "Hardware",
    status: "Completed",
    role: "Builder",
    medium: ["C++", "ESP32"],
    summary: "A wireless camera vehicle on an ESP32 that streams real-time video while being driven remotely.",
    featured: false,
    problem: "Remote visual monitoring from a small, cheap, remotely driven vehicle.",
    highlights: ["Real-time video monitoring over Wi-Fi.", "Motor control and camera on a single ESP32 board."],
    links: [{ label: "Repository", href: "https://github.com/eyasir329/surveillanceCar_using_esp32" }],
  },
] satisfies z.input<typeof projectSchema>[];

export const projects: Project[] = raw.map((p) => projectSchema.parse(p));

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
