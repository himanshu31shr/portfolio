# Portfolio — AI Agent Guide

> This is the canonical source of truth for all AI coding assistants working on this project.
> Claude: also read `CLAUDE.md`. Cursor: also see `.cursor/rules/`. Copilot: also see `.github/copilot-instructions.md`.

---

## Project Overview

Personal portfolio + blog for **Himanshu Shrivastava**, Senior Full Stack Engineer.
- **Live URL**: https://himanshu31shr.github.io/portfolio/
- **Repo**: https://github.com/himanshu31shr/portfolio

---

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Blog | MDX via `next-mdx-remote/rsc` + `gray-matter` |
| Testing | Vitest + React Testing Library |
| Deployment | GitHub Pages via GitHub Actions |

---

## Key Commands

```bash
npm run dev           # Start local dev server
npm run build         # Build static site → out/
npm run lint          # ESLint via next lint
npm run type-check    # tsc --noEmit
npm run test          # Vitest watch mode
npm run test:run      # Vitest single run
npm run test:coverage # Vitest with 100% coverage enforcement
```

---

## Architecture

- **Static-only**: `output: 'export'` in `next.config.ts`. NO server features, API routes, or `getServerSideProps`.
- **BasePath**: Empty locally; set to `/portfolio` via `NEXT_PUBLIC_BASE_PATH` env var in CI.
- **Resume data**: ALWAYS comes from `lib/constants.ts`. Never hardcode strings in components.
- **Blog posts**: `.mdx` files in `content/blog/` with gray-matter frontmatter. Slug = filename.
- **Images**: `next/image` optimization is disabled. Use `<img>` or `next/image` with `unoptimized`.

---

## File Structure

```
app/                  # Next.js App Router pages
  globals.css         # Tailwind @theme design tokens — edit here for design changes
  layout.tsx          # Root layout (fonts, metadata, Navbar, AnimatedBackground, Footer)
  page.tsx            # Homepage — assembles all section components
  blog/
    page.tsx          # Blog listing
    [slug]/page.tsx   # Individual post (SSG)
components/           # All UI components (server by default, 'use client' only when needed)
lib/
  constants.ts        # ALL resume data as typed TypeScript objects
  blog.ts             # Blog utilities: getAllPosts, getPostBySlug, getPostSlugs
content/blog/         # MDX blog posts
__tests__/            # Mirrors source structure — every file must have a test
public/               # Static assets
.cursor/rules/        # Cursor-specific scoped rule files (.mdc)
.github/
  copilot-instructions.md
  workflows/
    ci.yml            # PR checks
    deploy.yml        # Deploy to GitHub Pages
CLAUDE.md             # Claude Code instructions
AGENTS.md             # This file
```

---

## Coding Conventions

### Components
- Functional components only — **no class components**
- Use **named exports** (not default exports)
- Add `'use client'` ONLY when the component uses: hooks, event handlers, browser APIs, Framer Motion animations
- Server Components are the default — keep them server-side when possible
- All props must be typed with a TypeScript interface
- Import icons from `lucide-react` exclusively

### Styling
- **Always use Tailwind utility classes** — never inline styles or `style={{}}`
- Custom CSS goes only in `app/globals.css`
- Use design token classes: `bg-bg-primary`, `text-text-secondary`, `border-glass-border`, etc.
- Use `.glass` utility class for frosted glass cards
- Use `.gradient-text` for gradient-colored headings
- Use `.section` wrapper for consistent section padding/max-width

### Accessibility (WCAG 2.1 AA)
- All interactive elements need `aria-label` or visible label text
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`
- Ensure color contrast ratio ≥ 4.5:1 for normal text
- Keyboard navigability required for all interactive elements

---

## Testing Rules

- **100% coverage required**: statements, branches, functions, lines (enforced via Vitest thresholds)
- Test file lives in `__tests__/` mirroring source path (e.g., `components/Hero.tsx` → `__tests__/components/Hero.test.tsx`)
- **Test behavior, not implementation**: use `screen.getByRole`, `screen.getByText`, `screen.getByLabelText`
- Avoid `getByTestId` unless absolutely necessary
- `framer-motion`, `next/font/google`, and `next/navigation` are pre-mocked in `vitest.setup.ts`
- When testing blog pages, mock `next-mdx-remote/rsc`
- Write tests **before** or **alongside** component code (TDD preferred)

---

## Design System Quick Reference

| Token | Value | Usage |
|:------|:------|:------|
| `bg-bg-primary` | #0a0a0f | Page background |
| `bg-bg-secondary` | #12121a | Subtle surface |
| `.glass` | backdrop-blur + border | Card containers |
| `text-text-primary` | #f0f0f5 | Main text |
| `text-text-secondary` | #a0a0b0 | Subtitles, captions |
| `text-accent-blue` | #6366f1 | Links, highlights |
| `text-accent-purple` | #8b5cf6 | Secondary accent |
| `text-accent-pink` | #ec4899 | Tertiary accent |
| `.gradient-text` | blue→purple→pink | Section headings |

---

## DO NOT

- Add server-side features (API routes, middleware, ISR, getServerSideProps)
- Use `next/image` with optimization (static export incompatible — use `unoptimized`)
- Install additional CSS frameworks or UI libraries (Chakra, MUI, shadcn, etc.)
- Skip writing tests for any new code
- Hardcode resume data in components — always use `lib/constants.ts`
- Use `any` TypeScript type
- Use inline styles (`style={{}}`)
- Use default exports for components
