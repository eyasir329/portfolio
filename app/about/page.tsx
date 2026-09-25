import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { profile } from "@/content/profile";
import { featuredSkills, skills } from "@/content/record";

export const metadata: Metadata = {
  title: "About",
  description: "About Eyasir Ahamed, junior software engineer from Netrokona, Bangladesh.",
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader kicker="About" title="Hello, I’m Eyasir." lede={profile.shortBio} />

      <div className="border-rule grid gap-12 border-t pt-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="prose-ink max-w-measure text-lg leading-relaxed">
            <p className="dropcap">
              I’m a junior software engineer and a Computer Science &amp; Engineering graduate from Netrokona University
              in Bangladesh. I like building systems that other people depend on: platforms with real users, real
              permissions, and real failure modes.
            </p>
            <p>
              Most of what I know about engineering I learned by shipping. As Programming Secretary of my university’s
              programming club I built NEUPC, the platform the club now runs on: role-based access enforced in the
              database, a tracker that follows members across online judges, and an AI review pipeline that keeps
              working when its provider doesn’t.
            </p>
            <p>
              Competitive programming is the other half of my training. It taught me to estimate cost before writing
              code, to test the edge cases first, and to debug under a clock. In 2025 my team placed 112th of 300+ at
              the ICPC Asia Dhaka Regional and won the Mymensingh division.
            </p>
            <p>
              I’m looking for a first full-time role where I can learn from strong engineers and take ownership early:
              backend or full-stack development, DevOps and cloud, QA, or applied AI.
            </p>
          </div>
          <p className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <Link href="/resume" className="btn btn-secondary">
              Read the CV
            </Link>
          </p>
        </div>

        <aside className="md:col-span-5" aria-label="Skills">
          <p className="kicker">Reach for first</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {featuredSkills.map((s) => (
              <li key={s} className="text-ink border-ink rounded-full border px-3 py-1 text-sm">
                {s}
              </li>
            ))}
          </ul>
          <dl className="mt-10 space-y-6">
            {skills.map((g) => (
              <div key={g.group}>
                <dt className="kicker">{g.group}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <span key={i} className="tag">
                      {i}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <div className="bg-paper-raised border-rule mt-10 border p-6">
            <p className="kicker">Now</p>
            <ul className="mt-3 space-y-2 text-[0.9375rem]">
              {profile.now.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
