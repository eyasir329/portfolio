"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const first = sheet.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && sheet.current) {
        const items = sheet.current.querySelectorAll<HTMLElement>("a,button");
        const firstItem = items[0];
        const lastItem = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstItem) {
          e.preventDefault();
          lastItem?.focus();
        } else if (!e.shiftKey && document.activeElement === lastItem) {
          e.preventDefault();
          firstItem?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-40 transition-[background-color,border-color] duration-200",
        scrolled
          ? "border-rule border-b bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="max-w-page mx-auto flex h-14 items-center gap-6 px-5 md:h-16 md:px-8">
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="text-ink font-serif text-lg tracking-[0.12em] uppercase"
        >
          Eyasir <span className="text-accent">·</span> Ahamed
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1 text-[0.9375rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 transition-colors",
                    isCurrent(item.href)
                      ? "text-ink decoration-accent underline decoration-2 underline-offset-[0.45em]"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <Link href="/contact" className="btn btn-primary hidden !min-h-9 !px-4 !text-sm md:inline-flex">
            Contact
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="text-ink -mr-2 inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={sheet}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-paper fixed inset-0 z-50 flex flex-col px-6 pt-4 pb-8 md:hidden"
        >
          <div className="flex h-10 items-center justify-between">
            <span className="text-ink font-serif text-lg tracking-[0.12em] uppercase">
              Eyasir <span className="text-accent">·</span> Ahamed
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                menuButton.current?.focus();
              }}
              className="text-ink -mr-2 inline-flex h-11 w-11 items-center justify-center"
            >
              <span className="sr-only">Close menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </div>
          <hr className="mt-3" />
          <nav aria-label="Mobile" className="mt-6 flex-1">
            <ul className="space-y-1">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="text-ink flex items-baseline justify-between py-2 font-serif text-[1.75rem] leading-tight"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-muted text-lg">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-muted flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href="/resume" className="quiet-link">
              CV
            </Link>
            {profile.social
              .filter((s) => s.id !== "email")
              .map((s) => (
                <a key={s.id} href={s.href} className="quiet-link" target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
