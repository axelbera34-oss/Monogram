import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { StoryCard } from "@/components/StoryCard";
import {
  articles,
  getArticle,
  getArticleHref,
  getCategory,
  getCategoryName,
  getRelatedArticles,
} from "@/lib/content";

type ArticlePageProps = {
  params: Promise<{ category: string; article: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({
    category: article.category,
    article: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { category: categorySlug, article: articleSlug } = await params;
  const article = getArticle(categorySlug, articleSlug);

  if (!article) {
    return { title: "Story not found" };
  }

  return {
    title: article.title,
    description: article.dek,
    authors: [{ name: article.author }],
    keywords: article.tags,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category: categorySlug, article: articleSlug } = await params;
  const article = getArticle(categorySlug, articleSlug);
  const category = getCategory(categorySlug);

  if (!article || !category) notFound();

  const related = getRelatedArticles(article, 3);
  const initials = article.author
    .split(" ")
    .map((part) => part[0])
    .join("");
  const emailSubject = encodeURIComponent(`MONOGRAM: ${article.title}`);

  return (
    <main id="main-content">
      <article>
        <header className="relative isolate overflow-hidden border-b border-ink/15">
          <div className="paper-grain pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative mx-auto max-w-[1100px] px-5 py-10 lg:px-8 lg:py-14">
            <nav aria-label="Breadcrumb" className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
              <Link href="/" className="hover:text-cobalt">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/explore" className="hover:text-cobalt">Explore</Link>
              <span className="mx-2">/</span>
              <Link href={`/explore/${category.slug}`} className="hover:text-cobalt">
                {category.name}
              </Link>
              <span className="mx-2">/</span>
              <span style={{ color: category.accent }}>Story</span>
            </nav>

            <div className="mt-12 flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                style={{ backgroundColor: category.accent }}
              >
                {article.kind}
              </span>
              <span className="rounded-full border border-ink/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]">
                {article.format}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
                {getCategoryName(article.category)} desk
              </span>
            </div>

            <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.6rem,8vw,8.5rem)] leading-[0.88] tracking-[-0.065em] text-balance">
              {article.title}
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-ink/65 text-pretty md:text-2xl">
              {article.dek}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink/15 pt-6">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full font-display text-lg text-white"
                  style={{ backgroundColor: category.accent }}
                  aria-hidden="true"
                >
                  {initials}
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em]">
                    By {article.author}
                  </span>
                  <span className="mt-1 block text-xs text-ink/50">MONOGRAM staff writer</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/55">
                <span>{article.dateLabel}</span>
                <span>{article.readTime}</span>
                <span>Edition 18</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1300px] px-5 py-8 lg:px-10 lg:py-12">
          <div className="relative aspect-[16/8] min-h-[280px] overflow-hidden rounded-[3px] border border-ink/15 bg-ink lg:min-h-[420px]">
            {article.image ? (
              <>
                <Image
                  src={article.image}
                  alt={`Editorial artwork for ${article.title}`}
                  fill
                  priority
                  sizes="(max-width: 1300px) 100vw, 1250px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,.38)_100%)]" />
                <span className="absolute bottom-5 left-5 rounded-full bg-paper/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                  {category.kicker}
                </span>
              </>
            ) : (
              <div className="absolute inset-0" style={{ backgroundColor: category.soft }}>
                <div className="dot-pattern absolute inset-0 opacity-15" style={{ color: category.accent }} />
                <div
                  className="absolute -right-16 -top-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: category.accent }}
                />
                <div className="relative flex h-full flex-col justify-between p-7 md:p-12">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.24em]"
                    style={{ color: category.accent }}
                  >
                    MONOGRAM / {category.name}
                  </span>
                  <p
                    className="max-w-4xl font-display text-4xl italic leading-[1.02] md:text-7xl"
                    style={{ color: category.accent }}
                  >
                    {article.quote}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
                    {article.kind} · {article.format}
                  </span>
                </div>
              </div>
            )}
          </div>
          <p className="mt-3 text-right text-[10px] font-bold uppercase tracking-[0.15em] text-ink/45">
            Editorial image · MONOGRAM studio
          </p>
        </div>

        <div className="mx-auto grid max-w-[1250px] justify-center gap-10 px-5 pb-16 lg:grid-cols-[5rem_minmax(0,44rem)_14rem] lg:gap-12 lg:px-8 lg:pb-24">
          <aside className="hidden lg:block">
            <div className="sticky top-32 flex flex-col items-center gap-6">
              <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-ink/40 [writing-mode:vertical-rl]">
                Share this story
              </span>
              <a
                href={`mailto:?subject=${emailSubject}`}
                aria-label="Share this story by email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
              >
                @
              </a>
              <Link
                href={`/explore/${category.slug}`}
                aria-label={`Back to ${category.name}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          </aside>

          <div className="article-body font-display text-[1.25rem] leading-[1.85] text-ink/85 md:text-[1.35rem]">
            {article.body.map((paragraph, index) => (
              <Fragment key={`${article.slug}-paragraph-${index}`}>
                <p className={`mb-8 text-pretty ${index === 0 ? "drop-cap" : ""}`}>
                  {paragraph}
                </p>
                {index === 1 ? (
                  <blockquote
                    className="my-12 border-l-4 pl-6 font-display text-3xl italic leading-[1.2] text-ink md:text-4xl"
                    style={{ borderColor: category.accent }}
                  >
                    “{article.quote}”
                  </blockquote>
                ) : null}
              </Fragment>
            ))}

            <div className="mt-14 border-y border-ink/15 py-6">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
                Filed under
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-2 font-sans text-xs"
                    style={{ backgroundColor: category.soft, color: category.accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:pt-2">
            <div className="sticky top-32 space-y-8">
              <div className="border-t-2 pt-5" style={{ borderColor: category.accent }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                  Story details
                </p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">Desk</dt>
                    <dd className="mt-1 font-display text-xl">{category.name}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">Type</dt>
                    <dd className="mt-1 font-display text-xl">{article.kind}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">Published</dt>
                    <dd className="mt-1 font-display text-xl">{article.dateLabel}</dd>
                  </div>
                </dl>
              </div>
              <Link
                href={`/explore/${category.slug}`}
                className="group block rounded-[3px] p-5 text-white transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: category.accent }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                  More from this desk
                </span>
                <span className="mt-3 block font-display text-2xl leading-tight">
                  {category.name}
                </span>
                <span className="mt-5 flex items-center justify-between border-t border-white/30 pt-3 text-[10px] font-bold uppercase tracking-[0.14em]">
                  View all
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <section className="border-t border-ink/15 bg-[#efe9df]">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 flex flex-col gap-4 border-b border-ink/20 pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-coral">
                Keep reading / Related stories
              </p>
              <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-6xl">
                Read next
              </h2>
            </div>
            <Link
              href="/explore#latest"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cobalt"
            >
              Search the archive <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {related.map((story, index) => (
              <StoryCard key={getArticleHref(story)} article={story} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
