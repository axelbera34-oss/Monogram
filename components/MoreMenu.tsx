"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthActionLink } from "@/components/AuthActionLink";
import { ArrowUpRight } from "@/components/Icons";
import { useUserContent } from "@/components/UserContentProvider";
import { categories } from "@/lib/content";
import { getUserCategoryHref } from "@/lib/user-content";

export function MoreMenu() {
  const [open, setOpen] = useState(false);
  const { customCategories, userArticles, isReady } = useUserContent();
  const close = () => setOpen(false);
  const overflowCategories = categories.slice(4);

  return (
    <div className="relative hidden lg:block">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="desktop-more-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-ink/70 transition-colors hover:text-cobalt"
      >
        More
        {customCategories.length > 0 ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[9px] text-white">
            {customCategories.length}
          </span>
        ) : null}
        <span className={`text-sm leading-none transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      {open ? (
        <div
          id="desktop-more-menu"
          className="absolute left-1/2 top-full z-[60] mt-3 w-[470px] -translate-x-1/2 rounded-[3px] border border-ink/15 bg-paper shadow-2xl"
        >
          <div className="grid grid-cols-2 divide-x divide-ink/10">
            <div className="p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-ink/45">
                More editorial desks
              </p>
              <div className="mt-4 space-y-2">
                {overflowCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/explore/${category.slug}`}
                    onClick={close}
                    className="flex items-center justify-between rounded-sm px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
                  >
                    <span>{category.name}</span>
                    <span className="font-display text-xs opacity-50">{category.index}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-ink/45">
                Reader-added categories
              </p>
              {!isReady ? (
                <p className="mt-4 text-sm text-ink/50">Loading your additions…</p>
              ) : customCategories.length > 0 ? (
                <div className="mt-4 max-h-52 space-y-2 overflow-y-auto pr-1">
                  {customCategories.map((category) => {
                    const count = userArticles.filter(
                      (article) => article.categorySlug === category.slug,
                    ).length;
                    return (
                      <Link
                        key={category.slug}
                        href={getUserCategoryHref(category.slug)}
                        onClick={close}
                        className="flex items-center justify-between gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors hover:bg-ink hover:text-paper"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: category.accent }}
                          />
                          <span className="truncate font-semibold">{category.name}</span>
                        </span>
                        <span className="shrink-0 text-[10px] uppercase tracking-[0.12em] opacity-50">
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-ink/50">
                  No new topics yet. Create a category or add an article with a
                  type that is not listed and it will appear here.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-ink/10 bg-[#efe9df] px-5 py-3">
            <AuthActionLink
              href="/explore#add-category"
              mode="signup"
              onNavigate={close}
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cobalt"
            >
              Create category <ArrowUpRight className="h-3 w-3" />
            </AuthActionLink>
            <AuthActionLink
              href="/explore#add-article"
              onNavigate={close}
              className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60 hover:text-ink"
            >
              Add article
            </AuthActionLink>
            <Link
              href="/explore#more"
              onClick={close}
              className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60 hover:text-ink"
            >
              Open More
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
