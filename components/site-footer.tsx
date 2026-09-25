import Link from "next/link";
import { profile } from "@/content/profile";

const index = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/cp", label: "CP Journey" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "CV" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print border-rule mt-24 border-t md:mt-32">
      <div className="max-w-page mx-auto grid gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div>
          <p className="kicker">Index</p>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            {index.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="quiet-link text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            {profile.social.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  className="quiet-link text-text"
                  {...(s.id === "email" ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  {s.label}
                  {s.id !== "email" && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker">Say hello</p>
          <p className="mt-4 text-[0.9375rem]">Open to junior roles in software engineering, DevOps, QA and AI/ML.</p>
          <p className="mt-3">
            <Link href="/contact" className="link text-[0.9375rem]">
              Send a message →
            </Link>
          </p>
        </div>
        <div>
          <p className="kicker">Colophon</p>
          <p className="text-muted mt-4 text-sm leading-relaxed">
            Set in <span className="font-serif italic">Newsreader</span> and Geist. Built with Next.js, Three.js and
            Supabase. The design, “Marble &amp; Ink”, borrows from museum wall labels and old book typography.
          </p>
        </div>
      </div>
      <div className="border-rule border-t">
        <div className="text-muted max-w-page mx-auto flex flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm md:px-8">
          <p>
            © {year} {profile.name} · Netrokona, Bangladesh
          </p>
          <a href="#main" className="quiet-link">
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
