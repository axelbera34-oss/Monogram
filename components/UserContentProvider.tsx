"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createUserArticle,
  createUserCategory,
  createUserCategoryFromInput,
  findExistingCategory,
  findUserCategory,
  parseStoredUserContent,
  USER_CONTENT_STORAGE_KEY,
  type AddArticleResult,
  type NewArticleInput,
  type NewCategoryInput,
  type UserArticle,
  type UserCategory,
} from "@/lib/user-content";

type UserContentContextValue = {
  customCategories: UserCategory[];
  userArticles: UserArticle[];
  isReady: boolean;
  prefillType: string | null;
  setPrefillType: (value: string | null) => void;
  createCategory: (input: NewCategoryInput) => UserCategory;
  addArticle: (input: NewArticleInput) => AddArticleResult;
  clearAll: () => void;
};

const UserContentContext = createContext<UserContentContextValue | null>(null);

export function UserContentProvider({ children }: { children: ReactNode }) {
  const [customCategories, setCustomCategories] = useState<UserCategory[]>([]);
  const [userArticles, setUserArticles] = useState<UserArticle[]>([]);
  const [prefillType, setPrefillType] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = parseStoredUserContent(
        window.localStorage.getItem(USER_CONTENT_STORAGE_KEY),
      );
      setCustomCategories(stored.categories);
      setUserArticles(stored.articles);
    } catch {
      // Storage can be unavailable in restricted browser contexts; the app still works in memory.
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    try {
      window.localStorage.setItem(
        USER_CONTENT_STORAGE_KEY,
        JSON.stringify({ categories: customCategories, articles: userArticles }),
      );
    } catch {
      // Ignore quota or privacy-mode errors; in-memory state remains usable.
    }
  }, [customCategories, userArticles, isReady]);

  function createCategory(input: NewCategoryInput): UserCategory {
    const category = createUserCategoryFromInput(input, customCategories);
    setCustomCategories((current) => [...current, category]);
    setPrefillType(category.name);
    return category;
  }

  function addArticle(input: NewArticleInput): AddArticleResult {
    const existingCategory = findExistingCategory(input.type);
    let category: { slug: string; name: string };
    let isCustomCategory = false;
    let createdCategory = false;

    if (existingCategory) {
      category = {
        slug: existingCategory.slug,
        name: existingCategory.name,
      };
    } else {
      const existingUserCategory = findUserCategory(
        input.type,
        customCategories,
      );

      if (existingUserCategory) {
        category = existingUserCategory;
      } else {
        const newCategory = createUserCategory(input.type, customCategories);
        setCustomCategories((current) => [...current, newCategory]);
        category = newCategory;
        createdCategory = true;
      }
      isCustomCategory = true;
    }

    const article = createUserArticle(input, category, isCustomCategory);
    setUserArticles((current) => [article, ...current]);

    return {
      categorySlug: category.slug,
      categoryName: category.name,
      isCustomCategory,
      createdCategory,
    };
  }

  function clearAll() {
    setCustomCategories([]);
    setUserArticles([]);
    setPrefillType(null);
  }

  const value: UserContentContextValue = {
    customCategories,
    userArticles,
    isReady,
    prefillType,
    setPrefillType,
    createCategory,
    addArticle,
    clearAll,
  };

  return (
    <UserContentContext.Provider value={value}>
      {children}
    </UserContentContext.Provider>
  );
}

export function useUserContent(): UserContentContextValue {
  const context = useContext(UserContentContext);
  if (!context) {
    throw new Error("useUserContent must be used inside UserContentProvider");
  }
  return context;
}
