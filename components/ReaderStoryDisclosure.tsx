import type { UserArticle } from "@/lib/user-content";

type ReaderStoryDisclosureProps = {
  story: UserArticle;
  accent: string;
  defaultOpen?: boolean;
};

export function ReaderStoryDisclosure({
  story,
  accent,
  defaultOpen = false,
}: ReaderStoryDisclosureProps) {
  return (
    <details
      id={`story-${story.id}`}
      open={defaultOpen}
      className="reader-disclosure scroll-mt-32 border-b border-ink/15 last:border-b-0"
    >
      <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-5 transition-colors hover:bg-white/50 md:px-7">
        <div className="flex min-w-0 flex-1 gap-4">
          {story.image ? (
            <div className="hidden h-20 w-20 shrink-0 overflow-hidden rounded-[2px] border border-ink/15 bg-paper sm:block">
              {/* User-supplied data URLs and external URLs bypass next/image domain configuration. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image}
                alt={`Cover for ${story.title}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white"
                style={{ backgroundColor: accent }}
              >
                {story.kind}
              </span>
              <span className="rounded-full border border-ink/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-ink/60">
                {story.format}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/45">
                {story.categoryName}
              </span>
            </div>
            <h4 className="mt-3 font-display text-2xl leading-tight tracking-[-0.025em] md:text-3xl">
              {story.title}
            </h4>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60 text-pretty">
              {story.dek}
            </p>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/45">
              By {story.author} · {story.dateLabel} · {story.readTime}
            </p>
          </div>
        </div>
        <span className="disclosure-icon mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 font-display text-xl leading-none">
          +
        </span>
      </summary>
      <div className="border-t border-ink/10 bg-white/45 px-5 py-6 md:px-7">
        {story.image ? (
          <figure className="mb-7 overflow-hidden rounded-[2px] border border-ink/15 bg-paper">
            {/* User-supplied data URLs and external URLs bypass next/image domain configuration. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.image}
              alt={`Editorial image for ${story.title}`}
              loading="lazy"
              className="aspect-[16/8] h-auto w-full object-cover"
            />
            <figcaption className="border-t border-ink/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/45">
              Reader-supplied article image
            </figcaption>
          </figure>
        ) : null}
        <p className="font-display text-xl italic leading-relaxed text-ink/75">
          “{story.dek}”
        </p>
        <div className="mt-6 space-y-5 font-display text-lg leading-[1.75] text-ink/80">
          {story.body.map((paragraph, index) => (
            <p key={`${story.id}-body-${index}`} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
        {story.tags.length > 0 ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{ borderColor: accent, color: accent }}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </details>
  );
}
