"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/components/AuthProvider";
import { ArrowRight, ArrowUpRight, SparkIcon } from "@/components/Icons";
import { ImagePicker } from "@/components/ImagePicker";
import { useUserContent } from "@/components/UserContentProvider";
import { categories, type ArticleKind } from "@/lib/content";
import {
  getUserCategoryHref,
  type AddArticleResult,
  type NewArticleInput,
} from "@/lib/user-content";

const fieldClass =
  "w-full rounded-[2px] border border-ink/20 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-cobalt";
const labelClass =
  "mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55";

const initialForm: NewArticleInput = {
  title: "",
  type: "",
  kind: "Blog",
  author: "",
  dek: "",
  body: "",
  tags: "",
  image: undefined,
};

export function AddArticleSection() {
  const {
    customCategories,
    addArticle,
    isReady,
    prefillType,
    setPrefillType,
  } = useUserContent();
  const { user, isReady: authReady } = useAuth();
  const editorReady = isReady && authReady;
  const canEdit = editorReady && Boolean(user);
  const [form, setForm] = useState<NewArticleInput>(initialForm);
  const [result, setResult] = useState<AddArticleResult | null>(null);
  const [prefillNotice, setPrefillNotice] = useState<string | null>(null);

  const suggestions = Array.from(
    new Set([
      ...categories.map((category) => category.name),
      ...customCategories.map((category) => category.name),
    ]),
  ).sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (!prefillType) return;
    setForm((current) => ({ ...current, type: prefillType }));
    setPrefillNotice(prefillType);
    setPrefillType(null);
  }, [prefillType, setPrefillType]);

  useEffect(() => {
    if (!user) return;
    setForm((current) =>
      current.author ? current : { ...current, author: user.name },
    );
  }, [user]);

  function setField(
    field: Exclude<keyof NewArticleInput, "kind" | "image">,
    value: string,
  ) {
    if (field === "type") setPrefillNotice(null);
    setForm((current) => ({ ...current, [field]: value }));
  }

  function setImage(value: string | undefined) {
    setForm((current) => ({ ...current, image: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canEdit) return;

    const submission = addArticle({
      ...form,
      title: form.title.trim(),
      type: form.type.trim(),
      author: form.author.trim(),
      dek: form.dek.trim(),
      body: form.body.trim(),
      tags: form.tags.trim(),
      image: form.image?.trim() || undefined,
    });

    setResult(submission);
    setForm(initialForm);
    setPrefillNotice(null);
  }

  const statusTitle = result?.createdCategory
    ? `“${result.categoryName}” was added to More`
    : result?.isCustomCategory
      ? `Added to “${result.categoryName}” in More`
      : result
        ? `Added to the ${result.categoryName} desk`
        : "";

  const statusCopy = result?.createdCategory
    ? "That type was not part of the original archive, so a new category and its own page were created."
    : result?.isCustomCategory
      ? "The article was added to an existing reader-created category."
      : result
        ? "The article now appears on this desk page and in the More section under existing-desk additions."
        : "";

  return (
    <section id="add-article" className="scroll-mt-28 border-b border-ink/15 bg-[#e9e1d5]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 border-b border-ink/20 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-coral">
              Reader submissions / 04
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-7xl">
              Add an article
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-right">
            Sign in to choose a type created above, add another article, and
            attach an optional cover image by upload or URL.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="flex flex-col justify-between rounded-[3px] bg-ink p-7 text-paper md:p-9">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-lime">
                <SparkIcon className="h-3 w-3" />
                How new types work
              </p>
              <h3 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.035em]">
                If it doesn&apos;t fit,
                <span className="block italic text-lime">make room.</span>
              </h3>
              <ol className="mt-8 space-y-5">
                {[
                  ["01", "Choose an existing desk, a category created above, or type a new subject."],
                  ["02", "Unrecognized subjects create a reader-added category in More."],
                  ["03", "Every new category gets its own page and appears in the More menu."],
                ].map(([number, copy]) => (
                  <li key={number} className="flex gap-4 border-t border-white/15 pt-4">
                    <span className="font-display text-xl text-lime">{number}</span>
                    <span className="text-sm leading-relaxed text-white/70">{copy}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-10 border-t border-white/15 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
              Browser-local demo · saved with localStorage
            </p>
          </aside>

          <div className="rounded-[3px] border border-ink/15 bg-paper p-5 shadow-xl md:p-8">
            {!editorReady ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-[3px] border border-dashed border-ink/25 text-center">
                <div>
                  <p className="font-display text-3xl">Checking your session…</p>
                  <p className="mt-2 text-sm text-ink/55">
                    The article editor opens after sign-in.
                  </p>
                </div>
              </div>
            ) : !user ? (
              <AuthGate
                title="add an article"
                description="Sign in or create an account to publish a story, attach an image, or add another article to any category."
              />
            ) : (
            <form id="article-form" onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              {user ? (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-[2px] bg-lime/40 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] md:col-span-2">
                  <span>Signed in as {user.name}</span>
                  <span>
                    {user.role === "admin" ? "Admin author prefilled" : "Author prefilled"}
                  </span>
                </div>
              ) : null}
              <div className="md:col-span-2">
                <label htmlFor="article-title" className={labelClass}>
                  Article title *
                </label>
                <input
                  id="article-title"
                  required
                  value={form.title}
                  onChange={(event) => setField("title", event.target.value)}
                  placeholder="A headline with a point of view"
                  className={fieldClass}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="article-type" className={labelClass}>
                  Type / desk *
                </label>
                <input
                  id="article-type"
                  required
                  list="article-type-options"
                  value={form.type}
                  onChange={(event) => setField("type", event.target.value)}
                  placeholder="Politics, Food… or another new type"
                  aria-describedby="article-type-help"
                  className={fieldClass}
                />
                <datalist id="article-type-options">
                  {suggestions.map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                  ))}
                </datalist>
                <p id="article-type-help" className="mt-2 text-xs leading-relaxed text-ink/50">
                  Use an existing type, or enter a new one. New types are listed in
                  the More section.
                </p>
                {prefillNotice ? (
                  <p role="status" className="mt-2 text-xs font-bold text-cobalt">
                    Type prefilled from your new category: {prefillNotice}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="article-kind" className={labelClass}>
                  Content format *
                </label>
                <select
                  id="article-kind"
                  value={form.kind}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      kind: event.target.value as ArticleKind,
                    }))
                  }
                  className={fieldClass}
                >
                  <option value="News">News</option>
                  <option value="Blog">Blog</option>
                </select>
              </div>

              <div>
                <label htmlFor="article-author" className={labelClass}>
                  Author
                </label>
                <input
                  id="article-author"
                  value={form.author}
                  onChange={(event) => setField("author", event.target.value)}
                  placeholder="MONOGRAM reader"
                  className={fieldClass}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="article-dek" className={labelClass}>
                  Short summary *
                </label>
                <textarea
                  id="article-dek"
                  required
                  rows={3}
                  value={form.dek}
                  onChange={(event) => setField("dek", event.target.value)}
                  placeholder="One or two sentences that set up the story"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="article-body" className={labelClass}>
                  Article text *
                </label>
                <textarea
                  id="article-body"
                  required
                  rows={7}
                  value={form.body}
                  onChange={(event) => setField("body", event.target.value)}
                  placeholder="Write the article here. Separate paragraphs with a blank line."
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="article-tags" className={labelClass}>
                  Tags (comma-separated)
                </label>
                <input
                  id="article-tags"
                  value={form.tags}
                  onChange={(event) => setField("tags", event.target.value)}
                  placeholder="design, cities, ideas"
                  className={fieldClass}
                />
              </div>

              <div className="border-t border-ink/15 pt-5 md:col-span-2">
                <ImagePicker
                  id="article-image"
                  value={form.image}
                  onChange={setImage}
                  label="Article image section"
                  description="Optional. Upload an image under 1 MB or paste an image URL. The image will appear with the story in More and on its category page."
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-5 md:col-span-2">
                <p className="text-xs leading-relaxed text-ink/50">
                  * Required. Additions are stored in this browser only.
                </p>
                <button
                  type="submit"
                  disabled={!canEdit}
                  className="inline-flex items-center gap-3 rounded-full bg-cobalt px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add article
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
            )}

            {result && user ? (
              <div
                role="status"
                className="mt-6 rounded-[3px] border border-cobalt/25 bg-cobalt/5 p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cobalt">
                  Article added
                </p>
                <h3 className="mt-2 font-display text-2xl">{statusTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{statusCopy}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.14em]">
                  <Link
                    href={
                      result.isCustomCategory
                        ? getUserCategoryHref(result.categorySlug)
                        : `/explore/${result.categorySlug}`
                    }
                    className="inline-flex items-center gap-1 text-cobalt"
                  >
                    Open category page <ArrowUpRight className="h-3 w-3" />
                  </Link>
                  <Link href="#more" className="inline-flex items-center gap-1 text-ink/60">
                    View More section <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
