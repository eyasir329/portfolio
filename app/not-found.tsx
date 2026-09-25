import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center md:py-32">
      <p className="kicker">Error 404</p>
      <h1 className="mx-auto mt-4 max-w-[16ch] text-[length:var(--text-h1)]">
        This page isn’t here<span className="text-accent">.</span>
      </h1>
      <p className="text-muted max-w-measure mx-auto mt-4">It may have moved, or the link may be mistyped.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Go home
        </Link>
        <Link href="/projects" className="btn btn-secondary">
          See the work
        </Link>
      </div>
    </Container>
  );
}
