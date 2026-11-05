import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, SparkIcon } from "@/components/Icons";
import { StoryCard } from "@/components/StoryCard";
import { UserDeskAdditions } from "@/components/UserDeskAdditions";
import {
  categories,
  getArticleHref,
  getArticlesByCategory,
  getCategory,
  getCategoryName,
} from "@/lib/content";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return { title: "Desk not found" };
  }

  return {
    title: `${category.name} — Desk ${category.index}`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const stories = getArticlesByCategory(category.slug);
  const [leadStory, ...otherStories] = stories;
  const newsCount = stories.filter((story) => story.kind === "News").length;
  const blogCount = stories.filter((story) => story.kind === "Blog").length;

  return (
    <main id="main-content">
      <section
        className="relative isolate overflow-hidden border-b border-ink/15"
        style={{ backgroundColor: category.soft }}
      >
        <div className="paper-grain pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/55">
            <Link href="/" className="hover:text-cobalt">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/explore" className="hover:text-cobalt">Explore</Link>
            <span className="mx-2">/</span>
            <span style={{ color: category.accent }}>{category.name}</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: category.accent }}>
                Desk {category.index} / {category.kicker}
              </p>
              <h1 className="mt-5 font-display text-[clamp(4.5rem,10vw,9.5rem)] leading-[0.8] tracking-[-0.07em]">
                {category.name.split(" ").map((word, index) => (
                  <span key={`${word}-${index}`} className={index === 1 ? "block italic" : "block"}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="mt-8 font-display text-2xl italic leading-snug md:text-3xl">
                {category.tagline}
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 text-pretty">
                {category.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="#stories"
                  className="inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: category.accent }}
                >
                  Read this desk
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/explore"
                  className="rounded-full border border-ink/25 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
                >
                  All desks
                </Link>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 border-t border-ink/20 pt-5">
                {[
                  [String(stories.length).padStart(2, "0"), "Stories"],
                  [String(newsCount).padStart(2, "0"), "News"],
                  [String(blogCount).padStart(2, "0"), "Blog"],
                ].map(([number, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl leading-none">{number}</p>
                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/50">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] sm:min-h-[500px]">
              <div
                className="absolute -left-3 top-8 flex h-20 w-20 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-[0.14em] text-white md:-left-6"
                style={{ backgroundColor: category.accent }}
              >
                Desk {category.index}
              </div>
              <div className="absolute right-0 top-0 h-[78%] w-[82%] overflow-hidden rounded-t-full rounded-b-[3px] border border-ink/15 bg-white shadow-2xl">
                <Image
                  src={category.image}
                  alt={`${category.name} editorial cover`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 40vw"
                  className="object-cover"
                />
              </div>
              {category.secondaryImage ? (
                <div className="absolute bottom-3 left-2 w-[48%] overflow-hidden rounded-[3px] border-4 border-white shadow-xl">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={category.secondaryImage}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="absolute bottom-4 left-2 flex h-28 w-28 items-center justify-center rounded-full px-4 text-center font-display text-5xl italic text-white shadow-xl"
                  style={{ backgroundColor: category.accent }}
                >
                  {category.index}
                </div>
              )}
              <div className="absolute bottom-0 right-0 flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                <SparkIcon className="h-3 w-3 text-lime" />
                Updated this edition
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="no-scrollbar overflow-x-auto border-b border-ink/15 bg-paper">
        <div className="mx-auto flex w-max max-w-none gap-2 px-5 py-4 lg:px-10">
          <Link
            href="/explore"
            className="shrink-0 rounded-full border border-ink/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:bg-ink hover:text-paper"
          >
            All desks
          </Link>
          {categories.map((item) => {
            const active = item.slug === category.slug;
            return (
              <Link
                key={item.slug}
                href={`/explore/${item.slug}`}
                aria-current={active ? "page" : undefined}
                className="shrink-0 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors"
                style={{
                  borderColor: item.accent,
                  backgroundColor: active ? item.accent : "transparent",
                  color: active ? "#fff" : item.accent,
                }}
              >
                {item.shortName}
              </Link>
            );
          })}
        </div>
      </div>

      <section id="stories" className="scroll-mt-28 mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 border-b border-ink/20 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: category.accent }}>
              The {category.name} desk / Latest
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-7xl">
              Stories from this section
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-right">
            {newsCount} news {newsCount === 1 ? "article" : "articles"} and {blogCount} blog{" "}
            {blogCount === 1 ? "post" : "posts"}, selected for Edition 18.
          </p>
        </div>

        {leadStory ? (
          <Link
            href={getArticleHref(leadStory)}
            className="group mb-12 grid overflow-hidden rounded-[3px] border border-ink/15 bg-white/50 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative min-h-[320px] aspect-[4/3] lg:aspect-auto">
              {leadStory.image ? (
                <Image
                  src={leadStory.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
              ) : (
                <div className="absolute inset-0" style={{ backgroundColor: category.accent }} />
              )}
            </div>
            <div className="flex flex-col justify-between p-7 md:p-10">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                    style={{ backgroundColor: category.accent }}
                  >
                    Lead · {leadStory.kind}
                  </span>
                  <span className="rounded-full border border-ink/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
                    {leadStory.format}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[clamp(2.7rem,5vw,5rem)] leading-[0.92] tracking-[-0.05em]">
                  {leadStory.title}
                </h3>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/65 text-pretty">
                  {leadStory.dek}
                </p>
              </div>
              <div className="mt-10 flex items-center justify-between gap-5 border-t border-ink/15 pt-5 text-xs text-ink/60">
                <span>
                  By {leadStory.author} · {leadStory.dateLabel} · {leadStory.readTime}
                </span>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform group-hover:rotate-45"
                  style={{ backgroundColor: category.accent }}
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Link>
        ) : null}

        <div className="grid gap-x-7 gap-y-12 md:grid-cols-2">
          {otherStories.map((story, index) => (
            <StoryCard key={story.slug} article={story} index={index + 1} />
          ))}
        </div>
      </section>

      <UserDeskAdditions
        categorySlug={category.slug}
        categoryName={category.name}
        accent={category.accent}
        soft={category.soft}
      />

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-lime">
              About this desk
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.045em] md:text-6xl">
              {category.tagline}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              This page gathers every news article and blog post in the {category.name}{" "}
              section. Follow the rail above to move between desks, or return to
              the searchable archive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/explore#latest"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-paper hover:text-ink"
              >
                Search all stories
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore#more"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-lime transition-colors hover:bg-paper hover:text-ink"
              >
                More categories
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
              Continue exploring
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {categories
                .filter((item) => item.slug !== category.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/explore/${item.slug}`}
                    className="group flex items-center justify-between border-b border-white/15 py-4 transition-colors hover:text-lime"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-sm opacity-45">{item.index}</span>
                      <span className="font-display text-2xl">{getCategoryName(item.slug)}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
