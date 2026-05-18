# CLAUDE.md

> Read `AGENTS.md` first — it contains the full project conventions.

## Project Context

This is the personal portfolio + blog for **Himanshu Shrivastava**, a Senior Full Stack Engineer with 9+ years of experience in fintech, SaaS, and cloud-native platforms.

- Live site: https://himanshu31shr.github.io/portfolio/
- Tech stack: Next.js 16 (App Router, static export), React 19, Tailwind CSS v4, Framer Motion, Vitest
- Resume data source: `lib/constants.ts`
- Blog posts: `content/blog/*.mdx`

## Quick Commands

```bash
npm run dev           # Dev server
npm run build         # Static export → out/
npm run lint          # Lint
npm run type-check    # TypeScript check
npm run test          # Vitest watch
npm run test:coverage # 100% coverage check
```

## Claude-Specific Workflow

1. **TDD**: Write the test file first, then implement the component to pass it.
2. **New components**: Create `components/MyComponent.tsx` AND `__tests__/components/MyComponent.test.tsx` together.
3. **Blog posts**: Go in `content/blog/filename.mdx` with required frontmatter (see AGENTS.md).
4. **Resume edits**: Only modify `lib/constants.ts` — never hardcode data elsewhere.
5. **Styling**: Use Tailwind classes from the design system defined in `app/globals.css @theme`.
6. **'use client'**: Add it only when you specifically need browser APIs, event listeners, or Framer Motion.

## Architecture Reminders

- `output: 'export'` → no server features allowed
- All pages pre-render at build time via `generateStaticParams()`
- Framer Motion, next/font, and next/navigation are mocked in `vitest.setup.ts`
- BasePath is `/portfolio` in production — use `NEXT_PUBLIC_BASE_PATH` env var for links if needed
