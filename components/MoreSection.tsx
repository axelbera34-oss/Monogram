"use client";

import Link from "next/link";
import { AuthActionLink } from "@/components/AuthActionLink";
import { ArrowUpRight, SparkIcon } from "@/components/Icons";
import { ReaderStoryDisclosure } from "@/components/ReaderStoryDisclosure";
import { useUserContent } from "@/components/UserContentProvider";
import { getUserCategoryHref } from "@/lib/user-content";

export function MoreSection() {
  const { customCategories, userArticles, isReady, clearAll } = useUserContent();
  const existingDeskArticles = userArticles.filter(
    (article) => !article.isCustomCategory,
  );
  const hasAdditions = customCategories.length > 0 || existingDeskArticles.length > 0;

  function handleReset() {
    const confirmed = window.confirm(
      "Remove all reader-added articles and categories from this browser?",
    );
    if (confirmed) clearAll();
  }

  return (
    <section id="more" className="scroll-mt-28 border-b border-ink/15 bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="mb-9 flex flex-col gap-5 border-b border-ink/20 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cobalt">
              <SparkIcon className="h-3 w-3" />
              New categories / 05
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-7xl">
              More<span className="text-coral">.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <p className="max-w-md text-sm leading-relaxed text-ink/60 lg:text-right">
              Every manually created or automatically detected type is listed here
              with its cover, articles, and dedicated desk page.
            </p>
            {hasAdditions ? (
              <button
                type="button"
                onClick={handleReset}
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45 underline decoration-2 underline-offset-4 hover:text-coral"
              >
                Reset browser additions
              </button>
            ) : null}
          </div>
        </div>

        {!isReady ? (
          <div className="border border-dashed border-ink/25 py-16 text-center">
            <p className="font-display text-3xl">Loading your additions…</p>
            <p className="mt-2 text-sm text-ink/55">
              Reader-added articles are stored in this browser.
            </p>
          </div>
        ) : !hasAdditions ? (
          <div className="grid gap-6 border border-dashed border-ink/25 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral">
                No new categories yet
              </p>
              <h3 className="mt-3 font-display text-4xl leading-tight">
                Create a desk like <span className="italic text-cobalt">Food</span> or{" "}
                <span className="italic text-cobalt">Travel</span>.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/60">
                Sign in, use the category form above, then add an article with an
                image. The new category and its page will appear here automatically.
              </p>
            </div>
            <AuthActionLink
              href="#add-category"
              mode="signup"
              className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-cobalt"
            >
              Add a category <ArrowUpRight className="h-4 w-4" />
            </AuthActionLink>
          </div>
        ) : (
          <>
            {customCategories.length > 0 ? (
              <div className="mb-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                  Added categories
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {customCategories.map((category) => {
                    const count = userArticles.filter(
                      (article) => article.categorySlug === category.slug,
                    ).length;
                    return (
                      <a
                        key={category.slug}
                        href={`#more-${category.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                        style={{
                          borderColor: category.accent,
                          backgroundColor: category.soft,
                          color: category.accent,
                        }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: category.accent }}
                        />
                        {category.name}
                        <span className="opacity-60">
                          {count} {count === 1 ? "story" : "stories"}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-2">
              {customCategories.map((category, categoryIndex) => {
                const stories = userArticles.filter(
                  (article) => article.categorySlug === category.slug,
                );
                return (
                  <article
                    id={`more-${category.slug}`}
                    key={category.slug}
                    className="scroll-mt-32 overflow-hidden rounded-[3px] border border-ink/15 bg-white/55"
                    style={{ borderTopColor: category.accent, borderTopWidth: 4 }}
                  >
                    {category.image ? (
                      <div className="relative h-44 overflow-hidden border-b border-ink/15 bg-paper">
                        {/* User-supplied data URLs and external URLs bypass next/image domain configuration. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={category.image}
                          alt={`${category.name} category cover`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                          Category cover
                        </span>
                      </div>
                    ) : null}
                    <header className="flex flex-col gap-5 border-b border-ink/15 p-5 md:flex-row md:items-end md:justify-between md:p-7">
                      <div>
                        <p
                          className="text-[10px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: category.accent }}
                        >
                          Reader-added category {String(categoryIndex + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 font-display text-4xl leading-none tracking-[-0.04em]">
                          {category.name}
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
                          {category.description}
                        </p>
                      </div>
                      <Link
                        href={getUserCategoryHref(category.slug)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                        style={{ backgroundColor: category.accent }}
                      >
                        Open desk <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </header>
                    {stories.length > 0 ? (
                      <div>
                        {stories.map((story, index) => (
                          <ReaderStoryDisclosure
                            key={story.id}
                            story={story}
                            accent={category.accent}
                            defaultOpen={index === 0 && stories.length === 1}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 p-7">
                        <p className="font-display text-2xl italic">
                          No articles in this category yet.
                        </p>
                        <p className="text-sm leading-relaxed text-ink/60">
                          Use the article form and set its type to{" "}
                          <strong>{category.name}</strong> to publish the first story.
                        </p>
                        <AuthActionLink
                          href="#add-article"
                          className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] hover:bg-ink hover:text-paper"
                        >
                          Add first article <ArrowUpRight className="h-4 w-4" />
                        </AuthActionLink>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {existingDeskArticles.length > 0 ? (
              <article
                id="more-existing"
                className="mt-10 scroll-mt-32 overflow-hidden rounded-[3px] border border-ink/15 bg-[#efe9df]"
              >
                <header className="border-b border-ink/15 p-5 md:p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cobalt">
                    Also in More
                  </p>
                  <h3 className="mt-2 font-display text-4xl leading-none tracking-[-0.04em]">
                    Additions to existing desks
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/60">
                    These stories used a type already in the archive, so they were
                    added to their original desk rather than creating a new one.
                  </p>
                </header>
                <div>
                  {existingDeskArticles.map((story) => (
                    <ReaderStoryDisclosure
                      key={story.id}
                      story={story}
                      accent="#171715"
                    />
                  ))}
                </div>
              </article>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
