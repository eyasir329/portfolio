"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-page mx-auto px-5 py-24 text-center md:px-8">
      <p className="kicker">Something went wrong</p>
      <h1 className="mt-4 text-[length:var(--text-h1)]">Sorry, this page failed to load.</h1>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Go home
        </Link>
      </div>
    </div>
  );
}
