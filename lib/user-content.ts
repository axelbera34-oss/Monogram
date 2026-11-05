import { categories, type ArticleKind, type Category } from "@/lib/content";

export type UserCategory = {
  slug: string;
  name: string;
  description: string;
  accent: string;
  soft: string;
  image?: string;
  createdAt: string;
};

export type UserArticle = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  kind: ArticleKind;
  format: string;
  author: string;
  dateLabel: string;
  publishedAt: string;
  readTime: string;
  categorySlug: string;
  categoryName: string;
  isCustomCategory: boolean;
  image?: string;
  tags: string[];
  body: string[];
};

export type NewArticleInput = {
  title: string;
  type: string;
  kind: ArticleKind;
  author: string;
  dek: string;
  body: string;
  tags: string;
  image?: string;
};

export type NewCategoryInput = {
  name: string;
  description: string;
  accent: string;
  soft: string;
  image?: string;
};

export type AddArticleResult = {
  categorySlug: string;
  categoryName: string;
  isCustomCategory: boolean;
  createdCategory: boolean;
};

export type UserContentState = {
  categories: UserCategory[];
  articles: UserArticle[];
};

type ResolvedCategory = {
  slug: string;
  name: string;
};

export const USER_CONTENT_STORAGE_KEY = "monogram-user-content-v1";

export const customCategoryPalette = [
  { accent: "#B64277", soft: "#F9DFEC" },
  { accent: "#0B6E8F", soft: "#DDF1F7" },
  { accent: "#A85A00", soft: "#FBE8CB" },
  { accent: "#4F5BC4", soft: "#E3E6FF" },
  { accent: "#28734F", soft: "#DDF0E4" },
  { accent: "#A33838", soft: "#F8DDDD" },
  { accent: "#67509B", soft: "#E9E1F8" },
];

export function normalizeType(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(value: string): string {
  return normalizeType(value).replace(/\s+/g, "-") || "topic";
}

export function findExistingCategory(
  value: string,
  availableCategories: Category[] = categories,
): Category | undefined {
  const normalized = normalizeType(value);
  if (!normalized) return undefined;

  return availableCategories.find(
    (category) =>
      normalizeType(category.name) === normalized ||
      normalizeType(category.shortName) === normalized ||
      normalizeType(category.slug) === normalized,
  );
}

export function findUserCategory(
  value: string,
  userCategories: UserCategory[],
): UserCategory | undefined {
  const normalized = normalizeType(value);
  if (!normalized) return undefined;

  return userCategories.find(
    (category) =>
      normalizeType(category.name) === normalized ||
      normalizeType(category.slug) === normalized,
  );
}

export function categoryNameExists(
  value: string,
  userCategories: UserCategory[],
  availableCategories: Category[] = categories,
): boolean {
  return Boolean(
    findExistingCategory(value, availableCategories) ||
      findUserCategory(value, userCategories),
  );
}

export function createUserCategory(
  name: string,
  existing: UserCategory[],
): UserCategory {
  const cleanName = name.trim().replace(/\s+/g, " ") || "New Topic";
  const baseSlug = slugify(cleanName);
  let slug = baseSlug;
  let suffix = 2;

  while (existing.some((category) => category.slug === slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const colors =
    customCategoryPalette[existing.length % customCategoryPalette.length];

  return {
    slug,
    name: cleanName,
    description: `Reader-added stories about ${cleanName}. A new desk created because its type was not part of the original archive.`,
    accent: colors.accent,
    soft: colors.soft,
    createdAt: new Date().toISOString(),
  };
}

export function createUserCategoryFromInput(
  input: NewCategoryInput,
  existing: UserCategory[],
): UserCategory {
  const base = createUserCategory(input.name, existing);
  const description = input.description.trim();

  return {
    ...base,
    description:
      description ||
      `Reader-added stories about ${base.name}. Create articles and collect them on this dedicated desk.`,
    accent: input.accent || base.accent,
    soft: input.soft || base.soft,
    image: input.image?.trim() || undefined,
  };
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createUserArticle(
  input: NewArticleInput,
  category: ResolvedCategory,
  isCustomCategory: boolean,
): UserArticle {
  const now = new Date();
  const paragraphs = input.body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const body = paragraphs.length > 0 ? paragraphs : [input.body.trim()];
  const wordCount = [input.dek, ...body]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(now);

  return {
    id: makeId(),
    slug: `${slugify(input.title)}-${makeId().slice(0, 6)}`,
    title: input.title.trim(),
    dek: input.dek.trim(),
    kind: input.kind,
    format: "Reader Submission",
    author: input.author.trim() || "MONOGRAM reader",
    dateLabel,
    publishedAt: now.toISOString(),
    readTime: `${Math.max(2, Math.ceil(wordCount / 180))} min read`,
    categorySlug: category.slug,
    categoryName: category.name,
    isCustomCategory,
    image: input.image?.trim() || undefined,
    tags: input.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 6),
    body,
  };
}

export function getUserCategoryHref(slug: string): string {
  return `/more/${slug}`;
}

export function parseStoredUserContent(raw: string | null): UserContentState {
  const empty: UserContentState = { categories: [], articles: [] };
  if (!raw) return empty;

  try {
    const parsed = JSON.parse(raw) as Partial<UserContentState>;
    return {
      categories: Array.isArray(parsed.categories)
        ? parsed.categories.filter(
            (category): category is UserCategory =>
              Boolean(category?.slug) && Boolean(category?.name),
          )
        : [],
      articles: Array.isArray(parsed.articles)
        ? parsed.articles.filter(
            (article): article is UserArticle =>
              Boolean(article?.id) && Boolean(article?.title),
          )
        : [],
    };
  } catch {
    return empty;
  }
}
