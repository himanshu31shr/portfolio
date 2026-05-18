# GitHub Copilot Instructions

This is a **Next.js 15 static portfolio site** for Himanshu Shrivastava.
Full conventions are in `AGENTS.md`. Key rules:

## Stack
- TypeScript strict mode — no `any`
- Tailwind CSS v4 — utility classes only, no inline styles
- Framer Motion for animations
- Vitest + React Testing Library — 100% coverage required

## Component Rules
- Functional components, named exports only
- `'use client'` only when strictly needed (browser APIs, event handlers, animations)
- Props must be typed with TypeScript interfaces
- Use `lucide-react` for icons

## Data Rules
- ALL resume content comes from `lib/constants.ts`
- Blog posts are `.mdx` files in `content/blog/`
- Never hardcode personal data in components

## Testing Rules
- Every new file needs a corresponding test in `__tests__/`
- Test user behavior with `screen.getByRole`, `screen.getByText`
- `framer-motion`, `next/font`, and `next/navigation` are already mocked

## Architecture
- Static export only (`output: 'export'`) — no server features
- `generateStaticParams()` required for all dynamic routes
- BasePath: `/portfolio` in production, empty locally

## Design System (Tailwind @theme tokens in globals.css)
- `bg-bg-primary` / `bg-bg-secondary` — dark backgrounds
- `.glass` — frosted glass card utility class
- `.gradient-text` — blue→purple→pink gradient text
- `text-text-primary` / `text-text-secondary` — typography
- `text-accent-blue` / `text-accent-purple` / `text-accent-pink` — accents

## WCAG 2.1 AA
- All interactive elements need accessible labels
- Use semantic HTML elements
- Maintain 4.5:1 contrast ratio minimum
