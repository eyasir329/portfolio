import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader, WallLabel } from "@/components/ui";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects by Eyasir Ahamed: full-stack web platforms, an AI product and a hardware build.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <Container>
      <PageHeader
        kicker="The collection"
        title="Work"
        lede="Each piece is labelled the way a museum labels its exhibits: what it is, what it's made of, and why it exists."
      />
      <section aria-labelledby="featured">
        <h2 id="featured" className="kicker border-rule border-t pt-6">
          Featured
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {featured.map((p, i) => (
            <WallLabel key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section aria-labelledby="more" className="mt-20">
        <h2 id="more" className="kicker border-rule border-t pt-6">
          Also in the collection
        </h2>
        <ul className="mt-4">
          {rest.map((p) => (
            <li key={p.slug} className="border-rule group relative grid gap-2 border-b py-6 md:grid-cols-12 md:gap-6">
              <span className="serial text-muted text-sm md:col-span-1">{p.catalogue}</span>
              <h3 className="text-xl md:col-span-3">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group-hover:text-accent transition-colors after:absolute after:inset-0"
                >
                  {p.title}
                </Link>
              </h3>
              <p className="md:col-span-5">{p.summary}</p>
              <p className="text-muted text-sm italic md:col-span-3 md:text-right">{p.medium.join(", ")}</p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
