"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AuthActionLink } from "@/components/AuthActionLink";
import { ArrowRight, ArrowUpRight, SparkIcon } from "@/components/Icons";
import { ReaderStoryDisclosure } from "@/components/ReaderStoryDisclosure";
import { useUserContent } from "@/components/UserContentProvider";

export function CustomCategoryPage() {
  const params = useParams<{ slug: string }>();
  const { customCategories, userArticles, isReady } = useUserContent();
  const category = customCategories.find((item) => item.slug === params.slug);
  const stories = userArticles.filter(
    (article) => article.categorySlug === params.slug,
  );

  if (!isReady) {
    return (
      <main id="main-content" className="flex min-h-[65vh] items-center">
        <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cobalt">
            Reader-added desk
          </p>
          <h1 className="mt-5 font-display text-6xl leading-none tracking-[-0.05em]">
            Loading your categories…
          </h1>
          <p className="mt-5 text-base text-ink/60">
            Reader-created categories are stored in this browser.
          </p>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main id="main-content" className="paper-grain flex min-h-[65vh] items-center">
        <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-coral">
            More / Missing category
          </p>
          <h1 className="mt-5 font-display text-[clamp(4rem,9vw,8rem)] leading-[0.85] tracking-[-0.06em]">
            Nothing filed
            <span className="block italic text-cobalt">here yet.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/65">
            Reader-added desks live in the browser where they were created. Sign
            in, create a category with the dedicated form, then add articles and
            images to it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AuthActionLink
              href="/explore#add-category"
              mode="signup"
              className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-paper hover:bg-cobalt"
            >
              Add a category <ArrowUpRight className="h-4 w-4" />
            </AuthActionLink>
            <Link
              href="/explore#more"
              className="inline-flex items-center gap-3 rounded-full border border-ink/25 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-ink hover:text-paper"
            >
              View More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
            <Link href="/explore#more" className="hover:text-cobalt">More</Link>
            <span className="mx-2">/</span>
            <span style={{ color: category.accent }}>{category.name}</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: category.accent }}>
                <SparkIcon className="h-3 w-3" />
                Reader-added category / More
              </p>
              <h1 className="mt-5 font-display text-[clamp(4rem,9vw,8.5rem)] leading-[0.82] tracking-[-0.07em] text-balance">
                {category.name}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/65 text-pretty">
                {category.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#stories"
                  className="inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                  style={{ backgroundColor: category.accent }}
                >
                  Read this desk <ArrowRight className="h-4 w-4" />
                </Link>
                <AuthActionLink
                  href="/explore#add-article"
                  className="rounded-full border border-ink/25 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
                >
                  Add an article
                </AuthActionLink>
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

            <div className="relative flex min-h-[350px] items-center justify-center sm:min-h-[440px]">
              <div
                className="absolute right-4 top-4 h-28 w-28 rounded-full opacity-20 blur-2xl"
                style={{ backgroundColor: category.accent }}
              />
              <div
                className="relative flex aspect-[4/5] w-full max-w-sm flex-col justify-between overflow-hidden rounded-t-full rounded-b-[3px] border border-ink/15 p-8 text-white shadow-2xl"
                style={{ backgroundColor: category.accent }}
              >
                {category.image ? (
                  <>
                    {/* User-supplied data URLs and external URLs bypass next/image domain configuration. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={category.image}
                      alt={`${category.name} category cover`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08)_0%,rgba(0,0,0,.15)_45%,rgba(0,0,0,.7)_100%)]" />
                  </>
                ) : (
                  <div className="dot-pattern absolute inset-0 opacity-15" />
                )}
                <div className="relative text-[10px] font-bold uppercase tracking-[0.24em]">
                  MONOGRAM / MORE
                </div>
                <div className="relative">
                  <p className="font-display text-5xl italic leading-[0.95]">
                    {category.name}
                  </p>
                  <div className="mt-5 h-1 w-20 bg-white/70" />
                </div>
                <div className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
                  Reader-created desk
                </div>
              </div>
              <div className="absolute bottom-0 left-0 rounded-full bg-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                Saved in this browser
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="scroll-mt-28 mx-auto max-w-[1200px] px-5 py-16 lg:px-8 lg:py-20">
        <div className="mb-9 flex flex-col gap-4 border-b border-ink/20 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: category.accent }}>
              Stories in More / {category.name}
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-7xl">
              The reader file
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-right">
            Open a story to read it in full, including any uploaded or linked image.
          </p>
        </div>
        {stories.length > 0 ? (
          <div className="rounded-[3px] border border-ink/15 bg-white/55">
            {stories.map((story, index) => (
              <ReaderStoryDisclosure
                key={story.id}
                story={story}
                accent={category.accent}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-ink/25 p-8 text-center md:p-12">
            <p className="font-display text-4xl">This desk is ready for its first article.</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/60">
              The category is already listed in More. Add a story and set its type
              to <strong>{category.name}</strong>; an optional image will appear here.
            </p>
            <AuthActionLink
              href="/explore#add-article"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-paper hover:bg-cobalt"
            >
              Add the first article <ArrowUpRight className="h-4 w-4" />
            </AuthActionLink>
          </div>
        )}
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-14 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime">
              Keep building the archive
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[0.95] tracking-[-0.045em]">
              Another type belongs in <span className="italic text-coral">More.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <AuthActionLink
              href="/explore#add-category"
              mode="signup"
              className="inline-flex items-center gap-3 rounded-full bg-lime px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-ink"
            >
              Add a category <ArrowUpRight className="h-4 w-4" />
            </AuthActionLink>
            <Link
              href="/explore#more"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-paper hover:text-ink"
            >
              Back to More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
