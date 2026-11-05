"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/Icons";
import { StoryCard } from "@/components/StoryCard";
import {
  categories,
  getCategoryName,
  sortedArticles,
  type Article,
  type ArticleKind,
} from "@/lib/content";

const kindOptions = ["All", "News", "Blog"] as const;
type KindFilter = (typeof kindOptions)[number];
const PAGE_SIZE = 9;

export function StoryBrowser() {
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<KindFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return sortedArticles.filter((article: Article) => {
      const matchesKind =
        kindFilter === "All" || article.kind === (kindFilter as ArticleKind);
      const matchesCategory =
        categoryFilter === "all" || article.category === categoryFilter;
      const haystack = [
        article.title,
        article.dek,
        article.kind,
        article.format,
        article.author,
        getCategoryName(article.category),
        article.tags.join(" "),
        article.body.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

      return matchesKind && matchesCategory && matchesQuery;
    });
  }, [query, kindFilter, categoryFilter]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  function updateCategory(slug: string) {
    setCategoryFilter(slug);
    setVisibleCount(PAGE_SIZE);
  }

  function updateKind(kind: KindFilter) {
    setKindFilter(kind);
    setVisibleCount(PAGE_SIZE);
  }

  function resetFilters() {
    setQuery("");
    setKindFilter("All");
    setCategoryFilter("all");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      <div className="grid gap-5 border-y border-ink/15 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-center gap-3 rounded-full border border-ink/20 bg-white/60 px-4 py-2.5 focus-within:border-cobalt">
          <SearchIcon className="h-4 w-4 shrink-0 text-ink/50" />
          <label htmlFor="story-search" className="sr-only">
            Search stories
          </label>
          <input
            id="story-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search stories, desks, writers, or ideas..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink/45"
          />
        </div>
        <div className="flex items-center gap-2" aria-label="Filter by content type">
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45 sm:inline">
            Type
          </span>
          <div className="flex rounded-full border border-ink/20 p-1">
            {kindOptions.map((kind) => (
              <button
                key={kind}
                type="button"
                aria-pressed={kindFilter === kind}
                onClick={() => updateKind(kind)}
                className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                  kindFilter === kind
                    ? "bg-ink text-paper"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                {kind}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-5 lg:mx-0 lg:px-0">
        <button
          type="button"
          aria-pressed={categoryFilter === "all"}
          onClick={() => updateCategory("all")}
          className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
            categoryFilter === "all"
              ? "border-ink bg-ink text-paper"
              : "border-ink/20 text-ink/65 hover:border-ink"
          }`}
        >
          All desks
        </button>
        {categories.map((category) => {
          const active = categoryFilter === category.slug;
          return (
            <button
              key={category.slug}
              type="button"
              aria-pressed={active}
              onClick={() => updateCategory(category.slug)}
              className="shrink-0 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors"
              style={{
                borderColor: category.accent,
                backgroundColor: active ? category.accent : "transparent",
                color: active ? "#fff" : category.accent,
              }}
            >
              {category.shortName}
            </button>
          );
        })}
      </div>

      <div className="mb-7 flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
        <span aria-live="polite">
          Showing {visibleArticles.length} of {filteredArticles.length} stories
        </span>
        {(query || kindFilter !== "All" || categoryFilter !== "all") && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-cobalt underline decoration-2 underline-offset-4"
          >
            Reset filters
          </button>
        )}
      </div>

      {visibleArticles.length > 0 ? (
        <>
          <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {visibleArticles.map((article, index) => (
              <StoryCard
                key={`${article.category}-${article.slug}`}
                article={article}
                index={index}
              />
            ))}
          </div>
          {visibleCount < filteredArticles.length ? (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 6)}
                className="rounded-full border border-ink px-7 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
              >
                Load more stories
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="border border-dashed border-ink/25 py-16 text-center">
          <p className="font-display text-3xl">No stories found.</p>
          <p className="mt-2 text-sm text-ink/60">
            Try another word, desk, or content type.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-full bg-ink px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-paper"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
