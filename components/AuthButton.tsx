"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { initialsFor } from "@/lib/auth";

export function AuthButton() {
  const { user, isReady, openAuthModal, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <button
        type="button"
        disabled={!isReady}
        onClick={() => openAuthModal("signin")}
        className="inline-flex items-center rounded-full border border-ink/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
        title="Sign in or create an account"
      >
        <span className="hidden sm:inline">Sign in / Join</span>
        <span className="sm:hidden">Join</span>
      </button>
    );
  }

  const initials = initialsFor(user.name || user.email);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        aria-controls="account-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-2 rounded-full border border-ink/20 pl-1 pr-3 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cobalt text-white">
          {initials}
        </span>
        <span className="hidden max-w-24 truncate xl:inline">{user.name.split(" ")[0]}</span>
      </button>

      {open ? (
        <div
          id="account-menu"
          className="absolute right-0 top-full z-[70] mt-3 w-64 rounded-[3px] border border-ink/15 bg-paper p-4 shadow-2xl"
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/45">
            Signed in {user.role === "admin" ? "· Admin" : ""}
          </p>
          <p className="mt-2 font-display text-2xl leading-tight">{user.name}</p>
          <p className="mt-1 truncate text-xs text-ink/55">{user.email}</p>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
            <button
              type="button"
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="rounded-full bg-coral px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white"
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-ink/20 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em]"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
