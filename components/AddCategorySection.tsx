"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthGate } from "@/components/AuthGate";
import { useAuth } from "@/components/AuthProvider";
import { ArrowRight, ArrowUpRight, SparkIcon } from "@/components/Icons";
import { ImagePicker } from "@/components/ImagePicker";
import { useUserContent } from "@/components/UserContentProvider";
import {
  categoryNameExists,
  customCategoryPalette,
  getUserCategoryHref,
  type UserCategory,
} from "@/lib/user-content";

const fieldClass =
  "w-full rounded-[2px] border border-ink/20 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-cobalt";
const labelClass =
  "mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55";

type CategoryForm = {
  name: string;
  description: string;
  image?: string;
};

const initialForm: CategoryForm = {
  name: "",
  description: "",
  image: undefined,
};

export function AddCategorySection() {
  const { customCategories, createCategory, isReady } = useUserContent();
  const { user, isReady: authReady } = useAuth();
  const editorReady = isReady && authReady;
  const canEdit = editorReady && Boolean(user);
  const [form, setForm] = useState<CategoryForm>(initialForm);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [created, setCreated] = useState<UserCategory | null>(null);
  const [error, setError] = useState("");

  function setField(field: keyof Omit<CategoryForm, "image">, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function setImage(value: string | undefined) {
    setForm((current) => ({ ...current, image: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canEdit) return;

    const name = form.name.trim().replace(/\s+/g, " ");
    if (!name) return;

    if (categoryNameExists(name, customCategories)) {
      setError(
        "That type is already in the archive. Use the article form to add a story to it.",
      );
      return;
    }

    const colors = customCategoryPalette[paletteIndex];
    const category = createCategory({
      name,
      description: form.description.trim(),
      accent: colors.accent,
      soft: colors.soft,
      image: form.image,
    });

    setCreated(category);
    setError("");
    setForm(initialForm);
    setPaletteIndex((current) => (current + 1) % customCategoryPalette.length);
  }

  return (
    <section id="add-category" className="scroll-mt-28 border-y border-ink/15 bg-[#e7edfa]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 border-b border-ink/20 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cobalt">
              Create a desk / 03
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.045em] md:text-7xl">
              Add a new category
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-right">
            Sign in, create the category first, then add its first article. The
            article form below is prefilled with the new type automatically.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="flex flex-col justify-between rounded-[3px] bg-cobalt p-7 text-white md:p-9">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-lime">
                <SparkIcon className="h-3 w-3" />
                A desk of its own
              </p>
              <h3 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.035em]">
                Name it.
                <span className="block italic text-lime">Fill it.</span>
              </h3>
              <ol className="mt-8 space-y-5">
                {[
                  ["01", "Give the category a name, description, color, and optional cover image."],
                  ["02", "It immediately appears in More and gets its own page."],
                  ["03", "Use the prefilled article form to publish the first story in that category."],
                ].map(([number, copy]) => (
                  <li key={number} className="flex gap-4 border-t border-white/20 pt-4">
                    <span className="font-display text-xl text-lime">{number}</span>
                    <span className="text-sm leading-relaxed text-white/75">{copy}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Link
              href="/explore#more"
              className="mt-10 inline-flex items-center gap-2 border-t border-white/20 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-lime"
            >
              See current More categories <ArrowUpRight className="h-3 w-3" />
            </Link>
          </aside>

          <div className="rounded-[3px] border border-ink/15 bg-paper p-5 shadow-xl md:p-8">
            {!editorReady ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-[3px] border border-dashed border-ink/25 text-center">
                <div>
                  <p className="font-display text-3xl">Checking your session…</p>
                  <p className="mt-2 text-sm text-ink/55">
                    The category editor opens after sign-in.
                  </p>
                </div>
              </div>
            ) : !user ? (
              <AuthGate
                title="add a category"
                description="Sign in or create an account to create a new desk, add its cover image, and publish articles inside it."
              />
            ) : (
            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              {user ? (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-[2px] bg-lime/40 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] md:col-span-2">
                  <span>Signed in as {user.name}</span>
                  <span>
                    {user.role === "admin" ? "Admin editor unlocked" : "Editor unlocked"}
                  </span>
                </div>
              ) : null}
              <div className="md:col-span-2">
                <label htmlFor="category-name" className={labelClass}>
                  Category name *
                </label>
                <input
                  id="category-name"
                  required
                  value={form.name}
                  onChange={(event) => setField("name", event.target.value)}
                  placeholder="Food, Travel, Design, Local News…"
                  className={fieldClass}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="category-description" className={labelClass}>
                  Description
                </label>
                <textarea
                  id="category-description"
                  rows={3}
                  value={form.description}
                  onChange={(event) => setField("description", event.target.value)}
                  placeholder="What belongs in this category?"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="md:col-span-2">
                <p className={labelClass}>Accent color</p>
                <div className="flex flex-wrap gap-2">
                  {customCategoryPalette.map((colors, index) => (
                    <button
                      key={colors.accent}
                      type="button"
                      aria-label={`Use palette ${index + 1}`}
                      aria-pressed={paletteIndex === index}
                      onClick={() => setPaletteIndex(index)}
                      className={`relative h-11 w-11 rounded-full border-2 transition-transform hover:scale-110 ${
                        paletteIndex === index
                          ? "border-ink scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: colors.accent }}
                    >
                      <span
                        className="absolute inset-2 rounded-full"
                        style={{ backgroundColor: colors.soft }}
                      />
                      {paletteIndex === index ? (
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                          ✓
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 border-t border-ink/15 pt-5">
                <ImagePicker
                  id="category-image"
                  value={form.image}
                  onChange={setImage}
                  label="Category cover image section"
                  description="Optional. Uploads under 1 MB are saved as data URLs; external links are stored as URLs."
                />
              </div>

              {error ? (
                <div role="alert" className="rounded-[2px] border border-coral/30 bg-coral/5 p-4 text-sm font-semibold text-coral md:col-span-2">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-5 md:col-span-2">
                <p className="text-xs leading-relaxed text-ink/50">
                  * Required. New categories are browser-local.
                </p>
                <button
                  type="submit"
                  disabled={!canEdit}
                  className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Create category
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
            )}

            {created && user ? (
              <div role="status" className="mt-6 rounded-[3px] border border-cobalt/25 bg-cobalt/5 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cobalt">
                  Category created
                </p>
                <h3 className="mt-2 font-display text-2xl">
                  “{created.name}” is now in More
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  The article form below is now set to <strong>{created.name}</strong>.
                  Add an article there and it will appear on this category&apos;s page.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.14em]">
                  <Link
                    href={getUserCategoryHref(created.slug)}
                    className="inline-flex items-center gap-1 text-cobalt"
                  >
                    Open category page <ArrowUpRight className="h-3 w-3" />
                  </Link>
                  <Link
                    href="#add-article"
                    className="inline-flex items-center gap-1 text-ink/60"
                  >
                    Add the first article <ArrowUpRight className="h-3 w-3" />
                  </Link>
                  <Link
                    href="#more"
                    className="inline-flex items-center gap-1 text-ink/60"
                  >
                    View More <ArrowUpRight className="h-3 w-3" />
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
