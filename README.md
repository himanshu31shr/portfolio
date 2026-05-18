# Personal Portfolio & Blog

[![CI/CD Checks](https://github.com/himanshu31shr/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/himanshu31shr/portfolio/actions/workflows/ci.yml)
[![Pages Deployment](https://github.com/himanshu31shr/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/himanshu31shr/portfolio/actions/workflows/deploy.yml)

The professional portfolio and technical blog for **Himanshu Shrivastava**, Senior Full Stack Engineer.

- **Live URL**: [https://himanshu31shr.github.io/portfolio/](https://himanshu31shr.github.io/portfolio/)
- **Repository**: [https://github.com/himanshu31shr/portfolio](https://github.com/himanshu31shr/portfolio)

---

## 🚀 Professional Overview

Himanshu is a Senior Full Stack Engineer and technology leader with **9+ years of experience** building and scaling fintech, SaaS, and cloud-native platforms.
* **Current Role**: Senior Software Engineer at **Incubyte** (leading enterprise full-stack systems and WCAG accessibility initiatives).
* **Previous Role**: Co-Founder & Head of Engineering at **ByajBook** (architected a P2P lending platform scaling to 400k+ users).
* **Core Expertise**: Node.js, React, TypeScript, Python, AWS, Microservices, CI/CD Automation, Accessibility (WCAG 2.1 AA), and Agentic AI Developer Workflows.

---

## 🛠️ Tech Stack & Design System

The application is built as a highly performant, statically exported Next.js site using a custom glassmorphism design system.

| Layer | Technology | Key Features / Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Static export (`output: 'export'`) |
| **Language** | TypeScript | Strict type checking & clean patterns |
| **Styling** | Tailwind CSS v4 | CSS-first `@theme` variables, frosted glass |
| **Animation** | Framer Motion | Smooth page reveals & interactive micro-animations |
| **Icons** | Lucide React | Uniform icon library |
| **Blog System** | MDX (`next-mdx-remote`) | File-based `.mdx` rendering with frontmatter |
| **Testing** | Vitest + RTL | 100% test coverage enforced globally |
| **CI/CD & Deploy** | GitHub Actions + Pages | Automated unit testing, linting, and deployment |

---

## 💻 Quick Start & Scripts

Ensure you have [Node.js](https://nodejs.org/) installed, then install dependencies:

```bash
npm install
```

### Development & Build Commands

* **Start Local Dev Server**:
  ```bash
  npm run dev
  ```
* **Build Static Production Asset (`out/`)**:
  ```bash
  npm run build
  ```
* **Lint Check (ESLint)**:
  ```bash
  npm run lint
  ```
* **TypeScript Compilation Check**:
  ```bash
  npm run type-check
  ```

### Testing Commands

This repository enforces **100% test coverage** for all statements, branches, lines, and functions.

* **Run Interactive Test Runner (Vitest)**:
  ```bash
  npm run test
  ```
* **Run Tests Once**:
  ```bash
  npm run test:run
  ```
* **Verify 100% Code Coverage**:
  ```bash
  npm run test:coverage
  ```

---

## 📁 Architecture & File Structure

```
.
├── app/                  # Next.js App Router pages
│   ├── globals.css       # Tailwind @theme variables (design token definitions)
│   ├── layout.tsx        # Root layout (Metadata, Navbar, AnimatedBackground, Footer)
│   ├── page.tsx          # Main homepage (assembles Section components)
│   └── blog/             # Blog index page & slug dynamic routing [slug]
├── components/           # Reusable UI components
├── content/blog/         # MDX blog posts with gray-matter frontmatter
├── lib/
│   ├── constants.ts      # SINGLE SOURCE OF TRUTH for all resume & portfolio details
│   └── blog.ts           # Blog utilities (retrieval, frontmatter parsing)
├── __tests__/            # Parallel test suite structure matching app/ & components/
└── public/               # Local static assets
```

---

## 📜 Development Guidelines & Rules

1. **No Hardcoded Resume Data**: All personal data must be sourced from `lib/constants.ts`. Do not hardcode name, experience points, or details directly in components.
2. **Static Export Constraint**: No dynamic server-side functionality (no Next.js API routes, no `getServerSideProps`, no middleware).
3. **Responsive & Accessible (WCAG 2.1 AA)**: Ensure a contrast ratio ≥ 4.5:1, keyboard navigability, and appropriate ARIA attributes for interactive elements.
4. **Writing Tests**: Test files are placed in `__tests__/` mirroring the source path (e.g., `components/Hero.tsx` -> `__tests__/components/Hero.test.tsx`). Any new features or files require comprehensive test coverage.
5. **No Default Exports for Components**: Always use named exports (`export const MyComponent = ...`).
