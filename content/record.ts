import { z } from "zod";
import {
  certificationSchema,
  contestSchema,
  educationSchema,
  experienceSchema,
  judgeSchema,
  skillGroupSchema,
} from "./schema";

export const experiences = z.array(experienceSchema).parse([
  {
    id: "programming-secretary",
    kind: "Leadership",
    title: "Programming Secretary",
    organisation: "Netrokona University Programming Club",
    start: "Aug 2025",
    end: "Aug 2026",
    location: "Netrokona, Bangladesh",
    highlights: [
      "Designed a competitive-programming syllabus and ran practice contests and training sessions.",
      "Founded the club's Discord community for discussion, resources and contest announcements.",
      "Built and maintained the NEUPC platform to track members' progress across online judges.",
    ],
    related: ["neupc"],
  },
]);

export const education = z.array(educationSchema).parse([
  {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Netrokona University",
    years: "2022 – 2026",
    result: "CGPA 3.51 / 4.00",
    note: "CGPA after six semesters; final result to be added.",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "Govt. Ashek Mahmud College",
    years: "2019 – 2020",
    result: "GPA 5.00 / 5.00",
  },
  {
    degree: "Secondary School Certificate",
    institution: "Jamalpur Zilla School",
    years: "2017 – 2018",
    result: "GPA 5.00 / 5.00",
  },
]);

export const skills = z.array(skillGroupSchema).parse([
  { group: "Languages", items: ["C++", "C", "Java", "Python", "JavaScript", "TypeScript", "SQL"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"] },
  {
    group: "Backend & data",
    items: ["Node.js", "Express.js", "Supabase", "REST APIs", "OAuth 2.0", "PostgreSQL", "MySQL", "MongoDB"],
  },
  { group: "Tools & DevOps", items: ["Git", "Docker", "Linux", "Vercel", "GitHub Actions", "CI/CD"] },
  {
    group: "Concepts",
    items: [
      "Data structures & algorithms",
      "OOP",
      "System design",
      "Database design",
      "Authentication",
      "LLM integration",
    ],
  },
]);

export const featuredSkills = ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Supabase", "C++", "Docker"];

export const certifications = z.array(certificationSchema).parse([
  {
    title: "AI/ML Expert",
    issuer: "Phitron (Batch 01)",
    year: "2025",
    description:
      "A professional AI/ML project track: supervised and unsupervised learning, deep learning and applied AI projects.",
  },
  {
    title: "Responsive Web Design",
    issuer: "Creative IT Institute, Dhaka",
    year: "2021",
    description: "HTML5, CSS3, JavaScript and jQuery.",
  },
]);

export const contests = z.array(contestSchema).parse([
  {
    date: "2025",
    name: "ICPC 2025 Asia Dhaka Regional",
    host: "BUBT",
    result: "112th of 300+ teams",
    detail: "Mymensingh Divisional Champion",
    featured: true,
  },
  {
    date: "2025 – 2026",
    name: "Inter-university programming contests (MU, NSUCEC, BUET)",
    result: "Ranked 40th – 75th",
  },
  {
    date: "Various",
    name: "7+ other national onsite contests",
    host: "UU, DUET, UIU, KUET, IUT and more",
    result: "Participant",
  },
]);

export const judges = z.array(judgeSchema).parse([
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "eyasir329",
    href: "https://codeforces.com/profile/eyasir329",
    note: "Rating history synced daily from the public API.",
  },
]);

export const cpSnapshot = {
  solvedLabel: "1000+",
  solvedNote: "problems solved across online judges",
  codeforcesMax: 1101,
  asOf: "2026-08",
};
