import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";
import { countArticlesByCategory, type Category } from "@/lib/content";

export function CategoryCard({
  category,
  className = "",
}: {
  category: Category;
  className?: string;
}) {
  const count = countArticlesByCategory(category.slug);

  return (
    <Link
      href={`/explore/${category.slug}`}
      className={`group relative isolate flex min-h-[290px] flex-col overflow-hidden rounded-[3px] ${className}`}
      style={{ backgroundColor: category.soft }}
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.05)_0%,rgba(10,10,10,0.12)_35%,rgba(10,10,10,0.82)_100%)]" />
      <div className="relative flex flex-1 flex-col p-5 text-white md:p-6">
        <div className="flex items-start justify-between">
          <span className="rounded-full border border-white/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
            Desk {category.index}
          </span>
          <span className="font-display text-xl italic opacity-80">
            {category.kicker}
          </span>
        </div>
        <div className="mt-auto">
          <h3 className="font-display text-4xl leading-none tracking-[-0.035em] md:text-5xl">
            {category.name}
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
            {category.tagline}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-white/25 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {count} {count === 1 ? "story" : "stories"} · View desk
            </span>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform group-hover:rotate-45"
              style={{ backgroundColor: category.accent }}
              aria-hidden="true"
            >
              <ArrowUpRight className="h-4 w-4 text-white" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
