"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/Icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex min-h-12 w-full max-w-lg items-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm text-white"
      >
        <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-lime text-ink">
          ✓
        </span>
        Thanks — this preview form works locally; no email was sent.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-2 rounded-full border border-white/25 bg-white/10 p-1.5 backdrop-blur sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/55"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-transform hover:scale-[1.02]"
      >
        Sign up
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
