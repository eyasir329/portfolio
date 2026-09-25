export const site = {
  name: "Eyasir Ahamed",
  title: "Eyasir Ahamed — Junior Software Engineer",
  description:
    "Junior software engineer building full-stack web platforms with Next.js, TypeScript and PostgreSQL. ICPC 2025 Asia Dhaka Regionalist.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_GB",
  timeZone: "Asia/Dhaka",
} as const;

export const nav = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/cp", label: "CP" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

export const roman = (n: number) =>
  ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] ?? String(n);
