import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <main id="main-content" className="paper-grain flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-coral">
          Error 404 / Missing page
        </p>
        <h1 className="mt-6 font-display text-[clamp(5rem,16vw,13rem)] leading-[0.8] tracking-[-0.07em]">
          Off the
          <span className="block italic text-cobalt">page.</span>
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/65">
          This story may have moved, changed desks, or never made it out of the
          drafts folder. The archive is a better place to begin again.
        </p>
        <Link
          href="/explore"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-cobalt"
        >
          Explore the archive
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
