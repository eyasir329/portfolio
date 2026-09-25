import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Plate } from "@/components/ui";
import { getProject, projects } from "@/content/projects";
import { experiences } from "@/content/record";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.title} — ${p.subtitle}`, description: p.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length]!;
  const related = experiences.filter((e) => project.related.includes(e.id));

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="text-muted pt-10 text-sm">
        <Link href="/projects" className="quiet-link">
          Work
        </Link>{" "}
        <span aria-hidden="true">/</span> <span aria-current="page">{project.title}</span>
      </nav>

      <header className="grid gap-10 pt-8 pb-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="kicker reveal">
            Cat. No. {project.catalogue} · {project.kind}
          </p>
          <h1
            className="reveal mt-3 text-[length:var(--text-display)] leading-[0.95]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {project.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="text-muted reveal mt-4 font-serif text-2xl italic" style={{ "--i": 2 } as React.CSSProperties}>
            {project.subtitle}
          </p>
          {project.links.length > 0 && (
            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              {project.links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}
                >
                  Visit {l.label.toLowerCase()} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          )}
        </div>
        <aside aria-label="Project facts" className="md:col-span-5">
          <Plate project={project} className="aspect-[16/10]" />
          <dl className="mt-6 grid grid-cols-[7rem_1fr] gap-y-3 text-[0.9375rem]">
            <dt className="kicker pt-1">Role</dt>
            <dd>{project.role}</dd>
            <dt className="kicker pt-1">Medium</dt>
            <dd className="italic">{project.medium.join(", ")}</dd>
            <dt className="kicker pt-1">Status</dt>
            <dd>{project.status}</dd>
            {project.years && (
              <>
                <dt className="kicker pt-1">Years</dt>
                <dd className="serial">{project.years}</dd>
              </>
            )}
          </dl>
        </aside>
      </header>

      <div className="border-rule grid gap-12 border-t pt-12 md:grid-cols-12">
        <article className="md:col-span-8 md:col-start-1">
          <section aria-labelledby="problem">
            <h2 id="problem" className="text-[length:var(--text-h2)]">
              The problem
            </h2>
            <p className="dropcap max-w-measure mt-5 text-lg leading-relaxed">{project.problem}</p>
          </section>

          <section aria-labelledby="built" className="mt-14">
            <h2 id="built" className="text-[length:var(--text-h2)]">
              What I built
            </h2>
            <ol className="max-w-measure mt-6 space-y-5">
              {project.highlights.map((h, i) => (
                <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-2">
                  <span className="text-accent serial font-serif">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ol>
          </section>

          {project.architecture.length > 0 && (
            <section aria-labelledby="decisions" className="mt-14">
              <h2 id="decisions" className="text-[length:var(--text-h2)]">
                Decisions
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {project.architecture.map((a) => (
                  <div key={a.title} className="border-accent border-l-2 pl-5">
                    <h3 className="text-lg">{a.title}</h3>
                    <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">{a.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.learned.length > 0 && (
            <section aria-labelledby="learned" className="mt-14">
              <h2 id="learned" className="text-[length:var(--text-h2)]">
                What I learned
              </h2>
              <ul className="max-w-measure mt-6 space-y-4">
                {project.learned.map((l) => (
                  <li key={l} className="font-serif text-xl leading-snug italic">
                    “{l}”
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {related.length > 0 && (
          <aside aria-label="Related" className="md:col-span-4">
            <p className="kicker">Related</p>
            {related.map((e) => (
              <Link
                key={e.id}
                href="/experience"
                className="bg-paper-raised border-rule mt-4 block border p-5 hover:border-[var(--faint)]"
              >
                <span className="text-ink font-serif text-lg">{e.title}</span>
                <span className="text-muted block text-sm">
                  {e.organisation} · {e.start} – {e.end}
                </span>
              </Link>
            ))}
          </aside>
        )}
      </div>

      <nav aria-label="Next project" className="border-rule mt-20 border-t pt-8">
        <p className="kicker">Next in the collection</p>
        <Link href={`/projects/${next.slug}`} className="group mt-2 inline-flex items-baseline gap-3">
          <span className="group-hover:text-accent font-serif text-[length:var(--text-h2)] transition-colors">
            {next.title}
          </span>
          <span className="text-muted">→</span>
        </Link>
      </nav>
    </Container>
  );
}
