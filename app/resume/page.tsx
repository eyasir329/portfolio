import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { certifications, contests, cpSnapshot, education, experiences, skills } from "@/content/record";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "CV",
  description: "The CV of Eyasir Ahamed, junior software engineer. Printable as a PDF.",
};

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="kicker border-rule mt-8 border-b pb-2 print:mt-5">{children}</h2>;
}

export default function ResumePage() {
  const shown = projects.filter((p) => p.slug !== "surveillance-car");
  return (
    <Container className="max-w-[52rem]">
      <div className="no-print flex flex-wrap items-center justify-between gap-4 pt-10">
        <p className="text-muted text-sm">This page is the CV. It prints cleanly on A4 and Letter.</p>
        <PrintButton />
      </div>
      <article className="bg-paper-raised border-rule mt-6 border p-8 md:p-12 print:border-0 print:bg-transparent print:p-0">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl print:text-4xl">{profile.name}</h1>
            <p className="text-ink mt-2 text-lg">{profile.role}</p>
          </div>
          <address className="text-muted text-right text-sm not-italic">
            {profile.location}
            <br />
            <a href={`mailto:${profile.email}`} className="quiet-link">
              {profile.email}
            </a>
            <br />
            github.com/eyasir329 · linkedin.com/in/eyasir329
          </address>
        </header>
        <p className="mt-6 leading-relaxed">{profile.shortBio}</p>

        <H>Experience</H>
        {experiences.map((e) => (
          <section key={e.id} className="mt-4">
            <div className="flex flex-wrap justify-between gap-2">
              <h3 className="font-sans text-base font-semibold">
                {e.title}, {e.organisation}
              </h3>
              <span className="serial text-muted text-sm">
                {e.start} – {e.end}
              </span>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9375rem]">
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        ))}

        <H>Projects</H>
        {shown.map((p) => (
          <section key={p.slug} className="mt-4 break-inside-avoid">
            <div className="flex flex-wrap justify-between gap-2">
              <h3 className="font-sans text-base font-semibold">
                {p.title} <span className="text-muted font-normal">— {p.subtitle}</span>
              </h3>
              <span className="text-muted text-sm italic">{p.medium.slice(0, 4).join(", ")}</span>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9375rem]">
              {p.highlights.slice(0, p.featured ? 3 : 1).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        ))}

        <H>Competitive programming</H>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.9375rem]">
          {contests.map((c) => (
            <li key={c.name}>
              <strong className="font-semibold">{c.name}</strong>: {c.result}
              {c.detail ? ` · ${c.detail}` : ""}
            </li>
          ))}
          <li>
            {cpSnapshot.solvedLabel} {cpSnapshot.solvedNote}; Codeforces max rating {cpSnapshot.codeforcesMax}.
          </li>
        </ul>

        <H>Education</H>
        {education.map((ed) => (
          <div key={ed.degree} className="mt-3 flex flex-wrap justify-between gap-2 text-[0.9375rem]">
            <span>
              <strong className="font-semibold">{ed.degree}</strong>, {ed.institution} · {ed.result}
            </span>
            <span className="serial text-muted text-sm">{ed.years}</span>
          </div>
        ))}

        <H>Skills</H>
        <dl className="mt-3 grid gap-y-1 text-[0.9375rem] sm:grid-cols-[10rem_1fr]">
          {skills.map((g) => (
            <div key={g.group} className="contents">
              <dt className="font-semibold">{g.group}</dt>
              <dd>{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>

        <H>Certifications</H>
        <ul className="mt-3 space-y-1 text-[0.9375rem]">
          {certifications.map((c) => (
            <li key={c.title}>
              <strong className="font-semibold">{c.title}</strong>, {c.issuer} ({c.year})
            </li>
          ))}
        </ul>
      </article>
    </Container>
  );
}
