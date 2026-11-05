import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddArticleSection } from "@/components/AddArticleSection";
import { AddCategorySection } from "@/components/AddCategorySection";
import { AuthActionLink } from "@/components/AuthActionLink";
import { CategoryCard } from "@/components/CategoryCard";
import { ArrowUpRight, SparkIcon } from "@/components/Icons";
import { MoreSection } from "@/components/MoreSection";
import { StoryBrowser } from "@/components/StoryBrowser";
import { articles, categories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Browse MONOGRAM's complete archive of news and blog stories, organized by editorial desk.",
};

export default function ExplorePage() {
  const newsCount = articles.filter((article) => article.kind === "News").length;
  const blogCount = articles.filter((article) => article.kind === "Blog").length;

  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden border-b border-ink/15">
        <div className="paper-grain pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
          <nav aria-label="Breadcrumb" className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
            <Link href="/" className="hover:text-cobalt">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-coral">Explore</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cobalt">
                <SparkIcon className="h-3 w-3" />
                The complete archive
              </p>
              <h1 className="mt-5 font-display text-[clamp(4.4rem,10vw,9.5rem)] leading-[0.8] tracking-[-0.07em]">
                Explore
                <br />
                <span className="italic text-cobalt">every angle.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/65 text-pretty">
                News, blog posts, interviews, explainers, and dispatches—grouped
                into seven editorial desks—and you can create your own. Pick a
                subject, add a category and article with an image, or follow a
                good sentence somewhere unexpected.
              </p>

              <div className="mt-9 grid max-w-xl grid-cols-3 border-y border-ink/20 py-5">
                {[
                  [String(categories.length).padStart(2, "0"), "Dedicated desks"],
                  [String(articles.length), "Original stories"],
                  [String(newsCount + blogCount).padStart(2, "0"), "News + blog"],
                ].map(([number, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl leading-none md:text-4xl">{number}</p>
                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/50">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/explore/${category.slug}`}
                    className="rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                    style={{
                      borderColor: category.accent,
                      backgroundColor: category.soft,
                      color: category.accent,
                    }}
                  >
                    {category.shortName}
                  </Link>
                ))}
                <AuthActionLink
                  href="#add-category"
                  mode="signup"
                  className="rounded-full bg-cobalt px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink"
                >
                  + Add category
                </AuthActionLink>
                <AuthActionLink
                  href="#add-article"
                  className="rounded-full bg-ink px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-cobalt"
                >
                  + Add article
                </AuthActionLink>
                <Link
                  href="#more"
                  className="rounded-full border border-ink/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
                >
                  More
                </Link>
              </div>
            </div>

            <div className="relative min-h-[390px] sm:min-h-[480px]">
              <div className="absolute right-0 top-0 h-[74%] w-[70%] overflow-hidden rounded-t-full rounded-b-[3px] border border-ink/15 bg-coral">
                <Image
                  src="/images/hero.jpg"
                  alt="A fashion portrait in a cobalt coat"
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 35vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-3 left-0 w-[58%] overflow-hidden rounded-[3px] border-4 border-[#ece5d9] shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/trending.jpg"
                    alt="Abstract iridescent spheres representing trending culture"
                    fill
                    sizes="(max-width: 1024px) 60vw, 28vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute left-0 top-6 flex h-24 w-24 items-center justify-center rounded-full bg-lime text-center text-[9px] font-bold uppercase leading-tight tracking-[0.14em]">
                7 desks
                <br />
                1 archive
              </div>
              <div className="absolute bottom-0 right-0 rounded-full bg-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                Updated daily
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="mb-9 flex flex-col gap-4 border-b border-ink/20 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-coral">
              Browse by content type / 01
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-7xl">
              Seven desks, seven pages
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-right">
            Each desk has its own cover, editor&apos;s note, and complete list of
            articles in that subject.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
          <Link
            href="#latest"
            className="group flex min-h-[290px] flex-col justify-between rounded-[3px] bg-ink p-6 text-paper transition-colors hover:bg-cobalt"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
              Or start here
            </span>
            <span className="font-display text-5xl leading-[0.95] tracking-[-0.04em]">
              Just show me
              <span className="block italic text-lime">everything.</span>
            </span>
            <span className="flex items-center justify-between border-t border-white/25 pt-4 text-[10px] font-bold uppercase tracking-[0.18em]">
              Jump to all stories
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
        </div>
      </section>

      <section id="latest" className="scroll-mt-28 border-y border-ink/15 bg-white/45">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
          <div className="mb-9 flex flex-col gap-5 border-b border-ink/20 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cobalt">
                The story index / 02
              </p>
              <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-7xl">
                Latest stories
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/60 lg:text-right">
              Search the full archive, switch between <strong>News</strong> and{" "}
              <strong>Blog</strong>, then narrow the results by editorial desk.
            </p>
          </div>
          <StoryBrowser />
        </div>
      </section>

      <AddCategorySection />
      <AddArticleSection />
      <MoreSection />

      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "News",
              copy: "Reported articles and timely analysis, written for readers who want the context behind the headline.",
              accent: "#1749E6",
            },
            {
              number: "02",
              title: "Blog",
              copy: "Essays, guides, profiles, and dispatches with a more personal pace and a longer shelf life.",
              accent: "#DF4E70",
            },
            {
              number: "03",
              title: "Desks",
              copy: "Seven original desks each have a page; new article types create additional reader-added pages under More.",
              accent: "#08766E",
            },
          ].map((item) => (
            <div key={item.title} className="border-t-2 pt-6" style={{ borderColor: item.accent }}>
              <span className="font-display text-3xl" style={{ color: item.accent }}>
                {item.number}
              </span>
              <h3 className="mt-5 font-display text-3xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
