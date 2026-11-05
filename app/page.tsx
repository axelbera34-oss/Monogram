import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { ArrowRight, ArrowUpRight, SparkIcon } from "@/components/Icons";
import { StoryCard } from "@/components/StoryCard";
import {
  categories,
  getArticle,
  getArticleHref,
  getCategoryName,
  sortedArticles,
  type Article,
} from "@/lib/content";

const coverStory = getArticle("trending", "the-new-shape-of-now")!;

const editorPicks = [
  getArticle("politics", "the-city-hall-after-the-vote"),
  getArticle("beauty", "the-quiet-return-of-skin"),
  getArticle("sports", "the-new-rules-of-speed"),
].filter((article): article is Article => Boolean(article));

const mostRead = sortedArticles.slice(0, 5);

const marqueeItems = [
  "The Culture Issue",
  "Seven editorial desks",
  "21 original stories",
  "Fresh perspectives daily",
  "Politics · Beauty · Sports · Celebrities · Trending",
];

export default function HomePage() {
  return (
    <main id="main-content" className="bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-ink/15">
        <div className="paper-grain pointer-events-none absolute inset-0 opacity-35" />
        <div
          className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full  blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 pb-12 pt-10 lg:grid-cols-[1.14fr_0.86fr] lg:gap-14 lg:px-10 lg:pb-16 lg:pt-14">
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em]">
                <span className="rounded-full bg-ink px-4 py-2 text-paper">Vol. 18</span>
                <span className="text-coral">Cover story</span>
               
              </div>
              <h1 className="mt-8 font-display text-[clamp(4.2rem,10.5vw,10rem)] leading-[0.78] tracking-[-0.075em]">
                The new
                <br />
                shape of
                <br />
                <span className="italic text-cobalt">now.</span>.
              </h1>
              <div className="mt-10 grid max-w-2xl gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
                <p className="text-base leading-relaxed text-ink/65 text-pretty md:text-lg">
                  A modern magazine for curious people. Sharp reporting, generous
                  design, and the cultural signals that deserve a second look.
                </p>
                <Link
                  href={getArticleHref(coverStory)}
                  className="group inline-flex h-14 w-fit items-center gap-3 rounded-full bg-ink px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-cobalt"
                >
                  Read cover story
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-3 border-t border-ink/20 pt-5">
              {[
                ["07", "Editorial desks"],
                ["21", "Original stories"],
                ["01", "Point of view"],
              ].map(([number, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl leading-none md:text-4xl">{number}</p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-ink/50 md:text-[10px]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -left-4 top-16 z-10 flex h-24 w-24 items-center justify-center rounded-full bg-lime text-center text-[9px] font-bold uppercase leading-tight tracking-[0.14em] md:-left-8 md:h-28 md:w-28"
              aria-hidden="true"
            >
              Fresh
              <br />
              this week
            </div>
            <div className="ml-auto w-full max-w-[520px] pl-8 md:pl-12">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[4px] border border-ink/15 bg-coral">
                <Image
                  src="/images/hero.jpg"
                  alt="A fashion portrait in a cobalt coat against a coral wall"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(0,0,0,.62))] p-6 pt-20 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
                    The Culture Issue
                  </p>
                  <p className="mt-2 font-display text-3xl italic leading-none">
                    Form follows feeling
                  </p>
                </div>
              </div>
            </div>
            <p className="ml-auto mt-4 max-w-[520px] pl-8 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45 md:pl-12">
              Cover portrait · MONOGRAM studio
            </p>
          </div>
        </div>
      </section>

      {/* Moving headline strip */}
      <div className="overflow-hidden border-b border-ink/15 bg-ink py-3 text-paper">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.22em]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-8">
                  <SparkIcon className="h-3 w-3 text-lime" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Editor's picks */}
      <section id="inside" className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="mb-10 flex flex-col gap-5 border-b border-ink/20 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-coral">
              In this issue / 01
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-7xl">
              Editor&apos;s picks
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-right">
            Three stories that set the pace for this edition: public life, personal
            style, and the science of speed.
          </p>
        </div>
        <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {editorPicks.map((article, index) => (
            <StoryCard
              key={article.slug}
              article={article}
              index={index}
              priority={index === 0}
            />
          ))}
        </div>
      </section>

      {/* Content area: desks and the primary Explore button */}
      <section id="sections" className="border-y border-ink/15 bg-[#efe9df]">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-8 border-b border-ink/20 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cobalt">
                The content desk / 02
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(3.4rem,7vw,7rem)] leading-[0.9] tracking-[-0.055em] text-balance">
                Choose the story you came for.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <p className="max-w-sm text-sm leading-relaxed text-ink/60 lg:text-right">
                Every topic has its own room in the archive, with news and blog
                writing gathered together.
              </p>
              <Link
                href="/explore"
                aria-label="Explore all stories and desks"
                className="group inline-flex items-center gap-5 rounded-full bg-cobalt px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.03]"
              >
                Explore
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.slug}
                category={category}
                className={index === 0 ? "sm:col-span-2 xl:col-span-2 xl:min-h-[360px]" : ""}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55 sm:flex-row sm:items-center sm:justify-between">
            <span>Politics · Beauty · Sports · Celebrities · Trending · Culture · Tech</span>
            <Link href="/explore" className="inline-flex items-center gap-2 text-cobalt">
              View the full archive <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Editor's letter + most read */}
      <section id="about" className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24 lg:px-10 lg:py-24">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-lime">
              From the editors / 03
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">
              A magazine
              <br />
              should leave
              <br />
              <span className="italic text-coral">room.</span>
            </h2>
            <div className="mt-8 max-w-xl border-l-2 border-lime pl-6 font-display text-xl italic leading-relaxed text-white/80 md:text-2xl">
              “The present tense has become plural: several nows, moving at
              different speeds.”
            </div>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60">
              MONOGRAM is designed like a well-edited print issue: strong covers,
              clear sections, considered white space, and enough quiet to keep
              reading. Each desk has its own page, but the best discoveries happen
              between them.
            </p>
            <Link
              href="/explore"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/35 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-paper hover:text-ink"
            >
              Open the archive
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <div className="mb-7 flex items-end justify-between border-b border-white/20 pb-5">
              <h3 className="font-display text-3xl">Most read</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                This edition
              </span>
            </div>
            <ol className="divide-y divide-white/15">
              {mostRead.map((article, index) => (
                <li key={article.slug}>
                  <Link
                    href={getArticleHref(article)}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-5"
                  >
                    <span className="font-display text-3xl text-white/35">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-lime">
                        {getCategoryName(article.category)} · {article.kind}
                      </span>
                      <span className="mt-1 block font-display text-xl leading-tight transition-colors group-hover:text-coral md:text-2xl">
                        {article.title}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Final archive callout */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="relative isolate overflow-hidden rounded-[3px] bg-cobalt px-6 py-12 text-white md:px-12 md:py-16">
          <div className="paper-grain pointer-events-none absolute inset-0 opacity-10" />
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border-[36px] border-lime/80"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-lime">
                Edition 18 / Complete archive
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(3rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.055em]">
                Every desk.
                <br />
                <span className="italic">One good rabbit hole.</span>
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-base leading-relaxed text-white/75">
                Search the archive, switch between news and blog writing, or go
                straight to the section that feels like yours.
              </p>
              <Link
                href="/explore"
                className="group mt-7 inline-flex items-center gap-4 rounded-full bg-lime px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink"
              >
                Explore all stories
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
