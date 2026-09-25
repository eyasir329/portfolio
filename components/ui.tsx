import Link from "next/link";
import type { Project } from "@/content/schema";
import { cn } from "@/lib/cn";
import { roman } from "@/lib/site";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("max-w-page mx-auto w-full px-5 md:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  n,
  kicker,
  title,
  id,
  link,
}: {
  n?: number;
  kicker: string;
  title: string;
  id?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="border-rule flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t pt-6">
      <div>
        <p className="kicker">
          {n !== undefined && (
            <span aria-hidden="true" className="text-accent mr-2 font-serif text-sm tracking-normal normal-case">
              {roman(n)} ·
            </span>
          )}
          {kicker}
        </p>
        <h2 id={id} className="mt-2 text-[length:var(--text-h2)]">
          {title}
        </h2>
      </div>
      {link && (
        <Link href={link.href} className="link text-[0.9375rem]">
          {link.label} →
        </Link>
      )}
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-12 pb-10 md:pt-20 md:pb-14">
      <p className="kicker reveal">{kicker}</p>
      <h1 className="reveal mt-3 max-w-[18ch] text-[length:var(--text-h1)]" style={{ "--i": 1 } as React.CSSProperties}>
        {title}
      </h1>
      {lede && (
        <p
          className="text-muted reveal max-w-measure mt-5 font-serif text-xl leading-snug italic md:text-[1.4rem]"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {lede}
        </p>
      )}
      {children}
    </header>
  );
}

/** Deterministic hash → small integers, so each project's plate is unique but stable. */
function seedOf(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/**
 * Catalogue plate: a typographic cover used instead of screenshots (none are faked). The motif is
 * generated from the slug: concentric arcs, a grid of nodes, or stepped bars.
 */
export function Plate({ project, className }: { project: Project; className?: string }) {
  const seed = seedOf(project.slug);
  const motif = (Number(project.catalogue) - 1) % 3;
  const cells = Array.from({ length: 7 }, (_, i) => ((seed >> (i * 3)) & 7) + 2);
  return (
    <div className={cn("bg-paper-sunk relative overflow-hidden", className)} aria-hidden="true">
      <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {motif === 0 &&
          Array.from({ length: 9 }, (_, i) => (
            <circle
              key={i}
              cx={320}
              cy={200}
              r={30 + i * 26}
              fill="none"
              stroke={i === 3 ? "var(--accent)" : "var(--rule)"}
              strokeWidth={i === 3 ? 2 : 1}
            />
          ))}
        {motif === 1 &&
          Array.from({ length: 6 * 10 }, (_, i) => {
            const x = 40 + (i % 10) * 36;
            const y = 40 + Math.floor(i / 10) * 34;
            const hot = (seed >> (i % 24)) & 1 && i % 7 === 0;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={hot ? 5 : 3}
                fill={hot ? "var(--accent)" : "var(--faint)"}
                opacity={hot ? 0.9 : 0.45}
              />
            );
          })}
        {motif === 2 &&
          cells.map((h, i) => (
            <rect
              key={i}
              x={150 + i * 34}
              y={230 - h * 20}
              width={22}
              height={h * 20}
              fill={i === cells.indexOf(Math.max(...cells)) ? "var(--accent)" : "var(--rule)"}
            />
          ))}
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="serial text-muted text-xs">Cat. No. {project.catalogue}</span>
        <span className="text-ink font-serif text-6xl leading-none italic opacity-90 md:text-7xl">
          {project.title.slice(0, 1)}
          <span className="text-accent">.</span>
        </span>
      </div>
    </div>
  );
}

/** Museum wall label: the project card (docs/04 §6.1, UX-07 §2.2). The whole card is one link. */
export function WallLabel({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className="group reveal relative" style={{ "--i": index } as React.CSSProperties}>
      <Plate
        project={project}
        className="aspect-[16/10] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
      />
      <div className="mt-4">
        <h3 className="text-[length:var(--text-h3)]">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
          <span className="text-muted font-sans text-sm">{project.years ? ` · ${project.years}` : ""}</span>
        </h3>
        <p className="text-muted mt-1 text-sm italic">
          <span className="font-serif text-[0.95rem]">Medium:</span> {project.medium.join(", ")}
        </p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed">{project.summary}</p>
        <p className="text-muted mt-3 flex items-center gap-2 text-xs">
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              project.status === "In progress" ? "bg-accent" : "bg-faint",
            )}
          />
          {project.status} · {project.kind}
        </p>
      </div>
    </article>
  );
}
