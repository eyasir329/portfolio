import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Writing & docs",
  description: "Essays and a competitive-programming knowledge base by Eyasir Ahamed, in preparation.",
};

const essays = [
  {
    title: "Building NEUPC’s multi-judge tracker",
    about: "Adapters, an extension, and designing for judges that change without notice.",
  },
  { title: "What ICPC Dhaka taught me", about: "Team strategy, time pressure, and the habits I kept afterwards." },
  { title: "Measuring std::vector", about: "Every claim about growth and amortised cost, measured instead of quoted." },
];

export default function WritingPage() {
  return (
    <Container>
      <PageHeader
        kicker="Writing & the library"
        title="In the workshop"
        lede="Nothing is published here yet, and I’d rather show that honestly than fill the page. This is what’s being written."
      />
      <section aria-labelledby="essays" className="border-rule border-t pt-6">
        <h2 id="essays" className="kicker">
          Essays in draft
        </h2>
        <ol className="mt-6">
          {essays.map((e, i) => (
            <li key={e.title} className="border-rule grid gap-2 border-b py-6 md:grid-cols-12 md:gap-6">
              <span className="serial text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl md:col-span-5">{e.title}</h3>
              <p className="text-muted md:col-span-4">{e.about}</p>
              <p className="kicker md:col-span-2 md:text-right">Drafting</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="kb" className="mt-20 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="kicker">The library</p>
          <h2 id="kb" className="mt-2 text-[length:var(--text-h2)]">
            CP Knowledge Base
          </h2>
        </div>
        <div className="md:col-span-7">
          <p className="max-w-measure text-lg leading-relaxed">
            A public roadmap for competitive programming, from the basics of C++ to advanced algorithms. Each topic is
            one self-contained HTML page with interactive demos, measured claims and practice problems. Readers will be
            able to sign in to track their progress across devices.
          </p>
          <p className="text-muted mt-4">First volume: the C++ standard library, starting with std::vector.</p>
        </div>
      </section>
    </Container>
  );
}
