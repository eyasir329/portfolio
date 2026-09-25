import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { certifications, education, experiences } from "@/content/record";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Experience",
  description: "Leadership, education and certifications of Eyasir Ahamed.",
};

export default function ExperiencePage() {
  return (
    <Container>
      <PageHeader
        kicker="Chronicle"
        title="Experience"
        lede="Where I’ve led, learned and shipped. Short on job titles so far, long on work that other people rely on."
      />

      <section aria-labelledby="roles">
        <h2 id="roles" className="kicker border-rule border-t pt-6">
          Roles
        </h2>
        {experiences.map((e) => (
          <article key={e.id} className="border-rule grid gap-6 border-b py-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="serial text-accent font-serif text-lg">
                {e.start} – {e.end}
              </p>
              <p className="text-muted mt-1 text-sm">{e.kind}</p>
            </div>
            <div className="md:col-span-9">
              <h3 className="text-[length:var(--text-h3)]">{e.title}</h3>
              <p className="text-muted mt-1">
                {e.organisation}
                {e.location ? ` · ${e.location}` : ""}
              </p>
              <ul className="max-w-measure mt-5 space-y-3">
                {e.highlights.map((h) => (
                  <li
                    key={h}
                    className="before:bg-accent relative pl-5 leading-relaxed before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              {e.related.length > 0 && (
                <p className="mt-5 text-sm">
                  Built during this role:{" "}
                  {e.related.map((slug) => {
                    const p = projects.find((x) => x.slug === slug);
                    return p ? (
                      <Link key={slug} href={`/projects/${slug}`} className="link">
                        {p.title}
                      </Link>
                    ) : null;
                  })}
                </p>
              )}
            </div>
          </article>
        ))}
      </section>

      <section aria-labelledby="education" className="mt-20">
        <h2 id="education" className="kicker border-rule border-t pt-6">
          Education
        </h2>
        {education.map((ed) => (
          <article key={ed.degree} className="border-rule grid gap-2 border-b py-8 md:grid-cols-12 md:gap-6">
            <p className="serial text-accent font-serif text-lg md:col-span-3">{ed.years}</p>
            <div className="md:col-span-6">
              <h3 className="text-xl">{ed.degree}</h3>
              <p className="text-muted">{ed.institution}</p>
              {ed.note && <p className="text-muted mt-1 text-sm">{ed.note}</p>}
            </div>
            <p className="serial md:col-span-3 md:text-right">{ed.result}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="certs" className="mt-20">
        <h2 id="certs" className="kicker border-rule border-t pt-6">
          Certifications
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {certifications.map((c) => (
            <article key={c.title} className="bg-paper-raised border-rule border p-6">
              <p className="serial text-muted text-sm">{c.year}</p>
              <h3 className="mt-2 text-xl">{c.title}</h3>
              <p className="text-muted text-sm">{c.issuer}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">{c.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
