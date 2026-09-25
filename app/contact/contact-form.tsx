"use client";

import { useActionState, useEffect, useRef } from "react";
import type { ContactState } from "@/lib/contact/schema";
import { sendMessage } from "./actions";

const initial: ContactState = { status: "idle" };

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-ink block text-sm font-medium">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-muted text-sm">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="text-accent mt-2 text-sm">
          ! {error}
        </p>
      )}
    </div>
  );
}

const input =
  "bg-paper-raised border-rule text-ink placeholder:text-muted w-full rounded-md border px-3.5 py-3 text-base transition-colors focus:border-[var(--ink)] aria-[invalid=true]:border-[var(--accent)]";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const summary = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") summary.current?.focus();
    if (state.status === "sent" || state.status === "unconfigured") done.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={done} tabIndex={-1} className="bg-paper-raised border-rule border p-8 outline-none" role="status">
        <p className="kicker">Message sent</p>
        <p className="text-ink mt-3 font-serif text-3xl">Thanks, {state.name.split(" ")[0]}.</p>
        <p className="mt-3">I’ll reply to {state.email} within two working days.</p>
        {state.message && (
          <blockquote className="border-rule text-muted mt-6 border-l-2 pl-4 text-sm whitespace-pre-wrap">
            {state.message}
          </blockquote>
        )}
      </div>
    );
  }

  if (state.status === "unconfigured") {
    return (
      <div ref={done} tabIndex={-1} className="bg-paper-raised border-rule border p-8 outline-none" role="status">
        <p className="kicker">One more step</p>
        <p className="text-ink mt-3 font-serif text-2xl">The form isn’t connected yet, so let’s use email.</p>
        <p className="mt-3">Your message is ready in a new email; just press send.</p>
        <a href={state.mailto} className="btn btn-primary mt-6">
          Open in my email app
        </a>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const describe = (id: keyof typeof errors, hint = false) =>
    [hint ? `${id}-hint` : null, errors[id] ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <form action={action} noValidate className="space-y-6">
      {state.status === "error" && (
        <div
          ref={summary}
          tabIndex={-1}
          role="alert"
          className="border-accent bg-accent-wash border-l-2 p-4 outline-none"
        >
          <p className="text-ink font-medium">! {state.message}</p>
          {Object.keys(errors).length > 0 && (
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(errors).map(([k, v]) => (
                <li key={k}>
                  <a href={`#${k}`} className="link">
                    {v}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <p className="text-muted text-sm">* required</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name *" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className={input}
          />
        </Field>
        <Field id="email" label="Email *" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className={input}
          />
        </Field>
      </div>
      <Field id="subject" label="Subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          defaultValue={values.subject}
          className={input}
          placeholder="A role, a project, a contest…"
        />
      </Field>
      <Field id="message" label="Message *" hint="What would you like to talk about?" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe("message", true)}
          className={input}
        />
      </Field>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
