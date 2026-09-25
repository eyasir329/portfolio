import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { profile } from "@/content/profile";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Eyasir Ahamed about junior software engineering roles, projects or contests.",
};

export default function ContactPage() {
  return (
    <Container>
      <PageHeader
        kicker="Contact"
        title="Let’s talk."
        lede="About a junior role, a project, a contest or anything you think I could help with. I reply within two working days."
      />
      <div className="border-rule grid gap-12 border-t pt-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <ContactForm />
        </div>
        <aside className="md:col-span-4 md:col-start-9" aria-label="Other ways to reach me">
          <p className="kicker">Directly</p>
          <p className="mt-3">
            <a href={`mailto:${profile.email}`} className="link serial">
              {profile.email}
            </a>
          </p>
          <p className="kicker mt-8">Elsewhere</p>
          <ul className="mt-3 space-y-2">
            {profile.social
              .filter((s) => s.id !== "email")
              .map((s) => (
                <li key={s.id}>
                  <a href={s.href} className="quiet-link" target="_blank" rel="noreferrer">
                    {s.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
          </ul>
          <p className="kicker mt-8">Based in</p>
          <p className="mt-3">{profile.location} · GMT+6</p>
        </aside>
      </div>
    </Container>
  );
}
