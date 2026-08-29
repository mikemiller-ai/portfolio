"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/cn";

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

const REASONS = [
  "Career opportunity",
  "Consulting or advisory",
  "Speaking or collaboration",
  "Professional networking",
  "Other",
];

type Fields = {
  name: string;
  email: string;
  company: string;
  reason: string;
  message: string;
  // Honeypot: real users never fill this; bots do. Kept off-screen and out of
  // the tab order, so a non-empty value means "silently drop".
  website: string;
};

type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const emptyFields: Fields = {
  name: "",
  email: "",
  company: "",
  reason: "",
  message: "",
  website: "",
};

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.reason) errors.reason = "Please choose a reason.";
  if (!fields.message.trim()) {
    errors.message = "Please include a short message.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "A little more detail would help.";
  }
  return errors;
}

const fieldBase =
  "w-full rounded-lg border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    // Honeypot tripped: pretend success, send nothing.
    if (fields.website.trim()) {
      setStatus("success");
      setFields(emptyFields);
      return;
    }

    setStatus("submitting");
    try {
      if (CONTACT_ENDPOINT) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fields.name,
            email: fields.email,
            company: fields.company,
            reason: fields.reason,
            message: fields.message,
            website: fields.website,
          }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        // No backend configured (e.g. local dev): fall back to the user's mail
        // client so the form is never a dead end.
        const subject = encodeURIComponent(`Portfolio contact: ${fields.reason}`);
        const body = encodeURIComponent(
          `${fields.message}\n\n— ${fields.name}${fields.company ? `, ${fields.company}` : ""}\n${fields.email}`,
        );
        window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      }
      trackEvent("contact_form_submitted", { reason: fields.reason });
      setStatus("success");
      setFields(emptyFields);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Thanks, your message is on its way
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          It will land in my inbox and I will get back to you soon. If it is
          urgent, you can also reach me directly at the address below.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-secondary btn-sm mt-6"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from users, catches naive bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          error={errors.name}
          value={fields.name}
          onChange={(v) => update("name", v)}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          error={errors.email}
          value={fields.email}
          onChange={(v) => update("email", v)}
          autoComplete="email"
        />
      </div>

      <Field
        id="company"
        label="Company"
        hint="Optional"
        value={fields.company}
        onChange={(v) => update("company", v)}
        autoComplete="organization"
      />

      <div>
        <Label htmlFor="reason" required>
          Reason for contacting
        </Label>
        <select
          id="reason"
          required
          value={fields.reason}
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? "reason-error" : undefined}
          onChange={(e) => update("reason", e.target.value)}
          className={cn(fieldBase, errors.reason ? "border-rose-400" : "border-border")}
        >
          <option value="" disabled>
            Select one…
          </option>
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errors.reason ? <ErrorText id="reason-error">{errors.reason}</ErrorText> : null}
      </div>

      <div>
        <Label htmlFor="message" required>
          Message
        </Label>
        <textarea
          id="message"
          required
          rows={5}
          value={fields.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(e) => update("message", e.target.value)}
          placeholder="A sentence or two about what you have in mind."
          className={cn(fieldBase, "resize-y", errors.message ? "border-rose-400" : "border-border")}
        />
        {errors.message ? (
          <ErrorText id="message-error">{errors.message}</ErrorText>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary btn-md"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Send message
            </>
          )}
        </button>
        <p aria-live="polite" className="text-sm text-subtle">
          {status === "error"
            ? "Please fix the highlighted fields."
            : ""}
        </p>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {required ? (
        <span className="text-primary" aria-hidden>
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  hint,
  error,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        {hint ? <span className="text-xs text-subtle">{hint}</span> : null}
      </div>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldBase, error ? "border-rose-400" : "border-border")}
      />
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </div>
  );
}
