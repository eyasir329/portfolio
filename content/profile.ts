import { profileSchema, type Profile } from "./schema";

export const profile: Profile = profileSchema.parse({
  name: "Eyasir Ahamed",
  role: "Junior Software Engineer",
  headline: "Junior Software Engineer · Full-stack · Competitive programmer",
  positioning:
    "I build full-stack web platforms with Next.js, TypeScript and PostgreSQL, and I train for programming contests the way I build software: measured, iterative, and in the open.",
  shortBio:
    "Junior software engineer and CSE graduate from Netrokona University. I build role-based, AI-integrated platforms with Next.js, Node.js and PostgreSQL. ICPC 2025 Asia Dhaka Regionalist (Mymensingh Divisional Champion) with 1000+ problems solved.",
  location: "Netrokona, Bangladesh",
  email: "eyasir329@gmail.com",
  availability: {
    open: true,
    roles: ["Software Engineering", "DevOps & Cloud", "QA", "AI/ML Engineering"],
  },
  social: [
    { id: "github", label: "GitHub", href: "https://github.com/eyasir329" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/eyasir329" },
    { id: "codeforces", label: "Codeforces", href: "https://codeforces.com/profile/eyasir329" },
    { id: "email", label: "Email", href: "mailto:eyasir329@gmail.com" },
  ],
  now: [
    "Looking for a first full-time role as a software engineer: backend, full-stack, DevOps or QA.",
    "Building Joborx, an AI job-hunting assistant with bilingual (English/Bengali) support.",
    "Writing a CP knowledge base: one self-contained HTML page per topic, every claim measured.",
  ],
});
