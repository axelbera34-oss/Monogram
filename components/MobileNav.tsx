"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthActionLink } from "@/components/AuthActionLink";
import { useAuth } from "@/components/AuthProvider";
import { ArrowUpRight, CloseIcon, MenuIcon } from "@/components/Icons";
import { useUserContent } from "@/components/UserContentProvider";
import type { Category } from "@/lib/content";
import { getUserCategoryHref } from "@/lib/user-content";

export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const { customCategories, userArticles, isReady: contentReady } =
    useUserContent();
  const { user, isReady: authReady, openAuthModal, signOut } = useAuth();
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full max-h-[calc(100vh-120px)] overflow-y-auto border-b border-ink/15 bg-paper shadow-2xl"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-7 lg:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink/50">
              Browse the desks
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/explore/${category.slug}`}
                  onClick={close}
                  className="flex items-center justify-between rounded-sm border border-ink/15 px-3 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
                >
                  <span>{category.shortName}</span>
                  <span className="font-display text-xs opacity-50">
                    {category.index}
                  </span>
                </Link>
              ))}
              <Link
                href="/explore"
                onClick={close}
                className="col-span-2 flex items-center justify-between rounded-sm bg-cobalt px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white"
              >
                Explore all stories
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-7 border-t border-ink/15 pt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink/50">
                  More / reader-added categories
                </p>
                <span className="rounded-full bg-coral px-2 py-1 text-[9px] font-bold text-white">
                  {customCategories.length}
                </span>
              </div>
              {!contentReady ? (
                <p className="mt-3 text-sm text-ink/50">Loading your additions…</p>
              ) : customCategories.length > 0 ? (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {customCategories.map((category) => {
                    const count = userArticles.filter(
                      (article) => article.categorySlug === category.slug,
                    ).length;
                    return (
                      <Link
                        key={category.slug}
                        href={getUserCategoryHref(category.slug)}
                        onClick={close}
                        className="flex items-center justify-between gap-2 rounded-sm border border-ink/15 px-3 py-3 text-sm font-semibold"
                        style={{ borderColor: category.accent }}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: category.accent }}
                          />
                          <span className="truncate">{category.name}</span>
                        </span>
                        <span className="text-[10px] opacity-50">{count}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-ink/50">
                  Categories you create and new article types will be listed here.
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <AuthActionLink
                  href="/explore#add-category"
                  mode="signup"
                  onNavigate={close}
                  className="rounded-full bg-cobalt px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                >
                  Create category
                </AuthActionLink>
                <AuthActionLink
                  href="/explore#add-article"
                  onNavigate={close}
                  className="rounded-full bg-ink px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-paper"
                >
                  Add article
                </AuthActionLink>
                <Link
                  href="/explore#more"
                  onClick={close}
                  className="rounded-full border border-ink/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                >
                  View More
                </Link>
              </div>
            </div>

            <div className="mt-6 border-t border-ink/15 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink/50">
                Account
              </p>
              {!authReady ? (
                <p className="mt-3 text-sm text-ink/50">Checking sign-in…</p>
              ) : user ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">
                    Signed in as {user.name}
                    {user.role === "admin" ? " (admin)" : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      close();
                    }}
                    className="rounded-full bg-coral px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      openAuthModal("signin");
                      close();
                    }}
                    className="rounded-full bg-ink px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-paper"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      openAuthModal("signup");
                      close();
                    }}
                    className="rounded-full border border-ink/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                  >
                    Create account
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-2 border-t border-ink/15 pt-5 text-xs">
              <Link
                href="/explore#latest"
                onClick={close}
                className="rounded-full border border-ink/20 px-4 py-2 font-bold uppercase tracking-[0.14em]"
              >
                Search archive
              </Link>
              <Link
                href="/#newsletter"
                onClick={close}
                className="rounded-full bg-ink px-4 py-2 font-bold uppercase tracking-[0.14em] text-paper"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
