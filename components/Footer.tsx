import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";
import { NewsletterForm } from "@/components/NewsletterForm";
import { categories, siteInfo } from "@/lib/content";

export function Footer() {
  return (
    <footer id="newsletter" className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen" />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-cobalt/25 blur-[100px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 border-b border-white/15 pb-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-lime">
              The Friday Dispatch
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">
              Stay
              <br />
              <span className="italic text-lime">curious.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <p className="max-w-xl text-lg leading-relaxed text-white/70 text-pretty">
              One considered dispatch each week: the best stories from every desk, a
              fresh idea, and the cultural details worth keeping.
            </p>
            <NewsletterForm />
            <p className="text-xs text-white/45">
              Demo form only — subscription state stays in your browser.
            </p>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr]">
          <div>
            <Link href="/" className="inline-block font-display text-3xl font-black tracking-[-0.06em]">
              MONOGRAM<span className="text-coral">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {siteInfo.tagline} A fictional editorial project built to show how a
              modern magazine can move between print and the web.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              Desks
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link href={`/explore/${category.slug}`} className="transition-colors hover:text-lime">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/explore" className="inline-flex items-center gap-1 font-bold text-lime">
                  All desks <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              Magazine
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/#inside" className="transition-colors hover:text-lime">Editor&apos;s picks</Link></li>
              <li><Link href="/#sections" className="transition-colors hover:text-lime">Sections</Link></li>
              <li><Link href="/#about" className="transition-colors hover:text-lime">About the issue</Link></li>
              <li><Link href="/explore#latest" className="transition-colors hover:text-lime">Story archive</Link></li>
              <li><Link href="/explore#more" className="transition-colors hover:text-lime">More &amp; additions</Link></li>
              <li><Link href="/explore#add-category" className="transition-colors hover:text-lime">Create a category</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${siteInfo.email}`} className="transition-colors hover:text-lime">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="transition-colors hover:text-lime">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://x.com/" target="_blank" rel="noreferrer" className="transition-colors hover:text-lime">
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 MONOGRAM. Fictional editorial demo.</span>
          <span>Built with Next.js + Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
