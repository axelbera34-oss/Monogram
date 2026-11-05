# MONOGRAM — Modern Magazine

A responsive, magazine-style editorial site built with **Next.js 16.4.4 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS 4**. The project includes a designed homepage, a searchable story archive, seven dedicated category pages, individual article routes, a sign-in gate for reader contributions, category creation, and image support. The dependency audit currently reports zero known vulnerabilities.

> All built-in editorial copy and bylines are fictional demo content. Accounts and reader submissions are browser-local demo data.

## Built-in admin demo account

There was no pre-seeded account originally; only accounts created through **Create account** existed. A default admin account is now seeded automatically the first time the app loads in a browser:

| Field | Value |
| --- | --- |
| Email | `admin@monogram.test` |
| Password | `Monogram2026!` |
| Role | `admin` |

Open **Sign in / Join** in the header and click **Use admin** to fill both fields, then submit. The account is also listed with its credentials in the sign-in dialog. Its reserved email cannot be used for a new reader signup.

The admin role is displayed in the account menu, signed-in modal, mobile menu, and editor status bars. Every signed-in account can still add categories and articles; `admin` is a demo role label, not a server-enforced permission system.

## What is included

- Sticky navigation with a mobile menu, category links, search, a newsletter CTA, a **More** dropdown, and **Sign in / Join**
- Header authentication dialog with:
  - a built-in **admin demo account** and a one-click **Use admin** button
  - **Sign in** and **Create account** tabs
  - email, password, and display-name fields
  - session persistence in this browser
  - signed-in account menu with sign out
  - author prefill in the article form
- Creation forms are locked until sign-in:
  - **Add a new category** requires an active session
  - **Add an article** requires an active session
  - “Add another story,” “Add first article,” and similar actions open the sign-in dialog when signed out
- Asymmetric hero section with a local cover image and issue details
- Content area with editor's picks, category cards, a most-read list, and a prominent **Explore** button
- `/explore` archive with:
  - links to every original content-type page
  - search across titles, descriptions, writers, tags, and article text
  - filters for **News** and **Blog**
  - filters for each editorial desk
  - load-more pagination
  - a dedicated **Add a new category** section
  - an **Add an article** section with an **Article image section**
  - a **More** section listing reader-added categories and articles
- Dedicated category creation form with:
  - name, description, and color selection
  - an optional category cover image
  - automatic listing in More and in desktop/mobile More menus
  - a dedicated `/more/[slug]` page
  - automatic prefill of the article form's type with the new category name
  - an empty state until the first article is published
- Article form with:
  - title, type/desk, News or Blog format, author, summary, body, and tags
  - image upload from device or image URL
  - live preview, remove-image control, and a 1 MB upload limit
  - optional images displayed in More, on existing desk pages, and on reader-created category pages
- Dedicated built-in pages for:
  - Politics
  - Beauty
  - Sports
  - Celebrities
  - Trending Topics
  - Culture
  - Technology
- Individual built-in article pages with metadata, breadcrumbs, pull quotes, tags, share links, and related stories
- Reader submissions that:
  - match existing types by name, short name, or slug
  - create a new category under More when the type is not included
  - display stories added to existing desks on both that desk page and More
  - persist in browser `localStorage`
  - can be cleared with the “Reset browser additions” button
- Reusable cards, icons, responsive layouts, CSS texture, animation, and a local-only newsletter form
- SEO metadata and statically generated built-in article routes

## Run locally

```bash
cd monogram-magazine
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm run start
```

Type checking:

```bash
npm run typecheck
```

## Main routes

| Route | Description |
| --- | --- |
| `/` | Magazine homepage |
| `/explore` | Searchable archive, desk directory, creation forms, and More section |
| `/explore#add-category` | Sign-in-gated category creation form |
| `/explore#add-article` | Sign-in-gated article form with image section |
| `/explore#more` | Reader-added categories and articles |
| `/explore/politics` | Politics desk |
| `/explore/beauty` | Beauty desk |
| `/explore/sports` | Sports desk |
| `/explore/celebrities` | Celebrities desk |
| `/explore/trending` | Trending Topics desk |
| `/explore/culture` | Culture desk |
| `/explore/technology` | Technology desk |
| `/explore/[category]/[article]` | Built-in full article page |
| `/more/[slug]` | Reader-added category page, loaded from browser storage |

## Project structure

```text
app/
  explore/
    [category]/
      [article]/page.tsx
      page.tsx
    page.tsx
  more/
    [slug]/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  AddArticleSection.tsx
  AddCategorySection.tsx
  AuthActionLink.tsx
  AuthButton.tsx
  AuthGate.tsx
  AuthModal.tsx
  AuthProvider.tsx
  CategoryCard.tsx
  CustomCategoryPage.tsx
  Footer.tsx
  Header.tsx
  Icons.tsx
  ImagePicker.tsx
  MobileNav.tsx
  MoreMenu.tsx
  MoreSection.tsx
  NewsletterForm.tsx
  ReaderStoryDisclosure.tsx
  StoryBrowser.tsx
  StoryCard.tsx
  UserContentProvider.tsx
  UserDeskAdditions.tsx
lib/
  auth.ts
  content.ts
  user-content.ts
public/images/
```

## Customizing content

`lib/content.ts` is the single source of truth for built-in content:

- categories and their colors/cover images
- article metadata, article kind (`News` or `Blog`), format, tags, and body copy
- helper functions used by the pages and cards

Add a category to `categories`, then add articles with that category slug. Static category and article routes are generated automatically. Images live in `public/images`; a built-in story without an `image` value automatically gets a typographic CSS cover.

`lib/user-content.ts` contains the types, type-matching helpers, category colors, article factories, and storage parser used by the reader-submission system. `components/UserContentProvider.tsx` shares that state across the navigation, Explore page, and desk pages. `components/ImagePicker.tsx` is reused by the category and article forms.

`lib/auth.ts` and `components/AuthProvider.tsx` implement the demo session layer, shared by the header, authentication dialog, form gates, and protected action links.

## Notes

- Authentication is a **front-end demo only**: there is no server, database, email verification, password reset, rate limiting, or production session security. Accounts and sessions are stored in `localStorage`; the built-in admin is seeded into that storage on first load.
- Passwords are not stored in plaintext; the demo hashes them with a per-account salt using Web Crypto SHA-256 where available. This is still not a substitute for server-side authentication.
- Use a disposable demo password, not a real one.
- Signing out leaves previously created articles and categories visible but locks all creation forms again.
- Reader submissions are browser-local and are not synchronized across devices. Clearing site data removes them.
- Uploaded images are converted to data URLs and capped at 1 MB to respect typical `localStorage` limits. External image URLs are stored as strings.
- User-supplied images use plain `<img>` elements so data URLs and arbitrary external URLs work without `next/image` remote-host configuration.
- A reader-added category page will show a helpful empty state if opened in a browser where that category was never created.
- The ten editorial images are locally generated assets; no external image CDN is required.
- The newsletter form demonstrates client-side interaction only and sends no email.
- The dark footer intentionally owns the `#newsletter` anchor used by the navigation.
