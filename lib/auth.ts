export type AuthMode = "signin" | "signup";
export type AuthRole = "admin" | "reader";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};

export type StoredAuthAccount = AuthUser & {
  salt: string;
  passwordHash: string;
  createdAt: string;
};

export type StoredAuthSession = {
  userId: string;
};

export type AuthResult = { ok: true } | { ok: false; error: string };

export const AUTH_ACCOUNTS_STORAGE_KEY = "monogram-auth-accounts-v1";
export const AUTH_SESSION_STORAGE_KEY = "monogram-auth-session-v1";

// Built-in demo credentials. This is intentionally client-side and is not
// production authentication. Do not use a real password.
export const DEMO_ADMIN_CREDENTIALS = {
  name: "MONOGRAM Admin",
  email: "admin@monogram.test",
  password: "Monogram2026!",
} as const;

const DEMO_ADMIN_ID = "monogram-demo-admin-v1";
const DEMO_ADMIN_SALT = "monogram-demo-admin-salt-v1";

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isDemoAdminEmail(value: string): boolean {
  return normalizeEmail(value) === normalizeEmail(DEMO_ADMIN_CREDENTIALS.email);
}

export function makeAuthId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function makeSalt(): string {
  return makeAuthId();
}

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  const input = `${salt}:${password}`;

  if (typeof crypto !== "undefined" && crypto.subtle) {
    const data = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  // Non-secure fallback for restricted browser contexts; demo use only.
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fallback-${(hash >>> 0).toString(16)}`;
}

export async function createDemoAdminAccount(): Promise<StoredAuthAccount> {
  return {
    id: DEMO_ADMIN_ID,
    name: DEMO_ADMIN_CREDENTIALS.name,
    email: normalizeEmail(DEMO_ADMIN_CREDENTIALS.email),
    role: "admin",
    salt: DEMO_ADMIN_SALT,
    passwordHash: await hashPassword(
      DEMO_ADMIN_CREDENTIALS.password,
      DEMO_ADMIN_SALT,
    ),
    createdAt: "2026-01-01T00:00:00.000Z",
  };
}

export function parseStoredAccounts(raw: string | null): StoredAuthAccount[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (account): account is StoredAuthAccount =>
          Boolean(
            account &&
              typeof account === "object" &&
              "id" in account &&
              "name" in account &&
              "email" in account &&
              "salt" in account &&
              "passwordHash" in account,
          ),
      )
      .map((account) => ({
        ...account,
        role: account.role === "admin" ? "admin" : "reader",
      }));
  } catch {
    return [];
  }
}

export function parseStoredSession(raw: string | null): StoredAuthSession | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<StoredAuthSession>;
    return typeof parsed.userId === "string" ? { userId: parsed.userId } : null;
  } catch {
    return null;
  }
}

export function initialsFor(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "M";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function validateAuthDetails(
  name: string,
  email: string,
  password: string,
  mode: AuthMode,
): string | null {
  if (mode === "signup" && name.trim().length < 2) {
    return "Please enter a name with at least 2 characters.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  if (password.length < 6) {
    return "Please use a password with at least 6 characters.";
  }
  return null;
}
