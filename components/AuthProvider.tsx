"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  AUTH_ACCOUNTS_STORAGE_KEY,
  AUTH_SESSION_STORAGE_KEY,
  createDemoAdminAccount,
  hashPassword,
  isDemoAdminEmail,
  makeAuthId,
  makeSalt,
  normalizeEmail,
  parseStoredAccounts,
  parseStoredSession,
  validateAuthDetails,
  type AuthMode,
  type AuthResult,
  type AuthUser,
  type StoredAuthAccount,
} from "@/lib/auth";

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  isAuthModalOpen: boolean;
  authModalMode: AuthMode;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: AuthMode) => void;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  createAccount: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthResult>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toPublicUser(account: StoredAuthAccount): AuthUser {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role === "admin" ? "admin" : "reader",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<StoredAuthAccount[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalModeState] = useState<AuthMode>("signin");

  useEffect(() => {
    let cancelled = false;

    async function loadAuthState() {
      try {
        const demoAdmin = await createDemoAdminAccount();
        const storedAccounts = parseStoredAccounts(
          window.localStorage.getItem(AUTH_ACCOUNTS_STORAGE_KEY),
        ).filter(
          (account) =>
            account.id !== demoAdmin.id && !isDemoAdminEmail(account.email),
        );
        const nextAccounts = [...storedAccounts, demoAdmin];
        const storedSession = parseStoredSession(
          window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY),
        );
        const activeAccount = nextAccounts.find(
          (candidate) => candidate.id === storedSession?.userId,
        );

        if (!cancelled) {
          setAccounts(nextAccounts);
          setUser(activeAccount ? toPublicUser(activeAccount) : null);
        }
      } catch {
        // Storage may be unavailable; keep the built-in admin in memory only.
        if (!cancelled) {
          try {
            setAccounts([await createDemoAdminAccount()]);
          } catch {
            setAccounts([]);
          }
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsReady(true);
      }
    }

    void loadAuthState();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    try {
      window.localStorage.setItem(
        AUTH_ACCOUNTS_STORAGE_KEY,
        JSON.stringify(accounts),
      );
      if (user) {
        window.localStorage.setItem(
          AUTH_SESSION_STORAGE_KEY,
          JSON.stringify({ userId: user.id }),
        );
      } else {
        window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
      }
    } catch {
      // Ignore quota or privacy-mode errors; keep the in-memory session.
    }
  }, [accounts, user, isReady]);

  function openAuthModal(mode: AuthMode = "signin") {
    setAuthModalModeState(mode);
    setIsAuthModalOpen(true);
  }

  function closeAuthModal() {
    setIsAuthModalOpen(false);
  }

  function setAuthModalMode(mode: AuthMode) {
    setAuthModalModeState(mode);
  }

  async function signIn(
    email: string,
    password: string,
  ): Promise<AuthResult> {
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail || !password) {
      return { ok: false, error: "Enter both your email and password." };
    }

    const account = accounts.find(
      (candidate) => normalizeEmail(candidate.email) === normalizedEmail,
    );
    if (!account) {
      return {
        ok: false,
        error: "No account found with that email. Create an account first.",
      };
    }

    const candidateHash = await hashPassword(password, account.salt);
    if (candidateHash !== account.passwordHash) {
      return { ok: false, error: "That password does not match this account." };
    }

    setUser(toPublicUser(account));
    setIsAuthModalOpen(false);
    return { ok: true };
  }

  async function createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResult> {
    const validationError = validateAuthDetails(
      name,
      email,
      password,
      "signup",
    );
    if (validationError) {
      return { ok: false, error: validationError };
    }

    const normalizedEmail = normalizeEmail(email);
    if (isDemoAdminEmail(normalizedEmail)) {
      return {
        ok: false,
        error: "That address belongs to the built-in admin. Use the sign-in tab.",
      };
    }
    if (
      accounts.some(
        (account) => normalizeEmail(account.email) === normalizedEmail,
      )
    ) {
      return {
        ok: false,
        error: "An account with that email already exists. Try signing in.",
      };
    }

    const salt = makeSalt();
    const passwordHash = await hashPassword(password, salt);
    const account: StoredAuthAccount = {
      id: makeAuthId(),
      name: name.trim().replace(/\s+/g, " "),
      email: normalizedEmail,
      role: "reader",
      salt,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    setAccounts((current) => [...current, account]);
    setUser(toPublicUser(account));
    setIsAuthModalOpen(false);
    return { ok: true };
  }

  function signOut() {
    setUser(null);
    setIsAuthModalOpen(false);
  }

  const value: AuthContextValue = {
    user,
    isReady,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
    signIn,
    createAccount,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
