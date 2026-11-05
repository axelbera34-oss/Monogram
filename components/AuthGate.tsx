"use client";

import { useAuth } from "@/components/AuthProvider";

type AuthGateProps = {
  title: string;
  description: string;
};

export function AuthGate({ title, description }: AuthGateProps) {
  const { isReady, openAuthModal } = useAuth();

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[3px] border border-dashed border-ink/30 bg-white/45 p-7 text-center md:p-10">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-7 w-7"
        >
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-coral">
        Members only
      </p>
      <h3 className="mt-3 font-display text-4xl leading-[1.02] tracking-[-0.035em]">
        Sign in to {title}
      </h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
        {description}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          disabled={!isReady}
          onClick={() => openAuthModal("signin")}
          className="rounded-full bg-cobalt px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sign in
        </button>
        <button
          type="button"
          disabled={!isReady}
          onClick={() => openAuthModal("signup")}
          className="rounded-full border border-ink/25 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create account
        </button>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-ink/45">
        Demo sign-in is browser-local. Use the built-in admin account or create
        another account in the header dialog; the editor will unlock automatically.
      </p>
    </div>
  );
}
