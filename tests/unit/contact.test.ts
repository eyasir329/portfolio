import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact/schema";

const ok = {
  name: "Rina K.",
  email: "rina@example.com",
  subject: "",
  message: "Hello, I saw your NEUPC project and…",
  website: "",
};

describe("contact schema", () => {
  it("accepts a valid message", () => {
    expect(contactSchema.safeParse(ok).success).toBe(true);
  });
  it("rejects a bad email and a short message with helpful text", () => {
    const r = contactSchema.safeParse({ ...ok, email: "nope", message: "hi" });
    expect(r.success).toBe(false);
    const msgs = r.error!.issues.map((i) => i.message).join(" ");
    expect(msgs).toContain("name@example.com");
    expect(msgs).toContain("20 characters");
  });
  it("flags the honeypot", () => {
    expect(contactSchema.safeParse({ ...ok, website: "spam.example" }).success).toBe(false);
  });
});
