import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthModal } from "@/components/AuthModal";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserContentProvider } from "@/components/UserContentProvider";
import { siteInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: `${siteInfo.name} — A Modern Magazine`,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.tagline,
  keywords: [
    "magazine",
    "editorial",
    "blog",
    "news",
    "politics",
    "beauty",
    "sports",
    "celebrities",
    "trending topics",
    "culture",
    "technology",
  ],
  openGraph: {
    title: `${siteInfo.name} — A Modern Magazine`,
    description: siteInfo.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden bg-paper text-ink">
        <AuthProvider>
          <UserContentProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-paper"
            >
              Skip to content
            </a>
            <Header />
            {children}
            <Footer />
            <AuthModal />
          </UserContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
