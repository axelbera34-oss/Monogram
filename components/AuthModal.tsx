"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CloseIcon, SparkIcon } from "@/components/Icons";
import { useAuth } from "@/components/AuthProvider";
import { DEMO_ADMIN_CREDENTIALS } from "@/lib/auth";

const fieldClass =
  "w-full rounded-[2px] border border-ink/20 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-cobalt";
const labelClass =
  "mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55";

export function AuthModal() {
  const {
    user,
    isReady,
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    setAuthModalMode,
    signIn,
    createAccount,
    signOut,
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isAuthModalOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeAuthModal();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  useEffect(() => {
    if (isAuthModalOpen) {
      setError("");
      setPassword("");
      setBusy(false);
    }
  }, [isAuthModalOpen, authModalMode]);

  if (!isAuthModalOpen) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isReady || busy) return;

    setBusy(true);
    setError("");

    const result =
      authModalMode === "signin"
        ? await signIn(email, password)
        : await createAccount(name, email, password);

    if (!result.ok) {
      setError(result.error);
      setBusy(false);
    }
  }

  function fillDemoAdmin() {
    setEmail(DEMO_ADMIN_CREDENTIALS.email);
    setPassword(DEMO_ADMIN_CREDENTIALS.password);
    setError("");
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      onClick={closeAuthModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative w-full max-w-md overflow-hidden rounded-[4px] border border-ink/20 bg-paper shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/15 bg-ink px-6 py-5 text-paper">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-lime">
              <SparkIcon className="h-3 w-3" />
              MONOGRAM account
            </p>
            <h2 id="auth-modal-title" className="mt-2 font-display text-3xl leading-none">
              {user
                ? "Your session"
                : authModalMode === "signin"
                  ? "Welcome back"
                  : "Create an account"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Close sign in dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {user ? (
          <div className="p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cobalt">
              Signed in {user.role === "admin" ? "· Admin account" : ""}
            </p>
            <p className="mt-3 font-display text-3xl">{user.name}</p>
            <p className="mt-1 text-sm text-ink/55">{user.email}</p>
            <p className="mt-5 text-sm leading-relaxed text-ink/60">
              You can add categories and articles. Sign out to lock the creation
              forms again.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={signOut}
                className="rounded-full bg-coral px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
              >
                Sign out
              </button>
              <button
                type="button"
                onClick={closeAuthModal}
                className="rounded-full border border-ink/25 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              >
                Continue editing
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 border-b border-ink/15">
              {(["signin", "signup"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAuthModalMode(mode)}
                  aria-pressed={authModalMode === mode}
                  className={`px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                    authModalMode === mode
                      ? "bg-paper text-cobalt"
                      : "bg-[#eee8de] text-ink/50 hover:text-ink"
                  }`}
                >
                  {mode === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            {authModalMode === "signin" ? (
              <div className="border-b border-ink/15 bg-[#e7edfa] px-6 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cobalt">
                      Demo admin account
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/65">
                      <span className="font-semibold">
                        {DEMO_ADMIN_CREDENTIALS.email}
                      </span>
                      <span className="mx-2 text-ink/30">/</span>
                      <span className="font-semibold">
                        {DEMO_ADMIN_CREDENTIALS.password}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemoAdmin}
                    disabled={!isReady}
                    className="rounded-full border border-cobalt/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-cobalt transition-colors hover:bg-cobalt hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Use admin
                  </button>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {authModalMode === "signup" ? (
                <div>
                  <label htmlFor="auth-name" className={labelClass}>
                    Display name *
                  </label>
                  <input
                    id="auth-name"
                    required
                    autoFocus
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
              ) : null}

              <div>
                <label htmlFor="auth-email" className={labelClass}>
                  Email address *
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  autoFocus={authModalMode === "signin"}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="reader@example.com"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="auth-password" className={labelClass}>
                  Password *
                </label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  className={fieldClass}
                />
              </div>

              {error ? (
                <p role="alert" className="rounded-[2px] border border-coral/30 bg-coral/5 p-3 text-xs font-semibold text-coral">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={!isReady || busy}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-cobalt px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy
                  ? "Please wait"
                  : authModalMode === "signin"
                    ? "Sign in"
                    : "Create account & sign in"}
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-xs leading-relaxed text-ink/50">
                Demo authentication is stored only in this browser. Do not use a
                real password; there is no backend or email verification.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
