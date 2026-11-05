"use client";

import { AuthActionLink } from "@/components/AuthActionLink";
import { ArrowUpRight } from "@/components/Icons";
import { ReaderStoryDisclosure } from "@/components/ReaderStoryDisclosure";
import { useUserContent } from "@/components/UserContentProvider";

type UserDeskAdditionsProps = {
  categorySlug: string;
  categoryName: string;
  accent: string;
  soft: string;
};

export function UserDeskAdditions({
  categorySlug,
  categoryName,
  accent,
  soft,
}: UserDeskAdditionsProps) {
  const { userArticles, isReady } = useUserContent();
  const stories = userArticles.filter(
    (article) =>
      article.categorySlug === categorySlug && !article.isCustomCategory,
  );

  if (!isReady || stories.length === 0) return null;

  return (
    <section className="border-y border-ink/15" style={{ backgroundColor: soft }}>
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
        <div className="mb-7 flex flex-col gap-4 border-b border-ink/20 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              Reader additions
            </p>
            <h2 className="mt-2 font-display text-4xl leading-none tracking-[-0.04em] md:text-5xl">
              Added to {categoryName}
            </h2>
          </div>
          <AuthActionLink
            href="/explore#add-article"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60 hover:text-ink"
          >
            Add another story <ArrowUpRight className="h-4 w-4" />
          </AuthActionLink>
        </div>
        <div className="rounded-[3px] border border-ink/15 bg-paper/70">
          {stories.map((story) => (
            <ReaderStoryDisclosure key={story.id} story={story} accent={accent} />
          ))}
        </div>
        <p className="mt-4 text-xs text-ink/50">
          These articles are saved in your browser and are also listed in the
          Explore page&apos;s More section.
        </p>
      </div>
    </section>
  );
}
