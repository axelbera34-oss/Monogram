"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAuth } from "@/components/AuthProvider";
import type { AuthMode } from "@/lib/auth";

type AuthActionLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  mode?: AuthMode;
  onNavigate?: () => void;
};

export function AuthActionLink({
  href,
  className,
  children,
  mode = "signin",
  onNavigate,
}: AuthActionLinkProps) {
  const { user, openAuthModal } = useAuth();

  if (user) {
    return (
      <Link href={href} className={className} onClick={onNavigate}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      title="Sign in required"
      onClick={() => {
        onNavigate?.();
        openAuthModal(mode);
      }}
    >
      {children}
    </button>
  );
}
