import Link from "next/link";
import { HeroArt } from "@/components/hero/hero-art";
import { GraphPoster } from "@/components/hero/graph-poster";
import { Container, SectionHeading, WallLabel } from "@/components/ui";
import { Sparkline } from "@/components/charts";
import { profile } from "@/content/profile";
import { featuredProjects, projects } from "@/content/projects";
import { certifications, contests, cpSnapshot, education, experiences } from "@/content/record";
import { getCodeforcesProfile } from "@/lib/codeforces";

export const revalidate = 86400;

const chronology = [
  { year: "2026", text: "Graduated in Computer Science & Engineering, Netrokona University" },
  { year: "2025", text: "ICPC Asia Dhaka Regional: 112th of 300+ teams, Mymensingh Divisional Champion" },
  { year: "2025", text: "Programming Secretary, Netrokona University Programming Club; built NEUPC" },
  { year: "2025", text: "AI/ML Expert track, Phitron" },
  { year: "2022", text: "Began B.Sc. in CSE at Netrokona University" },
];

export default async function Home() {
  const cf = await getCodeforcesProfile("eyasir329", cpSnapshot.codeforcesMax);
  const icpc = contests.find((c) => c.featured)!;
  const cfMax = cf.maxRating ?? cpSnapshot.codeforcesMax;

  const proof = [
    { figure: cpSnapshot.solvedLabel, label: "problems solved", href: "/cp" },
    { figure: "112th", label: "ICPC Dhaka ’25 · Div. champion", href: "/cp#contests" },
    { figure: String(cfMax), label: "Codeforces max rating", href: "/cp#codeforces" },
    { figure: String(projects.length), label: "projects shipped or in progress", href: "/projects" },
  ];

  return (
    <>
      {/* Hero */}
      <Container className="grid items-center gap-10 pt-10 pb-12 md:grid-cols-12 md:pt-16 md:pb-20">
        <div className="md:col-span-7">
          <p className="kicker reveal">
            Portfolio <span aria-hidden="true">· MMXXVI</span>
          </p>
          <h1
            className="reveal mt-4 text-[length:var(--text-display)] leading-[0.95]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Eyasir
            <br />
            Ahamed<span className="text-accent">.</span>
          </h1>
          <p className="reveal text-ink mt-5 text-lg md:text-xl" style={{ "--i": 2 } as React.CSSProperties}>
            {profile.role}
            <span className="text-muted"> · full-stack · competitive programmer</span>
          </p>
          <p
            className="reveal text-muted mt-5 max-w-[34rem] font-serif text-xl leading-snug italic md:text-[1.45rem]"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {profile.positioning}
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <Link href="/projects" className="btn btn-primary w-full justify-center sm:w-auto">
              View work
            </Link>
            <Link href="/resume" className="btn btn-secondary w-full justify-center sm:w-auto">
              Read the CV
            </Link>
          </div>
          {profile.availability.open && (
            <p
              className="reveal text-muted mt-6 flex items-start gap-2 text-sm"
              style={{ "--i": 5 } as React.CSSProperties}
            >
              <span className="bg-success mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full" aria-hidden="true" />
              <span>
                <span className="text-ink">Open to junior roles:</span> {profile.availability.roles.join(" · ")}
              </span>
            </p>
          )}
        </div>
        <div className="mx-auto w-full max-w-[26rem] md:col-span-5 md:max-w-none">
          <HeroArt poster={<GraphPoster className="h-full w-full" />} />
        </div>
      </Container>

      {/* Proof strip */}
      <Container>
        <dl className="border-rule grid grid-cols-2 border-y md:grid-cols-4">
          {proof.map((p, i) => (
            <div
              key={p.label}
              className={`border-rule relative flex flex-col px-1 py-6 md:px-6 ${i % 2 ? "border-l pl-5" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l md:pl-6" : ""}`}
            >
              <dt className="kicker order-2 mt-2">{p.label}</dt>
              <dd className="text-ink serial -order-1 font-serif text-4xl md:text-5xl">
                <Link href={p.href} className="hover:text-accent transition-colors after:absolute after:inset-0">
                  {p.figure}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* I · Selected work */}
      <Container className="mt-20 md:mt-28">
        <section aria-labelledby="work">
          <SectionHeading
            n={1}
            kicker="Selected work"
            title="Things I’ve built"
            id="work"
            link={{ href: "/projects", label: "All work" }}
          />
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {[...featuredProjects, projects.find((p) => p.slug === "tourmate")!].map((p, i) => (
              <WallLabel key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>
      </Container>

      {/* II · The contest record */}
      <Container className="mt-20 md:mt-28">
        <section aria-labelledby="record">
          <SectionHeading
            n={2}
            kicker="The contest record"
            title="Trained like software is built"
            id="record"
            link={{ href: "/cp", label: "CP Journey" }}
          />
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="kicker">{icpc.date}</p>
              <p className="text-ink mt-2 font-serif text-3xl leading-tight md:text-4xl">{icpc.name}</p>
              <p className="mt-3 text-lg">
                <span className="text-accent font-medium">{icpc.result}</span>
                <span className="text-muted">
                  {" "}
                  · {icpc.detail} · hosted by {icpc.host}
                </span>
              </p>
              <p className="text-muted max-w-measure mt-6">
                Competitive programming taught me to reason about cost before writing code, to test edge cases first,
                and to stay calm when the clock is running. I bring the same habits to production work.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="border-rule border-l pl-6">
                <p className="kicker">Codeforces · eyasir329</p>
                <p className="text-ink serial mt-2 font-serif text-5xl">{cfMax}</p>
                <p className="text-muted text-sm">max rating{cf.rating ? ` · current ${cf.rating}` : ""}</p>
                {cf.history.length > 1 ? (
                  <Sparkline
                    points={cf.history.map((h) => h.rating)}
                    className="text-accent mt-4 h-14 w-full"
                    label={`Rating over ${cf.history.length} contests`}
                  />
                ) : null}
                <p className="text-muted mt-4 text-sm">
                  {cpSnapshot.solvedLabel} {cpSnapshot.solvedNote}.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* III · Experience & education, in brief */}
      <Container className="mt-20 md:mt-28">
        <section aria-labelledby="chronology">
          <SectionHeading
            n={3}
            kicker="Chronology"
            title="The short version"
            id="chronology"
            link={{ href: "/experience", label: "Experience" }}
          />
          <ol className="mt-8">
            {chronology.map((c, i) => (
              <li
                key={i}
                className="border-rule grid grid-cols-[4.5rem_1fr] gap-4 border-b py-4 md:grid-cols-[8rem_1fr]"
              >
                <span className="serial text-accent font-serif text-lg">{c.year}</span>
                <span>{c.text}</span>
              </li>
            ))}
          </ol>
          <p className="text-muted mt-6 text-sm">
            {experiences.length} leadership role · {education.length} schools · {certifications.length} certifications.{" "}
            <Link href="/about" className="link">
              More about me
            </Link>
          </p>
        </section>
      </Container>

      {/* IV · In the workshop */}
      <Container className="mt-20 md:mt-28">
        <section aria-labelledby="workshop">
          <SectionHeading
            n={4}
            kicker="In the workshop"
            title="What I’m working on now"
            id="workshop"
            link={{ href: "/writing", label: "Writing & docs" }}
          />
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {profile.now.map((item, i) => (
              <li key={i} className="bg-paper-raised border-rule border p-6">
                <span className="serial text-muted text-xs">0{i + 1}</span>
                <p className="mt-3 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* Coda */}
      <Container className="mt-24 md:mt-32">
        <section aria-labelledby="coda" className="text-center">
          <p className="kicker">Coda</p>
          <h2 id="coda" className="mx-auto mt-3 max-w-[20ch] text-[length:var(--text-h1)]">
            Have a problem worth solving<span className="text-accent">?</span>
          </h2>
          <p className="text-muted max-w-measure mx-auto mt-4">
            I’m looking for my first full-time engineering role. I learn fast, I test what I ship, and I like hard
            problems.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Send a message
            </Link>
            <a href={`mailto:${profile.email}`} className="link serial text-sm">
              {profile.email}
            </a>
          </div>
        </section>
      </Container>
    </>
  );
}
