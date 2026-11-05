import Link from "next/link";
import { AuthButton } from "@/components/AuthButton";
import { MobileNav } from "@/components/MobileNav";
import { MoreMenu } from "@/components/MoreMenu";
import { SearchIcon, SparkIcon } from "@/components/Icons";
import { categories, siteInfo } from "@/lib/content";

export function Header() {
  return (
    <div className="sticky top-0 z-50">
      {/* <div className="bg-ink text-[10px] font-bold uppercase tracking-[0.18em] text-paper">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-4 px-5 lg:px-10">
          <span>{siteInfo.date}</span>
          <span className="hidden items-center gap-2 md:flex">
            <SparkIcon className="h-3 w-3 text-lime" />
            {siteInfo.edition}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Fresh daily
          </span>
        </div>
      </div> */}

      <nav className="relative border-b border-ink/15 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1400px] items-center gap-8 px-5 lg:px-10">
          <Link href="/" className="group flex shrink-0 items-baseline gap-2" aria-label="MONOGRAM home">
            <span className="font-display text-2xl font-black tracking-[-0.06em] md:text-[1.7rem]">
              MONOGRAM<span className="text-coral">.</span>
            </span>
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.22em] text-ink/45 xl:inline">
              Modern Notes
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/explore/${category.slug}`}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink/70 transition-colors hover:text-cobalt"
              >
                {category.shortName}
              </Link>
            ))}
            <MoreMenu />
            <Link
              href="/explore"
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-coral transition-colors hover:text-ink"
            >
              All Desks
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Link
              href="/explore#latest"
              aria-label="Search stories"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
            >
              <SearchIcon />
            </Link>
            <Link
              href="/#newsletter"
              className="hidden items-center rounded-full bg-ink px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-cobalt lg:inline-flex"
            >
              Subscribe
            </Link>
            <AuthButton />
            <MobileNav categories={categories} />
          </div>
        </div>
      </nav>
    </div>
  );
}
