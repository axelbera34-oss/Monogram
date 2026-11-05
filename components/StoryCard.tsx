import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";
import { getArticleHref, getCategory, type Article } from "@/lib/content";

type StoryCardProps = {
  article: Article;
  index?: number;
  priority?: boolean;
  showDek?: boolean;
  className?: string;
};

function TypographicCover({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const category = getCategory(article.category);
  const accent = category?.accent ?? "#171715";
  const soft = category?.soft ?? "#E9E4DA";

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: soft }}>
      <div className="dot-pattern absolute inset-0 opacity-15" style={{ color: accent }} />
      <div
        className="absolute -right-10 top-1/3 h-44 w-44 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: accent }}
      />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-3">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ color: accent }}
          >
            MONOGRAM / {category?.shortName}
          </span>
          <span
            className="font-display text-5xl leading-none opacity-25"
            style={{ color: accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="max-w-[80%]">
          <p
            className="font-display text-3xl italic leading-[1.05] md:text-4xl"
            style={{ color: accent }}
          >
            {category?.tagline}
          </p>
          <div className="mt-4 h-1 w-16" style={{ backgroundColor: accent }} />
        </div>
      </div>
    </div>
  );
}

export function StoryCard({
  article,
  index = 0,
  priority = false,
  showDek = true,
  className = "",
}: StoryCardProps) {
  const category = getCategory(article.category);
  const accent = category?.accent ?? "#171715";

  return (
    <Link
      href={getArticleHref(article)}
      className={`group flex h-full flex-col border-b border-ink/15 pb-7 ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-ink/5">
        {article.image ? (
          <Image
            src={article.image}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        ) : (
          <TypographicCover article={article} index={index} />
        )}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
            style={{ backgroundColor: accent }}
          >
            {article.kind}
          </span>
          <span className="rounded-full bg-paper/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink backdrop-blur">
            {article.format}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/55">
          <span style={{ color: accent }}>{category?.name}</span>
          <span aria-hidden="true">•</span>
          <span>{article.dateLabel}</span>
          <span aria-hidden="true">•</span>
          <span>{article.readTime}</span>
        </div>
        <h3 className="mt-3 font-display text-[1.7rem] leading-[1.08] tracking-[-0.025em] md:text-[2rem]">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
            {article.title}
          </span>
        </h3>
        {showDek ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/65 text-pretty">
            {article.dek}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs text-ink/60">
          <span>By {article.author}</span>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-transparent group-hover:bg-ink group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
