import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name (at least 2 characters).").max(120),
  email: z.email("Enter an email like name@example.com.").max(200),
  subject: z.string().trim().max(160).optional().default(""),
  message: z
    .string()
    .trim()
    .min(20, "Write at least 20 characters so I can help.")
    .max(5000, "Keep it under 5,000 characters."),
  // Honeypot: real people never see or fill this field.
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactInput, string>>;
      values?: Partial<ContactInput>;
    }
  | { status: "sent"; name: string; email: string; message: string }
  | { status: "unconfigured"; mailto: string };
